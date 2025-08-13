import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent,
  IonCard,
  IonCardContent,
  IonList,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonIcon,
  IonButton,
  IonToggle,
  IonNote,
  IonAvatar,
  IonSpinner,
  IonButtons,
  IonBackButton,
  AlertController,
  ActionSheetController,
  ModalController
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { 
  create,
  lockClosed,
  mail,
  business,
  notifications,
  volumeHigh,
  fingerPrint,
  location,
  eye,
  download,
  moon,
  language,
  colorPalette,
  refresh,
  helpCircle,
  chatbubbles,
  shieldCheckmark,
  documentText,
  informationCircle,
  trash,
  logOut,
  chevronForward,
  phonePortrait
} from 'ionicons/icons';

import { NavigationService } from '../../services/navigation.service';
import { SupabaseService } from '../../services/supabase.service';
import { ToastService } from '../../services/toast.service';

interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  role: string;
  avatar?: string;
  phone?: string;
  securityCompanyId?: string;
}

interface AppSettings {
  pushNotifications: boolean;
  emailNotifications: boolean;
  soundAlerts: boolean;
  vibration: boolean;
  biometricLogin: boolean;
  locationServices: boolean;
  publicProfile: boolean;
  darkMode: boolean;
  language: string;
  theme: string;
  autoRefresh: boolean;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent,
    IonCard,
    IonCardContent,
    IonList,
    IonItem,
    IonItemDivider,
    IonLabel,
    IonIcon,
    IonButton,
    IonToggle,
    IonNote,
    IonAvatar,
    IonSpinner,
    IonButtons,
    IonBackButton
  ]
})
export class SettingsPage implements OnInit {
  isLoading = true;
  userProfile: UserProfile | null = null;
  settings: AppSettings = {
    pushNotifications: true,
    emailNotifications: true,
    soundAlerts: true,
    vibration: true,
    biometricLogin: false,
    locationServices: true,
    publicProfile: false,
    darkMode: false,
    language: 'english',
    theme: 'default',
    autoRefresh: true
  };
  appVersion = '1.0.0';

  constructor(
    private router: Router,
    private navigationService: NavigationService,
    private supabaseService: SupabaseService,
    private toastService: ToastService,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController,
    private modalController: ModalController
  ) {
    addIcons({ 
      create,
      lockClosed,
      mail,
      business,
      notifications,
      volumeHigh,
      phonePortrait,
      fingerPrint,
      location,
      eye,
      download,
      moon,
      language,
      colorPalette,
      refresh,
      helpCircle,
      chatbubbles,
      shieldCheckmark,
      documentText,
      informationCircle,
      trash,
      logOut,
      chevronForward
    });
  }

  async ngOnInit() {
    await this.loadUserProfile();
    await this.loadSettings();
    this.isLoading = false;
  }

