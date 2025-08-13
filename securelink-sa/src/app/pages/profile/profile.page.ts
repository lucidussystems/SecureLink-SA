import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonAvatar,
  IonButton,
  IonIcon,
  IonBadge,
  IonButtons,
  IonBackButton,
  IonSpinner,
  IonLabel,
  IonList,
  IonItem,
  IonToggle,
  IonNote,
  AlertController,
  ActionSheetController,
  ModalController
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { 
  create, 
  camera, 
  person, 
  checkmarkCircle, 
  add, 
  create as edit, 
  trash, 
  people, 
  key, 
  fingerPrint, 
  language, 
  download, 
  shield, 
  analytics, 
  logOut, 
  alertCircle, 
  refresh 
} from 'ionicons/icons';

import { NavigationService } from '../../services/navigation.service';
import { SupabaseService } from '../../services/supabase.service';
import { ToastService } from '../../services/toast.service';
import { User, UserStatus, PreferredLanguage, UserProfile, EmergencyContact } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonAvatar,
    IonButton,
    IonIcon,
    IonBadge,
    IonButtons,
    IonBackButton,
    IonSpinner,
    IonLabel,
    IonList,
    IonItem,
    IonToggle,
    IonNote
  ]
})
export class ProfilePage implements OnInit {
  user: User | null = null;
  userProfile: UserProfile | null = null;
  isLoading = true;

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
      camera, 
      person, 
      checkmarkCircle, 
      add, 
      edit, 
      trash, 
      people, 
      key, 
      fingerPrint, 
      language, 
      download, 
      shield, 
      analytics, 
      logOut, 
      alertCircle, 
      refresh 
    });
  }

  ngOnInit() {
    this.loadProfile();
  }

  async loadProfile() {
    this.isLoading = true;
    try {
      // Load user data
      this.user = await this.supabaseService.getCurrentUser();
      
      if (this.user) {
        // Mock user profile data - in real app, this would fetch from API
        this.userProfile = {
          id: '1',
          userId: this.user.id,
          dateOfBirth: new Date('1990-01-01'),
          address: '123 Main Street',
          city: 'Johannesburg',
          province: 'Gauteng',
          postalCode: '2000',
          emergencyContacts: [
            {
              id: '1',
              name: 'John Doe',
              phone: '+27123456789',
              relationship: 'Spouse',
              isPrimary: true
            },
            {
              id: '2',
              name: 'Jane Smith',
              phone: '+27123456790',
              relationship: 'Daughter',
              isPrimary: false
            }
          ],
          medicalInfo: 'Hypertension, Diabetes',
          allergies: ['Peanuts', 'Shellfish'],
          medications: ['Metformin', 'Lisinopril'],
          bloodType: 'O+',
          createdAt: new Date('2024-01-01T00:00:00Z'),
          updatedAt: new Date('2024-01-01T00:00:00Z')
        };
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      await this.toastService.showError('Failed to load profile');
    } finally {
      this.isLoading = false;
    }
  }

  getStatusColor(status: UserStatus): string {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'medium';
      case 'suspended': return 'danger';
      case 'pending_verification': return 'warning';
      default: return 'medium';
    }
  }

  getLanguageLabel(language: PreferredLanguage): string {
    switch (language) {
      case 'en': return 'English';
      case 'af': return 'Afrikaans';
      case 'zu': return 'Zulu';
      case 'xh': return 'Xhosa';
      default: return 'English';
    }
  }

  async editProfile() {
    // In a real app, this would navigate to an edit profile page
    await this.toastService.showInfo('Edit profile functionality coming soon');
  }

  async changeProfilePicture() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Change Profile Picture',
      buttons: [
        {
          text: 'Take Photo',
          icon: 'camera',
          handler: () => {
            this.takePhoto();
          }
        },
        {
          text: 'Choose from Gallery',
          icon: 'images',
          handler: () => {
            this.chooseFromGallery();
          }
        },
        {
          text: 'Remove Current Picture',
          icon: 'trash',
          handler: () => {
            this.removeProfilePicture();
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

  async takePhoto() {
    // Mock photo capture
    await this.toastService.showInfo('Photo capture functionality coming soon');
  }

  async chooseFromGallery() {
    // Mock gallery selection
    await this.toastService.showInfo('Gallery selection functionality coming soon');
  }

  async removeProfilePicture() {
    if (this.user) {
      this.user.profilePicture = undefined;
      await this.toastService.showSuccess('Profile picture removed');
    }
  }

  async addEmergencyContact() {
    const alert = await this.alertController.create({
      header: 'Add Emergency Contact',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Full Name',
          attributes: {
            maxlength: 50
          }
        },
        {
          name: 'phone',
          type: 'tel',
          placeholder: 'Phone Number',
          attributes: {
            maxlength: 15
          }
        },
        {
          name: 'relationship',
          type: 'text',
          placeholder: 'Relationship',
          attributes: {
            maxlength: 30
          }
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: (data: any) => {
            this.performAddEmergencyContact(data);
          }
        }
      ]
    });

    await alert.present();
  }

  async performAddEmergencyContact(data: any) {
    if (!data.name?.trim() || !data.phone?.trim()) {
      await this.toastService.showError('Name and phone are required');
      return;
    }

    if (!this.userProfile) return;

    const newContact: EmergencyContact = {
      id: Date.now().toString(),
      name: data.name.trim(),
      phone: data.phone.trim(),
      relationship: data.relationship?.trim() || 'Other',
      isPrimary: this.userProfile.emergencyContacts.length === 0
    };

    this.userProfile.emergencyContacts.push(newContact);
    await this.toastService.showSuccess('Emergency contact added successfully');
  }

  async editEmergencyContact(contact: EmergencyContact) {
    const alert = await this.alertController.create({
      header: 'Edit Emergency Contact',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Full Name',
          value: contact.name,
          attributes: {
            maxlength: 50
          }
        },
        {
          name: 'phone',
          type: 'tel',
          placeholder: 'Phone Number',
          value: contact.phone,
          attributes: {
            maxlength: 15
          }
        },
        {
          name: 'relationship',
          type: 'text',
          placeholder: 'Relationship',
          value: contact.relationship,
          attributes: {
            maxlength: 30
          }
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Update',
          handler: (data: any) => {
            this.performUpdateEmergencyContact(contact, data);
          }
        }
      ]
    });

    await alert.present();
  }

  async performUpdateEmergencyContact(contact: EmergencyContact, data: any) {
    if (!data.name?.trim() || !data.phone?.trim()) {
      await this.toastService.showError('Name and phone are required');
      return;
    }

    contact.name = data.name.trim();
    contact.phone = data.phone.trim();
    contact.relationship = data.relationship?.trim() || 'Other';

    await this.toastService.showSuccess('Emergency contact updated successfully');
  }

  async deleteEmergencyContact(contact: EmergencyContact) {
    const alert = await this.alertController.create({
      header: 'Delete Emergency Contact',
      message: `Are you sure you want to delete ${contact.name}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => {
            this.performDeleteEmergencyContact(contact);
          }
        }
      ]
    });

    await alert.present();
  }

  async performDeleteEmergencyContact(contact: EmergencyContact) {
    if (!this.userProfile) return;

    this.userProfile.emergencyContacts = this.userProfile.emergencyContacts.filter(c => c.id !== contact.id);
    await this.toastService.showSuccess('Emergency contact deleted successfully');
  }

  async updateNotificationSettings() {
    if (!this.user) return;

    try {
      await this.supabaseService.updateUserProfile({
        notificationSettings: this.user.notificationSettings
      });
      await this.toastService.showSuccess('Notification settings updated');
    } catch (error) {
      console.error('Error updating notification settings:', error);
      await this.toastService.showError('Failed to update notification settings');
    }
  }

  async updateBiometricSetting() {
    if (!this.user) return;

    try {
      await this.supabaseService.updateUserProfile({
        biometricEnabled: this.user.biometricEnabled
      });
      await this.toastService.showSuccess('Biometric setting updated');
    } catch (error) {
      console.error('Error updating biometric setting:', error);
      await this.toastService.showError('Failed to update biometric setting');
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
          handler: (data: any) => {
            this.performChangePassword(data);
          }
        }
      ]
    });

    await alert.present();
  }

  async performChangePassword(data: any) {
    if (!data.currentPassword || !data.newPassword || !data.confirmPassword) {
      await this.toastService.showError('All fields are required');
      return;
    }

    if (data.newPassword !== data.confirmPassword) {
      await this.toastService.showError('New passwords do not match');
      return;
    }

    if (data.newPassword.length < 8) {
      await this.toastService.showError('Password must be at least 8 characters');
      return;
    }

    // Mock password change
    await this.toastService.showSuccess('Password changed successfully');
  }

  async toggleBiometric() {
    // This is handled by the toggle in the template
    // The actual biometric authentication would be implemented here
  }

  async changeLanguage() {
    const alert = await this.alertController.create({
      header: 'Select Language',
      inputs: [
        {
          type: 'radio',
          label: 'English',
          value: 'en',
          checked: this.user?.preferredLanguage === 'en'
        },
        {
          type: 'radio',
          label: 'Afrikaans',
          value: 'af',
          checked: this.user?.preferredLanguage === 'af'
        },
        {
          type: 'radio',
          label: 'Zulu',
          value: 'zu',
          checked: this.user?.preferredLanguage === 'zu'
        },
        {
          type: 'radio',
          label: 'Xhosa',
          value: 'xh',
          checked: this.user?.preferredLanguage === 'xh'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Select',
          handler: (data: any) => {
            this.performChangeLanguage(data);
          }
        }
      ]
    });

    await alert.present();
  }

  async performChangeLanguage(language: PreferredLanguage) {
    if (!this.user) return;

    this.user.preferredLanguage = language;
    try {
      await this.supabaseService.updateUserProfile({
        preferredLanguage: language
      });
      await this.toastService.showSuccess('Language changed successfully');
    } catch (error) {
      console.error('Error changing language:', error);
      await this.toastService.showError('Failed to change language');
    }
  }

  async exportData() {
    if (!this.user || !this.userProfile) return;

    try {
      const exportData = {
        user: this.user,
        profile: this.userProfile,
        exportDate: new Date().toISOString()
      };

      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `profile-${this.user.id}-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      await this.toastService.showSuccess('Profile data exported successfully');
    } catch (error) {
      console.error('Error exporting data:', error);
      await this.toastService.showError('Failed to export data');
    }
  }

  async privacySettings() {
    await this.toastService.showInfo('Privacy settings functionality coming soon');
  }

  async dataUsage() {
    await this.toastService.showInfo('Data usage functionality coming soon');
  }

  async deleteAccount() {
    const alert = await this.alertController.create({
      header: 'Delete Account',
      message: 'Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently lost.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          cssClass: 'alert-button-danger',
          handler: () => {
            this.performDeleteAccount();
          }
        }
      ]
    });

    await alert.present();
  }

  async performDeleteAccount() {
    try {
      // Mock account deletion
      await this.supabaseService.signOut();
      this.router.navigate(['/login']);
      await this.toastService.showSuccess('Account deleted successfully');
    } catch (error) {
      console.error('Error deleting account:', error);
      await this.toastService.showError('Failed to delete account');
    }
  }

  async signOut() {
    const alert = await this.alertController.create({
      header: 'Sign Out',
      message: 'Are you sure you want to sign out?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Sign Out',
          handler: () => {
            this.performSignOut();
          }
        }
      ]
    });

    await alert.present();
  }

  async performSignOut() {
    try {
      await this.supabaseService.signOut();
      this.router.navigate(['/login']);
      await this.toastService.showSuccess('Signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
      await this.toastService.showError('Failed to sign out');
    }
  }

  goBack(): void {
    this.navigationService.goBack();
  }
}
