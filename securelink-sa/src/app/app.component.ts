import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { SupabaseService } from './services/supabase.service';
import { EmergencyService } from './services/emergency.service';
import { LocationService } from './services/location.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private supabaseService: SupabaseService,
    private emergencyService: EmergencyService,
    private locationService: LocationService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.setStyle({ style: Style.Dark });
      SplashScreen.hide();
      
      // Initialize services
      this.initializeServices();
    });
  }

  private async initializeServices() {
    try {
      // Check authentication status
      const user = await this.supabaseService.getCurrentUser();
      if (user) {
        // User is authenticated, initialize services
        await this.initializeAuthenticatedServices();
      }
    } catch (error) {
      console.error('Error initializing services:', error);
    }
  }

  private async initializeAuthenticatedServices() {
    try {
      // Start location tracking if enabled
      if (environment.enableBackgroundTracking) {
        await this.locationService.startLocationTracking();
      }

      // Connect to emergency socket
      this.emergencyService.connectSocket();
    } catch (error) {
      console.error('Error initializing authenticated services:', error);
    }
  }
}
