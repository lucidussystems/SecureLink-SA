import { Component } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-emergency-details',
  templateUrl: './emergency-details.page.html',
  styleUrls: ['./emergency-details.page.scss'],
  standalone: true,
  imports: [
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent
  ]
})
export class EmergencyDetailsPage {
  constructor(private navigationService: NavigationService) {}

  ngOnInit() {
    console.log('Emergency Details page loaded successfully!');
  }

  goBack(): void {
    this.navigationService.goBack();
  }
}
