import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
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
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'incidents',
    loadChildren: () => import('./pages/incidents/incidents.module').then(m => m.IncidentsPageModule)
  },
  {
    path: 'incident-details',
    loadChildren: () => import('./pages/incident-details/incident-details.module').then(m => m.IncidentDetailsPageModule)
  },
  {
    path: 'report-incident',
    loadChildren: () => import('./pages/report-incident/report-incident.module').then(m => m.ReportIncidentPageModule)
  },
  {
    path: 'emergency-history',
    loadChildren: () => import('./pages/emergency-history/emergency-history.module').then(m => m.EmergencyHistoryPageModule)
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

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { 
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
