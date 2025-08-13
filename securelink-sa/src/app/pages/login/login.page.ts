import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButton, 
  IonIcon, 
  IonCard, 
  IonCardContent,
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
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
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
    IonItem,
    IonLabel,
    IonInput,
    IonButtons,
    IonBackButton,
    FormsModule
  ]
})
export class LoginPage {
  email = '';
  password = '';

  constructor(
    private router: Router,
    private supabaseService: SupabaseService,
    private alertController: AlertController,
    private loadingService: LoadingService,
    private toastService: ToastService
  ) {
    // Show mock login info on page load
    this.showMockLoginInfo();
  }

  async login() {
    if (!this.email || !this.password) {
      await this.showAlert('Error', 'Please enter both email and password.');
      return;
    }

    await this.loadingService.show('Logging in...');

    try {
      const result = await this.supabaseService.signIn(this.email, this.password);
      await this.loadingService.hide();
      
      if (result.error) {
        await this.showAlert('Login Error', result.error.message);
      } else {
        await this.toastService.showSuccess('Login successful!');
        this.router.navigate(['/home']);
      }
    } catch (error: any) {
      await this.loadingService.hide();
      console.error('Login error:', error);
      await this.showAlert('Login Failed', error.message || 'Invalid email or password.');
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  private async showMockLoginInfo() {
    const alert = await this.alertController.create({
      header: 'Mock Login',
      message: 'For testing, use these credentials:<br><br><strong>Email:</strong> test@example.com<br><strong>Password:</strong> (any password)<br><br>Or create a new account using the registration form.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.email = 'test@example.com';
            this.password = 'password123';
          }
        }
      ]
    });
    await alert.present();
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
}
