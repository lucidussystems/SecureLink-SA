import { Component } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent
  ]
})
export class SettingsPage {
  constructor(private navigationService: NavigationService) {}

  ngOnInit() {
    console.log('Settings page loaded successfully!');
  }

  goBack(): void {
    this.navigationService.goBack();
  }
}
