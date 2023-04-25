import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { MagasinsService } from 'src/app/services/magasins.service';
import { Magasins } from 'src/app/models/Magasins';

@Component({
  selector: 'app-magasins',
  templateUrl: './magasins.page.html',
  styleUrls: ['./magasins.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class MagasinsPage implements OnInit {

  magasins : Array<Magasins> = [];

  constructor(private magasinsService : MagasinsService,
              private alertController : AlertController) { }

  ngOnInit() {
    this.refresh();
  }

  private async refresh(){
    this.magasins = await this.get();
  }

  public async get(){
    return await this.magasinsService.get();
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
          handler: async (libelleMagasin : Magasins) => {

            var magasin : Magasins = {
              id : Date.now(),
              libelle : libelleMagasin.libelle,
              createdOn : new Date(),
              modifiedOn : new Date(),
              deletedOn : new Date()
            }

            await this.magasinsService.post(magasin);
            this.refresh();

          }
        }
        
      ]
    });

    await alert.present();
  }

}