  async loadUserProfile() {
    try {
      const currentUser = await this.supabaseService.getCurrentUser();
      if (currentUser) {
        // Mock user profile - in real app, this would fetch from API
        this.userProfile = {
          id: currentUser.id,
          fullName: currentUser.firstName + ' ' + currentUser.lastName || 'John Doe',
          email: currentUser.email || 'user@example.com',
          role: 'Security User',
          avatar: undefined, // Will use default avatar
          phone: currentUser.phone,
          securityCompanyId: 'SEC001'
        };
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  }

  async loadSettings() {
    try {
      // Load settings from local storage or API
      const savedSettings = localStorage.getItem('appSettings');
      if (savedSettings) {
        this.settings = { ...this.settings, ...JSON.parse(savedSettings) };
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  }

  async saveSettings() {
    try {
      localStorage.setItem('appSettings', JSON.stringify(this.settings));
      await this.toastService.showSuccess('Settings saved successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
      await this.toastService.showError('Failed to save settings');
    }
  }

  async editProfile() {
    const alert = await this.alertController.create({
      header: 'Edit Profile',
      inputs: [
        {
          name: 'fullName',
          type: 'text',
          placeholder: 'Full Name',
          value: this.userProfile?.fullName
        },
        {
          name: 'phone',
          type: 'tel',
          placeholder: 'Phone Number',
          value: this.userProfile?.phone
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Save',
          handler: async (data) => {
            await this.updateProfile(data);
          }
        }
      ]
    });

    await alert.present();
  }

  async updateProfile(data: any) {
    try {
      if (this.userProfile) {
        this.userProfile.fullName = data.fullName;
        this.userProfile.phone = data.phone;
        
        // In real app, this would update the user profile in the database
        await this.toastService.showSuccess('Profile updated successfully');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      await this.toastService.showError('Failed to update profile');
    }
  }

  async changePassword() {
    const alert = await this.alertController.create({
      header: 'Change Password',
      inputs: [
        {
          name: 'currentPassword',
          type: 'password',
          placeholder: 'Current Password'
        },
        {
          name: 'newPassword',
          type: 'password',
          placeholder: 'New Password'
        },
        {
          name: 'confirmPassword',
          type: 'password',
          placeholder: 'Confirm New Password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Change',
          handler: async (data) => {
            if (data.newPassword === data.confirmPassword) {
              await this.updatePassword(data.currentPassword, data.newPassword);
            } else {
              await this.toastService.showError('Passwords do not match');
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async updatePassword(currentPassword: string, newPassword: string) {
    try {
      // In real app, this would call the authentication service
      await this.toastService.showSuccess('Password changed successfully');
    } catch (error) {
      console.error('Error changing password:', error);
      await this.toastService.showError('Failed to change password');
    }
  }

  async updateEmail() {
    const alert = await this.alertController.create({
      header: 'Update Email',
      inputs: [
        {
          name: 'newEmail',
          type: 'email',
          placeholder: 'New Email Address'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Update',
          handler: async (data) => {
            await this.changeEmail(data.newEmail);
          }
        }
      ]
    });

    await alert.present();
  }

  async changeEmail(newEmail: string) {
    try {
      // In real app, this would call the authentication service
      if (this.userProfile) {
        this.userProfile.email = newEmail;
      }
      await this.toastService.showSuccess('Email updated successfully');
    } catch (error) {
      console.error('Error updating email:', error);
      await this.toastService.showError('Failed to update email');
    }
  }

  async manageSecurityCompany() {
    await this.toastService.showInfo('Security company management coming soon');
  }

  async updateNotificationSettings() {
    await this.saveSettings();
  }

  async updateSecuritySettings() {
    await this.saveSettings();
  }

  async updateLocationSettings() {
    await this.saveSettings();
  }

  async updatePrivacySettings() {
    await this.saveSettings();
  }

  async updateAppSettings() {
    await this.saveSettings();
  }

  async toggleDarkMode() {
    document.body.classList.toggle('dark', this.settings.darkMode);
    await this.saveSettings();
  }

  async selectLanguage() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Language',
      buttons: [
        {
          text: 'English',
          handler: () => {
            this.settings.language = 'english';
            this.saveSettings();
          }
        },
        {
          text: 'Afrikaans',
          handler: () => {
            this.settings.language = 'afrikaans';
            this.saveSettings();
          }
        },
        {
          text: 'Zulu',
          handler: () => {
            this.settings.language = 'zulu';
            this.saveSettings();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }

  async selectTheme() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Theme',
      buttons: [
        {
          text: 'Default',
          handler: () => {
            this.settings.theme = 'default';
            this.saveSettings();
          }
        },
        {
          text: 'Blue',
          handler: () => {
            this.settings.theme = 'blue';
            this.saveSettings();
          }
        },
        {
          text: 'Green',
          handler: () => {
            this.settings.theme = 'green';
            this.saveSettings();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }

  async exportData() {
    try {
      const exportData = {
        userProfile: this.userProfile,
        settings: this.settings,
        exportDate: new Date().toISOString()
      };

      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `securelink-data-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      await this.toastService.showSuccess('Data exported successfully');
    } catch (error) {
      console.error('Error exporting data:', error);
      await this.toastService.showError('Failed to export data');
    }
  }

  async viewHelp() {
    await this.toastService.showInfo('Help documentation coming soon');
  }

  async contactSupport() {
    const alert = await this.alertController.create({
      header: 'Contact Support',
      message: 'For support, please email us at support@securelink-sa.com or call +27 11 123 4567',
      buttons: ['OK']
    });

    await alert.present();
  }

  async viewPrivacyPolicy() {
    await this.toastService.showInfo('Privacy policy coming soon');
  }

  async viewTermsOfService() {
    await this.toastService.showInfo('Terms of service coming soon');
  }

  async viewAbout() {
    const alert = await this.alertController.create({
      header: 'About SecureLink SA',
      message: `
        <p><strong>Version:</strong> ${this.appVersion}</p>
        <p><strong>Build:</strong> 2024.1.0</p>
        <p>SecureLink SA is a comprehensive security incident management platform designed to keep communities safe.</p>
        <p>&copy; 2024 SecureLink SA. All rights reserved.</p>
      `,
      buttons: ['OK']
    });

    await alert.present();
  }

  async clearCache() {
    const alert = await this.alertController.create({
      header: 'Clear Cache',
      message: 'Are you sure you want to clear the app cache? This will remove all locally stored data.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Clear',
          handler: async () => {
            try {
              localStorage.clear();
              await this.toastService.showSuccess('Cache cleared successfully');
              // Reload the page to reset all data
              window.location.reload();
            } catch (error) {
              console.error('Error clearing cache:', error);
              await this.toastService.showError('Failed to clear cache');
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Logout',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Logout',
          handler: async () => {
            try {
              await this.supabaseService.signOut();
              this.router.navigate(['/login']);
              await this.toastService.showSuccess('Logged out successfully');
            } catch (error) {
              console.error('Error logging out:', error);
              await this.toastService.showError('Failed to logout');
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteAccount() {
    const alert = await this.alertController.create({
      header: 'Delete Account',
      message: 'Are you sure you want to delete your account? This action cannot be undone and will permanently remove all your data.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          cssClass: 'danger',
          handler: async () => {
            try {
              // In real app, this would call the API to delete the account
              await this.supabaseService.signOut();
              this.router.navigate(['/login']);
              await this.toastService.showSuccess('Account deleted successfully');
            } catch (error) {
              console.error('Error deleting account:', error);
              await this.toastService.showError('Failed to delete account');
            }
          }
        }
      ]
    });

    await alert.present();
  }

  goBack(): void {
    this.navigationService.goBack();
  }
}
