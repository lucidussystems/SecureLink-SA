import { Component } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-report-incident',
  templateUrl: './report-incident.page.html',
  styleUrls: ['./report-incident.page.scss'],
  standalone: true,
  imports: [
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent
  ]
})
export class ReportIncidentPage {
  constructor(private navigationService: NavigationService) {}

  ngOnInit() {
    console.log('Report Incident page loaded successfully!');
  }

  goBack(): void {
    this.navigationService.goBack();
  }
}
