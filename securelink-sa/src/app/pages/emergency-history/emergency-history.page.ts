import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonList,
  IonItem,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonThumbnail,
  IonIcon,
  IonBadge,
  IonButtons,
  IonBackButton,
  IonButton,
  IonSpinner,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonModal,
  AlertController,
  ActionSheetController
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { 
  refresh, 
  chevronForward, 
  eye, 
  share, 
  trash, 
  shieldCheckmark, 
  close, 
  map,
  warning,
  medical,
  flame,
  person,
  car,
  paw,
  home,
  alertCircle
} from 'ionicons/icons';

import { NavigationService } from '../../services/navigation.service';
import { SupabaseService } from '../../services/supabase.service';
import { ToastService } from '../../services/toast.service';
import { Emergency, EmergencyType, EmergencyStatus, EmergencyPriority } from '../../models/emergency.model';

@Component({
  selector: 'app-emergency-history',
  templateUrl: './emergency-history.page.html',
  styleUrls: ['./emergency-history.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent,
    IonSearchbar,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonList,
    IonItem,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonThumbnail,
    IonIcon,
    IonBadge,
    IonButtons,
    IonBackButton,
    IonButton,
    IonSpinner,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonModal
  ]
})
export class EmergencyHistoryPage implements OnInit {
  emergencies: Emergency[] = [];
  filteredEmergencies: Emergency[] = [];
  selectedEmergency: Emergency | null = null;
  showEmergencyModal = false;
  isLoading = true;
  searchTerm = '';
  selectedFilter = 'all';

  constructor(
    private navigationService: NavigationService,
    private supabaseService: SupabaseService,
    private toastService: ToastService,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController
  ) {
    addIcons({ 
      refresh, 
      chevronForward, 
      eye, 
      share, 
      trash, 
      shieldCheckmark, 
      close, 
      map,
      warning,
      medical,
      flame,
      person,
      car,
      paw,
      home,
      alertCircle
    });
  }

  ngOnInit() {
    this.loadEmergencies();
  }

  async loadEmergencies() {
    this.isLoading = true;
    try {
      // Mock emergency data - in real app, this would fetch from API
      this.emergencies = [
        {
          id: '1',
          userId: '1',
          securityCompanyId: '1',
          type: 'panic',
          status: 'resolved',
          priority: 'high',
          location: {
            latitude: -26.2041,
            longitude: 28.0473,
            accuracy: 10
          },
          address: '123 Main Street, Johannesburg',
          description: 'Panic button activated due to suspicious activity',
          isActive: false,
          isSilent: false,
          assignedPersonnelId: 'SEC001',
          estimatedResponseTime: 5,
          actualResponseTime: 4,
          photos: [],
          videos: [],
          emergencyContacts: [
            {
              id: '1',
              name: 'John Doe',
              phone: '+27123456789',
              relationship: 'Spouse',
              isPrimary: true
            }
          ],
          createdAt: new Date('2024-01-15T10:30:00Z'),
          updatedAt: new Date('2024-01-15T10:45:00Z'),
          resolvedAt: new Date('2024-01-15T10:45:00Z')
        },
        {
          id: '2',
          userId: '1',
          securityCompanyId: '1',
          type: 'medical',
          status: 'resolved',
          priority: 'critical',
          location: {
            latitude: -26.2041,
            longitude: 28.0473,
            accuracy: 15
          },
          address: '456 Oak Avenue, Johannesburg',
          description: 'Medical emergency - chest pain',
          isActive: false,
          isSilent: false,
          assignedPersonnelId: 'SEC002',
          estimatedResponseTime: 3,
          actualResponseTime: 2,
          photos: [],
          videos: [],
          emergencyContacts: [
            {
              id: '2',
              name: 'Jane Smith',
              phone: '+27123456790',
              relationship: 'Daughter',
              isPrimary: true
            }
          ],
          createdAt: new Date('2024-01-14T15:20:00Z'),
          updatedAt: new Date('2024-01-14T15:25:00Z'),
          resolvedAt: new Date('2024-01-14T15:25:00Z')
        },
        {
          id: '3',
          userId: '1',
          securityCompanyId: '1',
          type: 'fire',
          status: 'active',
          priority: 'critical',
          location: {
            latitude: -26.2041,
            longitude: 28.0473,
            accuracy: 20
          },
          address: '789 Pine Street, Johannesburg',
          description: 'Fire alarm triggered - smoke detected',
          isActive: true,
          isSilent: false,
          assignedPersonnelId: 'SEC003',
          estimatedResponseTime: 2,
          photos: [],
          videos: [],
          emergencyContacts: [
            {
              id: '3',
              name: 'Bob Johnson',
              phone: '+27123456791',
              relationship: 'Neighbor',
              isPrimary: true
            }
          ],
          createdAt: new Date('2024-01-16T08:15:00Z'),
          updatedAt: new Date('2024-01-16T08:15:00Z')
        }
      ];

      this.filteredEmergencies = [...this.emergencies];
    } catch (error) {
      console.error('Error loading emergencies:', error);
      await this.toastService.showError('Failed to load emergency history');
    } finally {
      this.isLoading = false;
    }
  }

  async refreshEmergencies() {
    await this.loadEmergencies();
    await this.toastService.showSuccess('Emergency history refreshed');
  }

