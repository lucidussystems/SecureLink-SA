import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EmergencyHistoryPageRoutingModule } from './emergency-history-routing.module';
import { EmergencyHistoryPage } from './emergency-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmergencyHistoryPageRoutingModule,
    EmergencyHistoryPage
  ]
})
export class EmergencyHistoryPageModule {}
