import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UtilityService } from 'src/app/services/utility.service';
import { UtilisteursService } from 'src/app/services/utilisateurs.service';
import { Storage } from '@ionic/storage';
import { LocalName } from 'src/app/enums/LocalName';
import { ConnexionInfo } from 'src/app/models/ConnexionInfo';
import { Utilisateurs } from 'src/app/models/Utilisateurs';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.page.html',
  styleUrls: ['./authentification.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class AuthentificationPage implements OnInit {

  authentificationForm : FormGroup = new FormGroup([]);

  constructor(private formbuilder : FormBuilder,
              private utility : UtilityService,
              private storage : Storage,
              private utilisateursService : UtilisteursService) { }

  ngOnInit() {
    this.authentificationFormInit();
  }

  private authentificationFormInit(){
    this.authentificationForm = this.formbuilder.group({
      username : '',
      password : ''
    })
  }

  public async onValide(){
    const data = this.authentificationForm.value;
    
    const utilisateurs : Array<Utilisateurs> = await this.utilisateursService.get();
    const utilisateur = await utilisateurs.filter(utilisateur => utilisateur.username === data.username);

    if(utilisateur.length > 0){
      if(utilisateur[0].password === data.password){

        const infoConnexion : ConnexionInfo = {
          isConnected : true,
          utilisateurId : utilisateur[0].id,
          groupeId : utilisateur[0].groupeId
        }

        await this.storage.set(LocalName.InfoConnexion, infoConnexion);
        this.utility.navigateTo('home');
      }else{
        console.log('Le mot de passe est incorrecte');
      }
    }else{
      console.log('Le login renseigné n\'existe pas')
    }

    this.authentificationForm.patchValue({
      username : '',
      password : ''
    })

  }

  public navigateToCreerUtilisateur(){
    this.utility.navigateTo('');
  }

}
