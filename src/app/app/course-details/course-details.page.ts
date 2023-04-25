import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, AlertInput, AlertOptions, IonicModule } from '@ionic/angular';
import { CoursesService } from 'src/app/services/courses.service';
import { Courses } from 'src/app/models/Courses';
import { ActivatedRoute } from '@angular/router';
import { CourseDetails } from 'src/app/models/Course-details';
import { ArticlesService } from 'src/app/services/articles.service';
import { Articles } from 'src/app/models/Articles';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.page.html',
  styleUrls: ['./course-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CourseDetailsPage implements OnInit {

  courseid : number = 0;
  totalCourse : number = 0;
  course : Courses = {
    id : 0,
    ordre : 0,
    magasinId : 1,
    montantTheorique : 0,
    montantReel : 0,
    ecart : 0,
    date : new Date()
  };
  coursedetails : Array<CourseDetails> = [];
  articles : Array<Articles> = [];

  constructor(private coursesService : CoursesService,
              private alertController : AlertController,
              private articleservice : ArticlesService,
              private utility : UtilityService,
              private route : ActivatedRoute) { }

  ngOnInit() {
    this.refresh();
  }

  public async refresh(){
    this.courseid = this.getId();

    const course : any = await this.getCourse();
    this.course = course;

    const coursedetails : Array<CourseDetails> = await this.getCourseDetail();
    this.coursedetails = coursedetails;

    const articles = await this.getArticles();
    this.articles = articles;

    this.calculeTotalCourse();
  }

  private calculeTotalCourse(){
    const coursedetail : Array<CourseDetails> = this.coursedetails;
    var totalCourse = 0;
    if(coursedetail.length > 0){
      coursedetail.map(coursedetail => totalCourse += coursedetail.total)
      this.totalCourse = totalCourse;

      this.course.montantReel = totalCourse;
      this.course.montantTheorique = totalCourse;
      this.coursesService.putCourse(this.course);
    }
  }

  public getId(){
    const id = this.route.snapshot.params['id'];
    return id;
  }

  private async getCourse(){
    return await this.coursesService.getCourseById(this.courseid);
  }

  public async getCourseDetail(){
    const coursedetails : Array<CourseDetails> = await this.coursesService.getCourseDetails(this.courseid);
    return coursedetails;
  }

  private async getArticles(){
    return this.articleservice.get();
  }

  public async postArticle(){

    const inputs : Array<AlertInput> = [];

    this.articles.map(article => inputs.push({
      type : 'radio',
      label : article.libelle,
      value : article
    }))

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Ou souhaitez-vous faire vos courses ?',
      inputs: inputs,
        buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        },
        {
          text: 'Nouvelle article',
          cssClass: 'secondary',
          handler: async () => {
            await this.postNouvelleArticle();
          }
        }
        ,{
          text: 'Valider',
          handler: async (article : Articles) => {

            await this.postePrix(article)

          }
        }
        
      ]
    });

    await alert.present();
  }

  public async postNouvelleArticle(){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Ajouter un nouvelle article',
      inputs: [
        {
          type : 'text',
          label : 'Libellé',
          name : 'libelle'
        },
        {
          type : 'number',
          value : 1,
          label : 'Quantité',
          name : 'quantite'
        },
        {
          type : 'number',
          label : 'Prix',
          name : 'prix',
          value : 1000
        }
      ],
        buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            
          }
        }
        ,{
          text: 'Valider',
          handler: async (data : any) => {

              var article : Articles = {
                id : 0,
                libelle : data.libelle,
                prix : [
                  {
                    magasin : this.course.magasinId,
                    prix : Number(data.prix)
                  }
                ],
                createdOn : new Date(),
                groupeId : [(await this.utility.getConnexionInfo()).groupeId],
                familleId : 0
              }

              // await this.articleservice.post(article);
              await this.refresh();

          }
        }
        
      ]
    });

    await alert.present();
  }

  public async postePrix(articles : Articles){

    const inputs : Array<AlertInput> = [];
    var goodPrix = 0;

    articles.prix.map(prix => {
      if(prix.magasin == this.course.magasinId){
        goodPrix = prix.prix
      }
    })

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Renseigner le prix et la quantité souhaitée',
      inputs: [
        {
          type : 'number',
          value : '1',
          label : 'Quantité',
          name : 'quantite'
        },
        {
          type : 'number',
          label : 'Prix',
          name : 'prix',
          value : goodPrix
        }
      ],
        buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            
          }
        }
        ,{
          text: 'Valider',
          handler: async (data : any) => {

              var coursedetails : CourseDetails = {
                id : Date.now(),
                ordre : 1,
                courseId : this.courseid,
                libelle : articles.libelle,
                quantite : data.quantite,
                articleId : articles.id,
                prixArticle : articles.prix[0].prix,
                prixReel : data.prix,
                checked : false,
                total : data.quantite * data.prix
              }

              await this.coursesService.postCourseDetails(coursedetails);
              await this.refresh();

          }
        }
        
      ]
    });

    await alert.present();
  }

  public async check(coursedetail : CourseDetails){
    coursedetail.checked = !coursedetail.checked;
    await this.coursesService.putCourseDetails(coursedetail);
    await this.refresh();
  }

  public async put(coursedetail : CourseDetails){

    const inputs : Array<AlertInput> = [];

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Renseigner le prix et la quantité souhaitée',
      inputs: [
        {
          type : 'text',
          value : coursedetail.libelle,
          label : 'Libellé',
          name : 'libelle'
        },
        {
          type : 'number',
          value : coursedetail.quantite,
          label : 'Quantité',
          name : 'quantite'
        },
        {
          type : 'number',
          label : 'Prix',
          name : 'prix',
          value : coursedetail.prixReel
        }
      ],
        buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            
          }
        }
        ,{
          text: 'Valider',
          handler: async (data : any) => {
            
            coursedetail.libelle = data.libelle;
            coursedetail.prixReel = data.prix;
            coursedetail.quantite = data.quantite;
            coursedetail.total = data.prix * data.quantite;

            await this.coursesService.putCourseDetails(coursedetail);

            if(data.prix == coursedetail.prixArticle){
              await this.refresh();
            }else{
              this.putArticleOnDatabase({
                articleId : coursedetail.articleId,
                prix : Number(data.prix),
                magasinId : this.course.magasinId,
                coursedetail : coursedetail
              })
            }

          }
        }
        
      ]
    });

    await alert.present();
  }

  private async putArticleOnDatabase(data : any){

    const inputs : Array<AlertInput> = [];

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Souhaitez-vous également mettre à jour le prix en base de données ?',
        buttons: [
        {
          text: 'Annuler',
          role: 'Non',
          cssClass: 'secondary',
          handler: () => {
            
          }
        }
        ,{
          text: 'Oui',
          handler: async () => {
            var article : Array<Articles> = await this.articleservice.getArticleById(data.articleId);
            var indexPrix = await article[0].prix.findIndex(prix => prix.magasin == data.magasinId);
            article[0].prix[indexPrix].prix = data.prix
            await this.articleservice.put(article[0]);

            data.coursedetail.prixArticle = data.prix;
            await this.coursesService.putCourse(data.coursedetail);
            await this.refresh();
            

          }
        }
        
      ]
    });

    await alert.present();
  }

}
