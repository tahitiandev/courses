import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { UtilisateurGroupesService } from 'src/app/services/utilisateur-groupes.service';
import { UtilisateurGroupes } from 'src/app/models/UtilisateurGroupes';

@Component({
  selector: 'app-utilisateur-groupes',
  templateUrl: './utilisateur-groupes.page.html',
  styleUrls: ['./utilisateur-groupes.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class UtilisateurGroupesPage implements OnInit {

  groupes : Array<UtilisateurGroupes> = [];

  constructor(private alertController : AlertController,
              private groupeService : UtilisateurGroupesService) { }

  ngOnInit() {
    this.refresh();
  }


  public async post(){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Nouveau Magasin',
      inputs: [
        {
          type : 'text',
          name : 'libelle',
          label : 'Libellé'
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
          handler: async (data) => {

            await this.groupeService.post({
              id : 0,
              libelle : data.libelle
            })

            await this.refresh();
              
          }
        }
        
      ]
    });

    await alert.present();
  }

  private async refresh(){
    const groupes = await this.groupeService.get();
    this.groupes = groupes;
  }


}
