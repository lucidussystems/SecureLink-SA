import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.page').then(m => m.ProfilePage)
  },
  {
    path: 'incidents',
    loadChildren: () => import('./pages/incidents/incidents.module').then(m => m.IncidentsPageModule)
  },
  {
    path: 'incident-details/:id',
    loadComponent: () => import('./pages/incident-details/incident-details.page').then(m => m.IncidentDetailsPage)
  },
  {
    path: 'report-incident',
    loadComponent: () => import('./pages/report-incident/report-incident.page').then(m => m.ReportIncidentPage)
  },
  {
    path: 'emergency-history',
    loadComponent: () => import('./pages/emergency-history/emergency-history.page').then(m => m.EmergencyHistoryPage)
  },
  {
    path: 'emergency-details',
    loadChildren: () => import('./pages/emergency-details/emergency-details.module').then(m => m.EmergencyDetailsPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
