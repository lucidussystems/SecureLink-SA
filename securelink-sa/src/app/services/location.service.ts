import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { BehaviorSubject, Observable } from 'rxjs';
import { Location } from '../models/emergency.model';
import { environment } from '../../environments/environment';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private currentLocation = new BehaviorSubject<Location | null>(null);
  private isTracking = new BehaviorSubject<boolean>(false);
  private watchId: string | number | null = null;

  constructor(private platform: Platform) {}

  // Get current location once
  async getCurrentLocation(): Promise<Location> {
    try {
      let position: any;

      if (this.platform.is('capacitor')) {
        // Use Capacitor Geolocation on native platforms
        position = await Geolocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 10000
        });
      } else {
        // Use browser Geolocation API on web
        position = await this.getBrowserLocation();
      }

      if (!position) {
        throw new Error('Unable to get location');
      }

      const location: Location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        altitude: position.coords.altitude || undefined,
        heading: position.coords.heading || undefined,
        speed: position.coords.speed || undefined
      };

      this.currentLocation.next(location);
      return location;
    } catch (error) {
      console.error('Error getting location:', error);
      throw error;
    }
  }

  // Browser geolocation fallback
  private getBrowserLocation(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error),
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 30000
        }
      );
    });
  }

  // Start continuous location tracking
  async startLocationTracking(): Promise<void> {
    if (this.isTracking.value) {
      return;
    }

    try {
      if (this.platform.is('capacitor')) {
        // Use Capacitor Geolocation on native platforms
        const permissions = await Geolocation.checkPermissions();
        if (permissions.location !== 'granted') {
          const request = await Geolocation.requestPermissions();
          if (request.location !== 'granted') {
            throw new Error('Location permission denied');
          }
        }

        // Start watching position
        this.watchId = await Geolocation.watchPosition(
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 30000 // 30 seconds
          },
          (position) => {
            if (position) {
              const location: Location = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracy: position.coords.accuracy,
                altitude: position.coords.altitude || undefined,
                heading: position.coords.heading || undefined,
                speed: position.coords.speed || undefined
              };

              this.currentLocation.next(location);
            }
          }
        );
      } else {
        // Use browser Geolocation API on web
        if (!navigator.geolocation) {
          throw new Error('Geolocation is not supported by this browser');
        }

        const webWatchId = navigator.geolocation.watchPosition(
          (position) => {
            const location: Location = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              accuracy: position.coords.accuracy,
              altitude: position.coords.altitude || undefined,
              heading: position.coords.heading || undefined,
              speed: position.coords.speed || undefined
            };

            this.currentLocation.next(location);
          },
          (error) => {
            console.error('Location tracking error:', error);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 30000
          }
        );
        this.watchId = webWatchId;
      }

      this.isTracking.next(true);
    } catch (error) {
      console.error('Error starting location tracking:', error);
      throw error;
    }
  }

  // Stop location tracking
  async stopLocationTracking(): Promise<void> {
    if (this.watchId) {
      if (this.platform.is('capacitor')) {
        await Geolocation.clearWatch({ id: this.watchId as string });
      } else {
        navigator.geolocation.clearWatch(this.watchId as number);
      }
      this.watchId = null;
    }
    this.isTracking.next(false);
  }

  // Get location as observable
  getCurrentLocationObservable(): Observable<Location | null> {
    return this.currentLocation.asObservable();
  }

  // Get tracking status as observable
  getTrackingStatusObservable(): Observable<boolean> {
    return this.isTracking.asObservable();
  }

  // Calculate distance between two points (Haversine formula)
  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c; // Distance in kilometers
    return distance;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI/180);
  }

  // Get address from coordinates (reverse geocoding)
  async getAddressFromCoordinates(latitude: number, longitude: number): Promise<string> {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${environment.googleMapsApiKey}`
      );
      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        return data.results[0].formatted_address;
      }
      
      return 'Unknown location';
    } catch (error) {
      console.error('Error getting address:', error);
      return 'Unknown location';
    }
  }

  // Check if location is within emergency response area
  isWithinEmergencyArea(userLocation: Location, emergencyLocation: Location, radiusKm: number = 50): boolean {
    const distance = this.calculateDistance(
      userLocation.latitude,
      userLocation.longitude,
      emergencyLocation.latitude,
      emergencyLocation.longitude
    );
    return distance <= radiusKm;
  }

  // Get current location value
  getCurrentLocationValue(): Location | null {
    return this.currentLocation.value;
  }

  // Check if tracking is active
  isTrackingActive(): boolean {
    return this.isTracking.value;
  }
}
