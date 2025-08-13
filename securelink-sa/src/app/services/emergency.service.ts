import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Emergency, EmergencyType, EmergencyStatus } from '../models/emergency.model';
import { SupabaseService } from './supabase.service';
import { LocationService } from './location.service';

@Injectable({
  providedIn: 'root'
})
export class EmergencyService {
  private activeEmergency = new BehaviorSubject<Emergency | null>(null);
  private emergencyHistory = new BehaviorSubject<Emergency[]>([]);

  constructor(
    private platform: Platform,
    private supabaseService: SupabaseService,
    private locationService: LocationService
  ) {
    this.loadMockEmergencyHistory();
  }

  // Mock emergency history data
  private loadMockEmergencyHistory() {
    const mockEmergencies: Emergency[] = [
      {
        id: '1',
        userId: '1',
        securityCompanyId: 'default',
        type: 'panic',
        status: 'resolved',
        priority: 'high',
        location: { latitude: -26.2041, longitude: 28.0473 },
        address: '123 Main St, Johannesburg',
        description: 'Emergency panic button activated',
        isActive: false,
        isSilent: false,
        photos: [],
        videos: [],
        emergencyContacts: [],
        createdAt: new Date('2024-01-15T10:30:00Z'),
        updatedAt: new Date('2024-01-15T10:45:00Z'),
        resolvedAt: new Date('2024-01-15T10:45:00Z')
      },
      {
        id: '2',
        userId: '1',
        securityCompanyId: 'default',
        type: 'medical',
        status: 'resolved',
        priority: 'critical',
        location: { latitude: -26.2041, longitude: 28.0473 },
        address: '123 Main St, Johannesburg',
        description: 'Medical emergency - chest pain',
        isActive: false,
        isSilent: false,
        photos: [],
        videos: [],
        emergencyContacts: [],
        createdAt: new Date('2024-01-10T14:20:00Z'),
        updatedAt: new Date('2024-01-10T14:35:00Z'),
        resolvedAt: new Date('2024-01-10T14:35:00Z')
      }
    ];
    this.emergencyHistory.next(mockEmergencies);
  }

