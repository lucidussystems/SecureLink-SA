import { Component } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButton, 
  IonIcon, 
  IonCard, 
  IonCardContent,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonButton, 
    IonIcon, 
    IonCard, 
    IonCardContent,
    IonList,
    IonItem,
    IonLabel
  ]
})
export class HomePage {
  constructor(private navigationService: NavigationService) {}

  ngOnInit() {
    console.log('Home page loaded successfully!');
  }

  /**
   * Navigate to a specific route using the navigation service
   * @param route - The route to navigate to
   */
  navigateTo(route: string): void {
    this.navigationService.navigateTo(route);
  }
}
