import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PAGEPageRoutingModule } from './PAGE-routing.module';
import { PAGEPage } from './PAGE.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PAGEPageRoutingModule
  ],
  declarations: [PAGEPage]
})
export class PAGEPageModule {}
