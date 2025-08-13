import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonBadge,
  IonButtons,
  IonBackButton,
  IonSpinner,
  IonLabel,
  AlertController,
  ModalController,
  ActionSheetController
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { 
  refresh, 
  time, 
  location, 
  person, 
  calendar, 
  map, 
  share, 
  download, 
  checkmarkCircle, 
  addCircle, 
  alertCircle, 
  arrowBack 
} from 'ionicons/icons';

import { NavigationService } from '../../services/navigation.service';
import { SupabaseService } from '../../services/supabase.service';
import { ToastService } from '../../services/toast.service';
import { Incident, IncidentStatus, IncidentSeverity, IncidentUpdate } from '../../models/incident.model';

@Component({
  selector: 'app-incident-details',
  templateUrl: './incident-details.page.html',
  styleUrls: ['./incident-details.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonIcon,
    IonBadge,
    IonButtons,
    IonBackButton,
    IonSpinner,
    IonLabel
  ]
})
export class IncidentDetailsPage implements OnInit {
  incident: Incident | null = null;
  updates: IncidentUpdate[] = [];
  isLoading = true;
  incidentId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private navigationService: NavigationService,
    private supabaseService: SupabaseService,
    private toastService: ToastService,
    private alertController: AlertController,
    private modalController: ModalController,
    private actionSheetController: ActionSheetController
  ) {
    addIcons({ 
      refresh, 
      time, 
      location, 
      person, 
      calendar, 
      map, 
      share, 
      download, 
      checkmarkCircle, 
      addCircle, 
      alertCircle, 
      arrowBack 
    });
  }

  ngOnInit() {
    this.incidentId = this.route.snapshot.paramMap.get('id') || '';
    if (this.incidentId) {
      this.loadIncident();
    } else {
      this.isLoading = false;
    }
  }

  async loadIncident() {
    this.isLoading = true;
    try {
      // Mock incident data - in real app, this would fetch from API
      this.incident = {
        id: this.incidentId,
        userId: '1',
        securityCompanyId: '1',
        type: 'suspicious_activity',
        status: 'investigating',
        severity: 'medium',
        title: 'Suspicious Activity Reported',
        description: 'Saw someone loitering around the building entrance for over 30 minutes. The person appeared to be watching the building and taking photos.',
        location: {
          latitude: -26.2041,
          longitude: 28.0473,
          accuracy: 10
        },
        address: '123 Main Street, Johannesburg',
        photos: [
          'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
        ],
        videos: [],
        evidence: [],
        assignedPersonnelId: 'SEC001',
        tags: ['suspicious', 'loitering', 'surveillance'],
        isPublic: true,
        followUpRequired: true,
        estimatedResolution: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
        createdAt: new Date('2024-01-15T10:30:00Z'),
        updatedAt: new Date('2024-01-15T14:45:00Z')
      };

      // Mock updates
      this.updates = [
        {
          id: '1',
          incidentId: this.incidentId,
          userId: '1',
          status: 'acknowledged',
          message: 'Incident has been acknowledged and assigned to security personnel.',
          isPublic: true,
          createdAt: new Date('2024-01-15T10:35:00Z')
        },
        {
          id: '2',
          incidentId: this.incidentId,
          userId: 'SEC001',
          status: 'investigating',
          message: 'Security personnel arrived on scene. Investigating the area and reviewing CCTV footage.',
          isPublic: true,
          createdAt: new Date('2024-01-15T11:00:00Z')
        }
      ];

    } catch (error) {
      console.error('Error loading incident:', error);
      await this.toastService.showError('Failed to load incident details');
    } finally {
      this.isLoading = false;
    }
  }

  async refreshIncident() {
    await this.loadIncident();
    await this.toastService.showSuccess('Incident details refreshed');
  }

  getSeverityColor(severity: IncidentSeverity): string {
    switch (severity) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'danger';
      case 'critical': return 'danger';
      default: return 'medium';
    }
  }

  getStatusColor(status: IncidentStatus): string {
    switch (status) {
      case 'reported': return 'primary';
      case 'acknowledged': return 'secondary';
      case 'investigating': return 'warning';
      case 'in_progress': return 'warning';
      case 'resolved': return 'success';
      case 'closed': return 'success';
      case 'cancelled': return 'medium';
      default: return 'medium';
    }
  }

  getStatusDescription(status: IncidentStatus): string {
    switch (status) {
      case 'reported': return 'Incident has been reported and is awaiting review';
      case 'acknowledged': return 'Incident has been acknowledged by security personnel';
      case 'investigating': return 'Security personnel are actively investigating the incident';
      case 'in_progress': return 'Resolution is in progress';
      case 'resolved': return 'Incident has been resolved';
      case 'closed': return 'Incident case has been closed';
      case 'cancelled': return 'Incident report has been cancelled';
      default: return 'Unknown status';
    }
  }

  async openMap() {
    if (this.incident?.location) {
      const url = `https://www.google.com/maps?q=${this.incident.location.latitude},${this.incident.location.longitude}`;
      window.open(url, '_blank');
    }
  }

  async viewPhoto(photo: string, index: number) {
    // In a real app, this would open a photo viewer modal
    console.log('Viewing photo:', index);
  }

  canAddUpdate(): boolean {
    return this.incident?.status !== 'closed' && this.incident?.status !== 'cancelled';
  }

  canCloseIncident(): boolean {
    return this.incident?.status === 'resolved';
  }

  async addUpdate() {
    const alert = await this.alertController.create({
      header: 'Add Update',
      inputs: [
        {
          name: 'message',
          type: 'textarea',
          placeholder: 'Enter update message',
          attributes: {
            maxlength: 500
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
          handler: async (data) => {
            if (data.message?.trim()) {
              await this.submitUpdate(data.message);
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async submitUpdate(message: string) {
    try {
      const currentUser = await this.supabaseService.getCurrentUser();
      if (!currentUser) throw new Error('User not authenticated');

      const update: Partial<IncidentUpdate> = {
        incidentId: this.incidentId,
        userId: currentUser.id,
        status: this.incident?.status || 'reported',
        message: message.trim(),
        isPublic: true,
        createdAt: new Date()
      };

      // Mock API call
      console.log('Adding update:', update);
      
      // Add to local updates array
      this.updates.unshift({
        id: Date.now().toString(),
        ...update
      } as IncidentUpdate);

      await this.toastService.showSuccess('Update added successfully');
    } catch (error) {
      console.error('Error adding update:', error);
      await this.toastService.showError('Failed to add update');
    }
  }

  async shareIncident() {
    if (navigator.share && this.incident) {
      try {
        await navigator.share({
          title: this.incident.title,
          text: this.incident.description,
          url: window.location.href
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      await this.showShareOptions();
    }
  }

  async showShareOptions() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Share Incident',
      buttons: [
        {
          text: 'Copy Link',
          icon: 'link',
          handler: () => {
            navigator.clipboard.writeText(window.location.href);
            this.toastService.showSuccess('Link copied to clipboard');
          }
        },
        {
          text: 'Copy Details',
          icon: 'document',
          handler: () => {
            if (this.incident) {
              const details = `${this.incident.title}\n\n${this.incident.description}\n\nStatus: ${this.incident.status}\nSeverity: ${this.incident.severity}`;
              navigator.clipboard.writeText(details);
              this.toastService.showSuccess('Details copied to clipboard');
            }
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

  async exportIncident() {
    if (!this.incident) return;

    try {
      const exportData = {
        incident: this.incident,
        updates: this.updates,
        exportDate: new Date().toISOString()
      };

      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `incident-${this.incident.id}-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      await this.toastService.showSuccess('Incident exported successfully');
    } catch (error) {
      console.error('Error exporting incident:', error);
      await this.toastService.showError('Failed to export incident');
    }
  }

  async closeIncident() {
    const alert = await this.alertController.create({
      header: 'Close Incident',
      message: 'Are you sure you want to close this incident? This action cannot be undone.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Close',
          handler: async () => {
            await this.performCloseIncident();
          }
        }
      ]
    });

    await alert.present();
  }

  async performCloseIncident() {
    try {
      if (!this.incident) return;

      // Update incident status
      this.incident.status = 'closed';
      this.incident.closedAt = new Date();
      this.incident.updatedAt = new Date();

      // Add closing update
      const currentUser = await this.supabaseService.getCurrentUser();
      if (currentUser) {
        this.updates.unshift({
          id: Date.now().toString(),
          incidentId: this.incidentId,
          userId: currentUser.id,
          status: 'closed',
          message: 'Incident has been closed.',
          isPublic: true,
          createdAt: new Date()
        });
      }

      await this.toastService.showSuccess('Incident closed successfully');
    } catch (error) {
      console.error('Error closing incident:', error);
      await this.toastService.showError('Failed to close incident');
    }
  }

  goBack(): void {
    this.navigationService.goBack();
  }
}
