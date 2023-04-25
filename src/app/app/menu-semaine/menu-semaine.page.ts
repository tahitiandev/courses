import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-menu-semaine',
  templateUrl: './menu-semaine.page.html',
  styleUrls: ['./menu-semaine.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class MenuSemainePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
