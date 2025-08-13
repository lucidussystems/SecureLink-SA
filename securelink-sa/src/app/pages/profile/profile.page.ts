import { Component } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent
  ]
})
export class ProfilePage {
  constructor(private navigationService: NavigationService) {}

  ngOnInit() {
    console.log('Profile page loaded successfully!');
  }

  goBack(): void {
    this.navigationService.goBack();
  }
}
