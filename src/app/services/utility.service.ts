import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { LocalName } from '../enums/LocalName';
import { ConnexionInfo } from '../models/ConnexionInfo';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(public navigate : NavController,
              private storage : Storage) { }

  public navigateTo(route : string){
    this.navigate.navigateRoot(route);
  }

  public async getConnexionInfo(){
    const infoConnexion : ConnexionInfo = await this.storage.get(LocalName.InfoConnexion);
    return infoConnexion;
  }

}
