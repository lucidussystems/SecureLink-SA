import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { EmergencyService } from '../../services/emergency.service';
import { LocationService } from '../../services/location.service';
import { SupabaseService } from '../../services/supabase.service';
import { Emergency, EmergencyType } from '../../models/emergency.model';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  currentUser: User | null = null;
  activeEmergency: Emergency | null = null;
  isLocationTracking = false;
  currentLocation: any = null;
  
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private emergencyService: EmergencyService,
    private locationService: LocationService,
    private supabaseService: SupabaseService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.initializePage();
    this.setupSubscriptions();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private async initializePage() {
    try {
      // Get current user
      this.currentUser = await this.supabaseService.getCurrentUser();
      
      // Get current location
      this.currentLocation = await this.locationService.getCurrentLocation();
      
      // Check location tracking status
      this.isLocationTracking = this.locationService.isTrackingActive();
    } catch (error) {
      console.error('Error initializing home page:', error);
    }
  }

  private setupSubscriptions() {
    // Subscribe to active emergency
    this.subscriptions.push(
      this.emergencyService.getActiveEmergencyObservable().subscribe(
        emergency => {
          this.activeEmergency = emergency;
        }
      )
    );

    // Subscribe to location tracking status
    this.subscriptions.push(
      this.locationService.getTrackingStatusObservable().subscribe(
        isTracking => {
          this.isLocationTracking = isTracking;
        }
      )
    );

    // Subscribe to current location
    this.subscriptions.push(
      this.locationService.getCurrentLocationObservable().subscribe(
        location => {
          this.currentLocation = location;
        }
      )
    );
  }

  // Emergency button handlers
  async activatePanicEmergency() {
    await this.activateEmergency('panic', false);
  }

  async activateSilentEmergency() {
    await this.activateEmergency('silent_alarm', true);
  }

  async activateMedicalEmergency() {
    await this.activateEmergency('medical', false);
  }

  async activateFireEmergency() {
    await this.activateEmergency('fire', false);
  }

  private async activateEmergency(type: EmergencyType, isSilent: boolean) {
    if (!this.currentUser) {
      await this.showAlert('Authentication Required', 'Please log in to activate emergency services.');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Activating emergency...',
      spinner: 'crescent'
    });
    await loading.present();

    try {
      const emergency = await this.emergencyService.activateEmergency(type, isSilent);
      
      await loading.dismiss();
      
      await this.showAlert(
        'Emergency Activated',
        `Emergency type: ${type}. Help is on the way. Emergency ID: ${emergency.id}`,
        [
          {
            text: 'View Details',
            handler: () => {
              this.router.navigate(['/emergency-details', emergency.id]);
            }
          },
          {
            text: 'OK',
            role: 'cancel'
          }
        ]
      );
    } catch (error) {
      await loading.dismiss();
      console.error('Error activating emergency:', error);
      await this.showAlert('Error', 'Failed to activate emergency. Please try again.');
    }
  }

  // Cancel emergency
  async cancelEmergency() {
    if (!this.activeEmergency) return;

    const alert = await this.alertController.create({
      header: 'Cancel Emergency',
      message: 'Are you sure you want to cancel this emergency?',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Yes',
          handler: async () => {
            try {
              await this.emergencyService.cancelEmergency(this.activeEmergency!.id);
              await this.showToast('Emergency cancelled successfully');
            } catch (error) {
              console.error('Error cancelling emergency:', error);
              await this.showAlert('Error', 'Failed to cancel emergency.');
            }
          }
        }
      ]
    });
    await alert.present();
  }

  // Navigation methods
  goToIncidents() {
    this.router.navigate(['/incidents']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  goToSettings() {
    this.router.navigate(['/settings']);
  }

  goToEmergencyHistory() {
    this.router.navigate(['/emergency-history']);
  }

  // Call emergency number
  async callEmergencyNumber(number: string) {
    const alert = await this.alertController.create({
      header: 'Call Emergency',
      message: `Call ${number}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Call',
          handler: () => {
            this.emergencyService.callEmergencyNumber(number);
          }
        }
      ]
    });
    await alert.present();
  }

  // Utility methods
  private async showAlert(header: string, message: string, buttons: any[] = ['OK']) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons
    });
    await alert.present();
  }

  private async showToast(message: string, duration: number = 3000) {
    const toast = await this.toastController.create({
      message,
      duration,
      position: 'bottom'
    });
    await toast.present();
  }

  // Get emergency numbers
  get emergencyNumbers() {
    return this.emergencyService.getEmergencyNumbers();
  }
}
