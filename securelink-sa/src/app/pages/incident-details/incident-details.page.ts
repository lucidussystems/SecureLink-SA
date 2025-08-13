import { Component } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-incident-details',
  templateUrl: './incident-details.page.html',
  styleUrls: ['./incident-details.page.scss'],
  standalone: true,
  imports: [
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent
  ]
})
export class IncidentDetailsPage {
  constructor(private navigationService: NavigationService) {}

  ngOnInit() {
    console.log('Incident Details page loaded successfully!');
  }

  goBack(): void {
    this.navigationService.goBack();
  }
}
