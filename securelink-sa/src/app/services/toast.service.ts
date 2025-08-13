import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private toastController: ToastController) {}

  /**
   * Show success toast
   * @param message - Toast message
   * @param duration - Duration in milliseconds
   */
  async showSuccess(message: string, duration: number = 3000): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration,
      position: 'bottom',
      color: 'success',
      buttons: [
        {
          icon: 'checkmark',
          role: 'cancel'
        }
      ]
    });
    await toast.present();
  }

  /**
   * Show error toast
   * @param message - Toast message
   * @param duration - Duration in milliseconds
   */
  async showError(message: string, duration: number = 4000): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration,
      position: 'bottom',
      color: 'danger',
      buttons: [
        {
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    await toast.present();
  }

  /**
   * Show warning toast
   * @param message - Toast message
   * @param duration - Duration in milliseconds
   */
  async showWarning(message: string, duration: number = 3500): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration,
      position: 'bottom',
      color: 'warning',
      buttons: [
        {
          icon: 'warning',
          role: 'cancel'
        }
      ]
    });
    await toast.present();
  }

  /**
   * Show info toast
   * @param message - Toast message
   * @param duration - Duration in milliseconds
   */
  async showInfo(message: string, duration: number = 3000): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration,
      position: 'bottom',
      color: 'primary',
      buttons: [
        {
          icon: 'information',
          role: 'cancel'
        }
      ]
    });
    await toast.present();
  }

  /**
   * Show custom toast
   * @param options - Toast options
   */
  async showCustom(options: any): Promise<void> {
    const toast = await this.toastController.create({
      message: 'Toast message',
      duration: 3000,
      position: 'bottom',
      ...options
    });
    await toast.present();
  }
}
