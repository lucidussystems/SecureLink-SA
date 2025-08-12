import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PAGEPage } from './PAGE.page';

const routes: Routes = [
  {
    path: '',
    component: PAGEPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PAGEPageRoutingModule {}
