import { Component } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-incidents',
  templateUrl: './incidents.page.html',
  styleUrls: ['./incidents.page.scss'],
  standalone: true,
  imports: [
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent
  ]
})
export class IncidentsPage {
  constructor(private navigationService: NavigationService) {}

  ngOnInit() {
    console.log('Incidents page loaded successfully!');
  }

  goBack(): void {
    this.navigationService.goBack();
  }
}
