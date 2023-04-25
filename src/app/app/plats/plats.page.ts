import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-plats',
  templateUrl: './plats.page.html',
  styleUrls: ['./plats.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PlatsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
