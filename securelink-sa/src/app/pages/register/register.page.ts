import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  userData = {
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: ''
  };

  constructor(
    private router: Router,
    private supabaseService: SupabaseService,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {}

  async register() {
    // Validate passwords match
    if (this.userData.password !== this.userData.confirmPassword) {
      await this.showAlert('Error', 'Passwords do not match');
      return;
    }

    // Validate required fields
    if (!this.userData.email || !this.userData.password || !this.userData.firstName || !this.userData.lastName) {
      await this.showAlert('Error', 'Please fill in all required fields');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Creating account...',
      spinner: 'crescent'
    });
    await loading.present();

    try {
      const userData = {
        first_name: this.userData.firstName,
        last_name: this.userData.lastName,
        phone: this.userData.phone || null,
        role: 'customer',
        status: 'active',
        preferred_language: 'en',
        is_verified: false,
        biometric_enabled: false,
        notification_settings: {
          emergencyAlerts: true,
          incidentUpdates: true,
          securityNews: false,
          pushNotifications: true,
          emailNotifications: true,
          smsNotifications: false
        }
      };

      await this.supabaseService.signUp(this.userData.email, this.userData.password, userData);
      
      await loading.dismiss();
      
      await this.showAlert(
        'Registration Successful', 
        'Please check your email to verify your account before logging in.',
        [
          {
            text: 'OK',
            handler: () => {
              this.router.navigate(['/login']);
            }
          }
        ]
      );
    } catch (error: any) {
      await loading.dismiss();
      console.error('Registration error:', error);
      await this.showAlert('Registration Failed', error.message || 'An error occurred during registration');
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  private async showAlert(header: string, message: string, buttons: any[] = ['OK']) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons
    });
    await alert.present();
  }
}