  filterEmergencies() {
    let filtered = [...this.emergencies];

    // Apply status filter
    if (this.selectedFilter !== 'all') {
      filtered = filtered.filter(emergency => emergency.status === this.selectedFilter);
    }

    // Apply search filter
    if (this.searchTerm.trim()) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(emergency => 
        emergency.description?.toLowerCase().includes(searchLower) ||
        emergency.address?.toLowerCase().includes(searchLower) ||
        this.getEmergencyTypeLabel(emergency.type).toLowerCase().includes(searchLower)
      );
    }

    this.filteredEmergencies = filtered;
  }

  clearFilters() {
    this.searchTerm = '';
    this.selectedFilter = 'all';
    this.filteredEmergencies = [...this.emergencies];
  }

  getEmergencyIcon(type: EmergencyType): string {
    switch (type) {
      case 'panic': return 'warning';
      case 'medical': return 'medical';
      case 'fire': return 'flame';
      case 'break_in': return 'person';
      case 'suspicious_activity': return 'alertCircle';
      case 'personal_safety': return 'shieldCheckmark';
      case 'property_damage': return 'home';
      case 'other': return 'paw';
      default: return 'alertCircle';
    }
  }

  getEmergencyColor(type: EmergencyType): string {
    switch (type) {
      case 'panic': return 'danger';
      case 'medical': return 'danger';
      case 'fire': return 'danger';
      case 'break_in': return 'warning';
      case 'suspicious_activity': return 'warning';
      case 'personal_safety': return 'primary';
      case 'property_damage': return 'medium';
      case 'other': return 'medium';
      default: return 'medium';
    }
  }

  getEmergencyTypeLabel(type: EmergencyType): string {
    switch (type) {
      case 'panic': return 'Panic Alert';
      case 'silent_alarm': return 'Silent Alarm';
      case 'medical': return 'Medical Emergency';
      case 'fire': return 'Fire Incident';
      case 'break_in': return 'Break-in';
      case 'suspicious_activity': return 'Suspicious Activity';
      case 'personal_safety': return 'Personal Safety';
      case 'property_damage': return 'Property Damage';
      case 'other': return 'Other Emergency';
      default: return 'Other Emergency';
    }
  }

  getStatusColor(status: EmergencyStatus): string {
    switch (status) {
      case 'active': return 'danger';
      case 'dispatched': return 'warning';
      case 'en_route': return 'warning';
      case 'arrived': return 'primary';
      case 'resolved': return 'success';
      case 'cancelled': return 'medium';
      case 'false_alarm': return 'medium';
      default: return 'medium';
    }
  }

  getPriorityColor(priority: EmergencyPriority): string {
    switch (priority) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'danger';
      case 'critical': return 'danger';
      default: return 'medium';
    }
  }

  viewEmergency(emergency: Emergency) {
    this.selectedEmergency = emergency;
    this.showEmergencyModal = true;
  }

  closeEmergencyModal() {
    this.showEmergencyModal = false;
    this.selectedEmergency = null;
  }

  async shareEmergency(emergency: Emergency) {
    if (navigator.share) {
      try {
        await navigator.share({
          title: this.getEmergencyTypeLabel(emergency.type),
          text: emergency.description || 'Emergency reported',
          url: window.location.href
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      await this.showShareOptions(emergency);
    }
  }

  async showShareOptions(emergency: Emergency) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Share Emergency',
      buttons: [
        {
          text: 'Copy Details',
          icon: 'document',
          handler: () => {
            const details = `${this.getEmergencyTypeLabel(emergency.type)}\n\n${emergency.description || 'Emergency reported'}\n\nStatus: ${emergency.status}\nPriority: ${emergency.priority}`;
            navigator.clipboard.writeText(details);
            this.toastService.showSuccess('Details copied to clipboard');
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

  async deleteEmergency(emergency: Emergency) {
    const alert = await this.alertController.create({
      header: 'Delete Emergency',
      message: 'Are you sure you want to delete this emergency record? This action cannot be undone.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => {
            this.performDeleteEmergency(emergency);
          }
        }
      ]
    });

    await alert.present();
  }

  async performDeleteEmergency(emergency: Emergency) {
    try {
      // Remove from local array
      this.emergencies = this.emergencies.filter(e => e.id !== emergency.id);
      this.filteredEmergencies = this.filteredEmergencies.filter(e => e.id !== emergency.id);
      
      await this.toastService.showSuccess('Emergency deleted successfully');
    } catch (error) {
      console.error('Error deleting emergency:', error);
      await this.toastService.showError('Failed to delete emergency');
    }
  }

  async openMap(emergency: Emergency) {
    if (emergency.location) {
      const url = `https://www.google.com/maps?q=${emergency.location.latitude},${emergency.location.longitude}`;
      window.open(url, '_blank');
    }
  }

  // Statistics methods
  getTotalEmergencies(): number {
    return this.emergencies.length;
  }

  getActiveEmergencies(): number {
    return this.emergencies.filter(e => e.status === 'active').length;
  }

  getResolvedEmergencies(): number {
    return this.emergencies.filter(e => e.status === 'resolved').length;
  }

  getAverageResponseTime(): number {
    const resolvedEmergencies = this.emergencies.filter(e => e.actualResponseTime);
    if (resolvedEmergencies.length === 0) return 0;
    
    const totalTime = resolvedEmergencies.reduce((sum, e) => sum + (e.actualResponseTime || 0), 0);
    return Math.round(totalTime / resolvedEmergencies.length);
  }

  goBack(): void {
    this.navigationService.goBack();
  }
}
