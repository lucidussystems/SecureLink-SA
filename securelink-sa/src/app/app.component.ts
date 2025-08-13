import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  constructor(private platform: Platform) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Only call StatusBar and SplashScreen on native platforms
      if (this.platform.is('capacitor')) {
        StatusBar.setStyle({ style: Style.Dark }).catch(err => {
          console.warn('StatusBar not available:', err);
        });
        SplashScreen.hide().catch(err => {
          console.warn('SplashScreen not available:', err);
        });
      }
      
      console.log('SecureLink SA App initialized successfully');
    });
  }
}
