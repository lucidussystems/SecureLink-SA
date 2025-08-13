import { Component } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-emergency-history',
  templateUrl: './emergency-history.page.html',
  styleUrls: ['./emergency-history.page.scss'],
  standalone: true,
  imports: [
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent
  ]
})
export class EmergencyHistoryPage {
  constructor(private navigationService: NavigationService) {}

  ngOnInit() {
    console.log('Emergency History page loaded successfully!');
  }

  goBack(): void {
    this.navigationService.goBack();
  }
}
