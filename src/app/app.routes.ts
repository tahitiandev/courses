import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./securite/utilisateurs/creation-utilisateur.page').then( m => m.CreationUtilisateurPage),
    pathMatch: 'full',
  },
  {
    path: 'folder/:id',
    loadComponent: () =>
      import('./folder/folder.page').then((m) => m.FolderPage),
  },
  {
    path: 'creation-utilisateur',
    loadComponent: () => import('./securite/utilisateurs/creation-utilisateur.page').then( m => m.CreationUtilisateurPage)
  },
  {
    path: 'authentification',
    loadComponent: () => import('./securite/authentification/authentification.page').then( m => m.AuthentificationPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./app/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'courses',
    loadComponent: () => import('./app/courses/courses.page').then( m => m.CoursesPage)
  },
  {
    path: 'course-details/:id',
    loadComponent: () => import('./app/course-details/course-details.page').then( m => m.CourseDetailsPage)
  },
  {
    path: 'menu-semaine',
    loadComponent: () => import('./app/menu-semaine/menu-semaine.page').then( m => m.MenuSemainePage)
  },
  {
    path: 'articles',
    loadComponent: () => import('./app/articles/articles.page').then( m => m.ArticlesPage)
  },
  {
    path: 'settings',
    loadComponent: () => import('./app/settings/settings.page').then( m => m.SettingsPage)
  },
  {
    path: 'plats',
    loadComponent: () => import('./app/plats/plats.page').then( m => m.PlatsPage)
  },
  {
    path: 'magasins',
    loadComponent: () => import('./app/magasins/magasins.page').then( m => m.MagasinsPage)
  },
  {
    path: 'utilisateur-groupes',
    loadComponent: () => import('./securite/utilisateur-groupes/utilisateur-groupes.page').then( m => m.UtilisateurGroupesPage)
  },
  {
    path: 'familles',
    loadComponent: () => import('./app/familles/familles.page').then( m => m.FamillesPage)
  },
];
