import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreationUtilisateurPage } from './creation-utilisateur.page';

describe('CreationUtilisateurPage', () => {
  let component: CreationUtilisateurPage;
  let fixture: ComponentFixture<CreationUtilisateurPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreationUtilisateurPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
