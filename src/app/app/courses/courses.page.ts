import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, AlertInput, IonicModule } from '@ionic/angular';
import { CoursesService } from 'src/app/services/courses.service';
import { Courses } from 'src/app/models/Courses';
import { MagasinsService } from 'src/app/services/magasins.service';
import { Magasins } from 'src/app/models/Magasins';
import { UtilityService } from 'src/app/services/utility.service';
import { Storage } from '@ionic/storage';
import { LocalName } from 'src/app/enums/LocalName';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CoursesPage implements OnInit {

  courses : Array<Courses> = [];
  magasins : Array<Magasins> = [];

  constructor(private coursesService : CoursesService,
              private magasinsService : MagasinsService,
              private storage : Storage,
              private utility : UtilityService,
              private alertController : AlertController) { 
                this.refresh();
              }

  ngOnInit() {
    this.refresh();
  }

  private async get(){
    return await this.coursesService.getCourse();
  }
  
  public async refresh(){
    const courses : Array<Courses> = await this.get();
    this.courses = courses;
    
    const magasins = await this.getMagasin();
    this.magasins = magasins;
  }
  
  public async getMagasin(){
    const magasins : Array<Magasins> = await this.storage.get(LocalName.Magasins);
    return magasins;
  }
  
  public getLibelleMagasin(magasinId : number){
    return this.magasins.find(magasin => magasin.id == magasinId)?.libelle;
  }

  public async post(){

    const magasins : Array<Magasins> = await this.magasinsService.get();
    const inputs : Array<AlertInput> = [];

    magasins.map(magasin => inputs.push({
      type : 'radio',
      value : magasin.id,
      label : magasin.libelle
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
        }
        ,{
          text: 'Valider',
          handler: async (magasinId : any) => {

            await this.postChooseDate(magasinId);

          }
        }
        
      ]
    });

    await alert.present();
  }

  public async postChooseDate(magasinId : any){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'A quelle date ?',
      inputs: [
        {
          type : 'date'
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
          handler: async (date : any) => {

            var course : Courses = {
              id : Date.now(),
              ordre : 0,
              magasinId : magasinId,
              montantTheorique : 0,
              montantReel : 0,
              ecart : 0,
              date : date[0]
            }
            
            await this.coursesService.postCourse(course);
            await this.refresh();

          }
        }
        
      ]
    });

    await alert.present();
  }

  public put(id : number){
    this.utility.navigateTo('course-details/' + id)
  }

}
