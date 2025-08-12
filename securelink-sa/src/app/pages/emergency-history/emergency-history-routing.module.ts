import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmergencyHistoryPage } from './emergency-history.page';

const routes: Routes = [
  {
    path: '',
    component: EmergencyHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmergencyHistoryPageRoutingModule {}
