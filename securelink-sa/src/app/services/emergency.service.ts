import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SupabaseService } from './supabase.service';
import { LocationService } from './location.service';
import { Emergency, EmergencyType, EmergencyStatus } from '../models/emergency.model';
import { environment } from '../../environments/environment';
import { io, Socket } from 'socket.io-client';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { LocalNotifications } from '@capacitor/local-notifications';

@Injectable({
  providedIn: 'root'
})
export class EmergencyService {
  private socket: Socket | null = null;
  private activeEmergency = new BehaviorSubject<Emergency | null>(null);
  private emergencyUpdates = new BehaviorSubject<any[]>([]);

  constructor(
    private supabaseService: SupabaseService,
    private locationService: LocationService
  ) {
    this.initializeSocket();
  }

  private initializeSocket(): void {
    this.socket = io(environment.websocketUrl, {
      transports: ['websocket'],
      autoConnect: false
    });

    this.socket.on('connect', () => {
      console.log('Connected to emergency socket');
    });

    this.socket.on('emergency-alert', (data) => {
      this.handleEmergencyAlert(data);
    });

    this.socket.on('emergency-update', (data) => {
      this.handleEmergencyUpdate(data);
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from emergency socket');
    });
  }

  // Activate emergency
  async activateEmergency(type: EmergencyType, isSilent: boolean = false): Promise<Emergency> {
    try {
      // Get current location
      const location = await this.locationService.getCurrentLocation();
      
      // Get current user
      const user = await this.supabaseService.getCurrentUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Create emergency data
      const emergencyData = {
        user_id: user.id,
        security_company_id: 'default', // This should come from user profile
        type,
        status: 'active' as EmergencyStatus,
        priority: 'high' as any,
        location: {
          latitude: location.latitude,
          longitude: location.longitude,
          accuracy: location.accuracy
        },
        is_active: true,
        is_silent: isSilent,
        description: `Emergency activated: ${type}`,
        emergency_contacts: [],
        metadata: {
          activated_at: new Date().toISOString(),
          device_info: await this.getDeviceInfo()
        }
      };

      // Create emergency in database
      const emergency = await this.supabaseService.createEmergency(emergencyData);
      
      // Set as active emergency
      this.activeEmergency.next(emergency);

      // Trigger haptic feedback
      await this.triggerHapticFeedback();

      // Send emergency alert via socket
      if (this.socket && this.socket.connected) {
        this.socket.emit('emergency-activated', {
          emergencyId: emergency.id,
          userId: user.id,
          securityCompanyId: emergency.security_company_id,
          type,
          location,
          isSilent
        });
      }

      // Show notification
      await this.showEmergencyNotification(emergency);

      return emergency;
    } catch (error) {
      console.error('Error activating emergency:', error);
      throw error;
    }
  }

  // Cancel emergency
  async cancelEmergency(emergencyId: string): Promise<void> {
    try {
      const updates = {
        status: 'cancelled' as EmergencyStatus,
        is_active: false,
        cancelled_at: new Date().toISOString()
      };

      await this.supabaseService.updateEmergency(emergencyId, updates);
      
      // Clear active emergency
      this.activeEmergency.next(null);

      // Send cancellation via socket
      if (this.socket && this.socket.connected) {
        this.socket.emit('emergency-cancelled', { emergencyId });
      }
    } catch (error) {
      console.error('Error cancelling emergency:', error);
      throw error;
    }
  }

  // Get user's emergencies
  async getUserEmergencies(): Promise<Emergency[]> {
    try {
      const user = await this.supabaseService.getCurrentUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      return await this.supabaseService.getEmergencies(user.id);
    } catch (error) {
      console.error('Error getting user emergencies:', error);
      throw error;
    }
  }

  // Update emergency status
  async updateEmergencyStatus(emergencyId: string, status: EmergencyStatus, message?: string): Promise<void> {
    try {
      const updates: any = {
        status,
        updated_at: new Date().toISOString()
      };

      if (status === 'resolved') {
        updates.resolved_at = new Date().toISOString();
        updates.is_active = false;
      }

      await this.supabaseService.updateEmergency(emergencyId, updates);

      // Send update via socket
      if (this.socket && this.socket.connected) {
        this.socket.emit('emergency-status-update', {
          emergencyId,
          status,
          message,
          timestamp: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Error updating emergency status:', error);
      throw error;
    }
  }

  // Join emergency room for real-time updates
  joinEmergencyRoom(emergencyId: string): void {
    if (this.socket && this.socket.connected) {
      this.socket.emit('join-room', emergencyId);
    }
  }

  // Leave emergency room
  leaveEmergencyRoom(emergencyId: string): void {
    if (this.socket && this.socket.connected) {
      this.socket.emit('leave-room', emergencyId);
    }
  }

  // Connect to socket
  connectSocket(): void {
    if (this.socket && !this.socket.connected) {
      this.socket.connect();
    }
  }

  // Disconnect from socket
  disconnectSocket(): void {
    if (this.socket && this.socket.connected) {
      this.socket.disconnect();
    }
  }

  // Handle emergency alert
  private handleEmergencyAlert(data: any): void {
    console.log('Emergency alert received:', data);
    // Handle incoming emergency alerts (for security personnel)
  }

  // Handle emergency update
  private handleEmergencyUpdate(data: any): void {
    console.log('Emergency update received:', data);
    const currentUpdates = this.emergencyUpdates.value;
    this.emergencyUpdates.next([...currentUpdates, data]);
  }

  // Trigger haptic feedback
  private async triggerHapticFeedback(): Promise<void> {
    try {
      await Haptics.impact({ style: ImpactStyle.Heavy });
    } catch (error) {
      console.error('Error triggering haptic feedback:', error);
    }
  }

  // Show emergency notification
  private async showEmergencyNotification(emergency: Emergency): Promise<void> {
    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            id: 1,
            title: 'Emergency Activated',
            body: `Emergency type: ${emergency.type}. Help is on the way.`,
            sound: 'default',
            schedule: { at: new Date() }
          }
        ]
      });
    } catch (error) {
      console.error('Error showing notification:', error);
    }
  }

  // Get device information
  private async getDeviceInfo(): Promise<any> {
    try {
      const { Device } = await import('@capacitor/device');
      const info = await Device.getInfo();
      return info;
    } catch (error) {
      console.error('Error getting device info:', error);
      return {};
    }
  }

  // Get active emergency observable
  getActiveEmergencyObservable(): Observable<Emergency | null> {
    return this.activeEmergency.asObservable();
  }

  // Get emergency updates observable
  getEmergencyUpdatesObservable(): Observable<any[]> {
    return this.emergencyUpdates.asObservable();
  }

  // Get active emergency value
  getActiveEmergencyValue(): Emergency | null {
    return this.activeEmergency.value;
  }

  // Check if emergency is active
  isEmergencyActive(): boolean {
    return this.activeEmergency.value !== null;
  }

  // Call emergency number
  async callEmergencyNumber(number: string): Promise<void> {
    try {
      // This would integrate with the device's phone functionality
      // For web, we can use the tel: protocol
      window.open(`tel:${number}`, '_self');
    } catch (error) {
      console.error('Error calling emergency number:', error);
    }
  }

  // Get emergency numbers
  getEmergencyNumbers(): any {
    return environment.emergencyNumbers;
  }
}
