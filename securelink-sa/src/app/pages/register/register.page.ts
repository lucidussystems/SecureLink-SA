import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButton, 
  IonItem,
  IonLabel,
  IonInput,
  IonButtons,
  IonBackButton
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../services/supabase.service';
import { LoadingService } from '../../services/loading.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonButton, 
    IonItem,
    IonLabel,
    IonInput,
    IonButtons,
    IonBackButton,
    FormsModule
  ]
})
export class RegisterPage {
  userData = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  };

  constructor(
    private router: Router,
    private supabaseService: SupabaseService,
    private alertController: AlertController,
    private loadingService: LoadingService,
    private toastService: ToastService
  ) {}

  async register() {
    // Validate form
    if (!this.validateForm()) {
      return;
    }

    await this.loadingService.show('Creating your account...');

    try {
      const result = await this.supabaseService.signUp(
        this.userData.email,
        this.userData.password,
        {
          first_name: this.userData.first_name,
          last_name: this.userData.last_name,
          phone: this.userData.phone,
          email: this.userData.email
        }
      );

      await this.loadingService.hide();

      if (result.error) {
        await this.showAlert('Registration Error', result.error.message);
      } else {
        await this.toastService.showSuccess('Account created successfully!');
        this.router.navigate(['/login']);
      }
    } catch (error: any) {
      await this.loadingService.hide();
      console.error('Registration error:', error);
      await this.showAlert('Registration Error', error.message || 'Failed to create account');
    }
  }

  private validateForm(): boolean {
    if (!this.userData.first_name.trim()) {
      this.showAlert('Validation Error', 'Please enter your first name');
      return false;
    }

    if (!this.userData.last_name.trim()) {
      this.showAlert('Validation Error', 'Please enter your last name');
      return false;
    }

    if (!this.userData.email.trim()) {
      this.showAlert('Validation Error', 'Please enter your email');
      return false;
    }

    if (!this.isValidEmail(this.userData.email)) {
      this.showAlert('Validation Error', 'Please enter a valid email address');
      return false;
    }

    if (!this.userData.phone.trim()) {
      this.showAlert('Validation Error', 'Please enter your phone number');
      return false;
    }

    if (!this.userData.password) {
      this.showAlert('Validation Error', 'Please enter a password');
      return false;
    }

    if (this.userData.password.length < 6) {
      this.showAlert('Validation Error', 'Password must be at least 6 characters long');
      return false;
    }

    if (this.userData.password !== this.userData.confirmPassword) {
      this.showAlert('Validation Error', 'Passwords do not match');
      return false;
    }

    return true;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  private async showToast(message: string) {
    await this.toastService.showSuccess(message);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
