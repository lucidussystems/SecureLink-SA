import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EmergencyDetailsPageRoutingModule } from './emergency-details-routing.module';
import { EmergencyDetailsPage } from './emergency-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmergencyDetailsPageRoutingModule,
    EmergencyDetailsPage
  ]
})
export class EmergencyDetailsPageModule {}
