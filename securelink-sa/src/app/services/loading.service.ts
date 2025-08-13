import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loading: HTMLIonLoadingElement | null = null;

  constructor(private loadingController: LoadingController) {}

  /**
   * Show loading spinner
   * @param message - Loading message
   * @param spinner - Spinner type
   */
  async show(message: string = 'Loading...', spinner: 'crescent' | 'bubbles' | 'circles' | 'circular' | 'dots' | 'lines' | 'lines-small' | 'lines-sharp' | 'lines-sharp-small' = 'crescent'): Promise<void> {
    this.loading = await this.loadingController.create({
      message,
      spinner,
      translucent: true,
      backdropDismiss: false
    });
    await this.loading.present();
  }

  /**
   * Hide loading spinner
   */
  async hide(): Promise<void> {
    if (this.loading) {
      await this.loading.dismiss();
      this.loading = null;
    }
  }

  /**
   * Show loading with custom options
   * @param options - Loading options
   */
  async showWithOptions(options: any): Promise<void> {
    this.loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'crescent',
      translucent: true,
      backdropDismiss: false,
      ...options
    });
    await this.loading.present();
  }

  /**
   * Check if loading is currently shown
   */
  isShown(): boolean {
    return this.loading !== null;
  }
}