  async activateEmergency(type: EmergencyType, isSilent: boolean = false): Promise<Emergency> {
    try {
      // Get current location
      const location = await this.locationService.getCurrentLocation();
      
      // Create emergency object
      const emergency: Emergency = {
        id: Date.now().toString(),
        userId: '1', // Mock user ID
        securityCompanyId: 'default',
        type,
        status: 'active',
        priority: this.getPriorityForType(type),
        location,
        address: 'Current Location', // Would be reverse geocoded in real app
        description: `${type} emergency activated`,
        isActive: true,
        isSilent,
        photos: [],
        videos: [],
        emergencyContacts: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // Set as active emergency
      this.activeEmergency.next(emergency);

      // Add to history
      const currentHistory = this.emergencyHistory.value;
      this.emergencyHistory.next([emergency, ...currentHistory]);

      // Trigger haptic feedback
      await this.triggerHapticFeedback();

      // Send notification
      await this.sendEmergencyNotification(emergency);

      // Log to console for debugging
      console.log('Emergency activated:', emergency);

      return emergency;
    } catch (error) {
      console.error('Error activating emergency:', error);
      throw error;
    }
  }

  async cancelEmergency(emergencyId: string): Promise<void> {
    try {
      const currentEmergency = this.activeEmergency.value;
      if (currentEmergency && currentEmergency.id === emergencyId) {
        // Update emergency status
        const updatedEmergency: Emergency = {
          ...currentEmergency,
          status: 'cancelled' as EmergencyStatus,
          isActive: false,
          updatedAt: new Date(),
          cancelledAt: new Date()
        };

        // Update in history
        const currentHistory = this.emergencyHistory.value;
        const updatedHistory = currentHistory.map(emergency => 
          emergency.id === emergencyId ? updatedEmergency : emergency
        );
        this.emergencyHistory.next(updatedHistory);

        // Clear active emergency
        this.activeEmergency.next(null);

        console.log('Emergency cancelled:', emergencyId);
      }
    } catch (error) {
      console.error('Error cancelling emergency:', error);
      throw error;
    }
  }

  async resolveEmergency(emergencyId: string): Promise<void> {
    try {
      const currentHistory = this.emergencyHistory.value;
      const updatedHistory = currentHistory.map(emergency => {
        if (emergency.id === emergencyId) {
          return {
            ...emergency,
            status: 'resolved' as EmergencyStatus,
            isActive: false,
            updatedAt: new Date(),
            resolvedAt: new Date()
          } as Emergency;
        }
        return emergency;
      });
      this.emergencyHistory.next(updatedHistory);

      // Clear active emergency if it's the one being resolved
      const currentEmergency = this.activeEmergency.value;
      if (currentEmergency && currentEmergency.id === emergencyId) {
        this.activeEmergency.next(null);
      }

      console.log('Emergency resolved:', emergencyId);
    } catch (error) {
      console.error('Error resolving emergency:', error);
      throw error;
    }
  }

  getActiveEmergency(): Emergency | null {
    return this.activeEmergency.value;
  }

  getActiveEmergencyObservable(): Observable<Emergency | null> {
    return this.activeEmergency.asObservable();
  }

  getEmergencyHistory(): Emergency[] {
    return this.emergencyHistory.value;
  }

  getEmergencyHistoryObservable(): Observable<Emergency[]> {
    return this.emergencyHistory.asObservable();
  }

  async getEmergencyById(emergencyId: string): Promise<Emergency | null> {
    const history = this.emergencyHistory.value;
    return history.find(emergency => emergency.id === emergencyId) || null;
  }

  // Emergency numbers (South Africa)
  getEmergencyNumbers() {
    return {
      police: '10111',
      ambulance: '10177',
      emergency: '112',
      poisonControl: '0861 555 777'
    };
  }

  // Call emergency number
  callEmergencyNumber(number: string): void {
    if (this.platform.is('capacitor')) {
      // Use Capacitor CallNumber plugin if available
      console.log('Calling emergency number:', number);
    } else {
      // Web fallback
      window.open(`tel:${number}`, '_self');
    }
  }

  // Private helper methods
  private getPriorityForType(type: EmergencyType): 'low' | 'medium' | 'high' | 'critical' {
    switch (type) {
      case 'panic':
      case 'medical':
        return 'critical';
      case 'fire':
        return 'high';
      case 'silent_alarm':
        return 'high';
      default:
        return 'medium';
    }
  }

  private async triggerHapticFeedback(): Promise<void> {
    if (this.platform.is('capacitor')) {
      try {
        const { Haptics, ImpactStyle } = await import('@capacitor/haptics');
        await Haptics.impact({ style: ImpactStyle.Heavy });
      } catch (error) {
        console.warn('Haptics not available:', error);
      }
    }
  }

  private async sendEmergencyNotification(emergency: Emergency): Promise<void> {
    if (this.platform.is('capacitor')) {
      try {
        const { LocalNotifications } = await import('@capacitor/local-notifications');
        await LocalNotifications.schedule({
          notifications: [
            {
              title: 'Emergency Activated',
              body: `${emergency.type} emergency has been activated`,
              id: 1,
              sound: 'default',
              actionTypeId: 'OPEN_APP'
            }
          ]
        });
      } catch (error) {
        console.warn('Local notifications not available:', error);
      }
    } else {
      // Web fallback
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Emergency Activated', {
          body: `${emergency.type} emergency has been activated`,
          icon: '/assets/icon/favicon.png'
        });
      }
    }
  }

  // Mock device info
  async getDeviceInfo(): Promise<any> {
    if (this.platform.is('capacitor')) {
      try {
        const { Device } = await import('@capacitor/device');
        const info = await Device.getInfo();
        return info;
      } catch (error) {
        console.warn('Device info not available:', error);
        return { name: 'Unknown Device', platform: 'web' };
      }
    } else {
      return {
        name: navigator.userAgent,
        platform: 'web',
        webVersion: navigator.appVersion
      };
    }
  }

  // Socket connection (disabled for frontend testing)
  connectSocket(): void {
    console.log('Socket connection disabled for frontend testing');
  }

  disconnectSocket(): void {
    console.log('Socket disconnection disabled for frontend testing');
  }
}
