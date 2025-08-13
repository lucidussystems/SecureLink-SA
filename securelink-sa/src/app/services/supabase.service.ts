import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

// Mock user data for frontend testing
const MOCK_USERS = [
  {
    id: '1',
    email: 'test@example.com',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+27123456789',
    role: 'customer',
    status: 'active',
    isVerified: true,
    preferredLanguage: 'en',
    biometricEnabled: false,
    notificationSettings: {
      emergencyAlerts: true,
      incidentUpdates: true,
      securityNews: false,
      pushNotifications: true,
      emailNotifications: true,
      smsNotifications: false
    },
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z')
  }
];

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  // Mock authentication state
  private currentUser = new BehaviorSubject<User | null>(null);
  private isInitialized = true;

  constructor() {
    // Check if user is already "logged in" (stored in localStorage)
    const storedUser = localStorage.getItem('mock_user');
    if (storedUser) {
      this.currentUser.next(JSON.parse(storedUser));
    }
  }

  // Mock authentication methods
  async signUp(email: string, password: string, userData: any): Promise<any> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create mock user
    const newUser: User = {
      id: Date.now().toString(),
      email: email,
      firstName: userData.first_name || '',
      lastName: userData.last_name || '',
      phone: userData.phone || '',
      role: 'customer',
      status: 'active',
      isVerified: false,
      preferredLanguage: 'en',
      biometricEnabled: false,
      notificationSettings: {
        emergencyAlerts: true,
        incidentUpdates: true,
        securityNews: false,
        pushNotifications: true,
        emailNotifications: true,
        smsNotifications: false
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Store user in localStorage
    localStorage.setItem('mock_user', JSON.stringify(newUser));
    this.currentUser.next(newUser);

    return { data: { user: newUser }, error: null };
  }

  async signIn(email: string, password: string): Promise<any> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user exists in mock data
    const user = MOCK_USERS.find(u => u.email === email);
    if (user) {
      localStorage.setItem('mock_user', JSON.stringify(user));
      this.currentUser.next(user as User);
      return { data: { user }, error: null };
    } else {
      throw new Error('Invalid credentials');
    }
  }

  async signOut(): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    localStorage.removeItem('mock_user');
    this.currentUser.next(null);
  }

  async getCurrentUser(): Promise<User | null> {
    return this.currentUser.value;
  }

  getCurrentUserObservable(): Observable<User | null> {
    return this.currentUser.asObservable();
  }

  // Mock user profile methods
  async updateUserProfile(userData: any): Promise<any> {
    const currentUser = this.currentUser.value;
    if (!currentUser) throw new Error('No user logged in');

    const updatedUser = { ...currentUser, ...userData };
    localStorage.setItem('mock_user', JSON.stringify(updatedUser));
    this.currentUser.next(updatedUser);

    return { data: updatedUser, error: null };
  }

  // Mock database methods
  async insert(table: string, data: any): Promise<any> {
    console.log(`Mock insert into ${table}:`, data);
    return { data, error: null };
  }

  async select(table: string, query?: any): Promise<any> {
    console.log(`Mock select from ${table}:`, query);
    
    // Return mock data based on table
    if (table === 'emergencies') {
      return {
        data: [
          {
            id: '1',
            type: 'panic',
            status: 'resolved',
            created_at: new Date().toISOString(),
            location: { latitude: -26.2041, longitude: 28.0473 }
          }
        ],
        error: null
      };
    }
    
    if (table === 'incidents') {
      return {
        data: [
          {
            id: '1',
            title: 'Suspicious Activity',
            description: 'Saw someone loitering around the building',
            status: 'open',
            created_at: new Date().toISOString()
          }
        ],
        error: null
      };
    }

    return { data: [], error: null };
  }

  async update(table: string, data: any, query?: any): Promise<any> {
    console.log(`Mock update ${table}:`, data, query);
    return { data, error: null };
  }

  async delete(table: string, query?: any): Promise<any> {
    console.log(`Mock delete from ${table}:`, query);
    return { data: null, error: null };
  }

  // Mock storage methods
  async uploadFile(bucket: string, path: string, file: File): Promise<any> {
    console.log(`Mock upload to ${bucket}/${path}:`, file.name);
    return { data: { path: `${bucket}/${path}` }, error: null };
  }

  async getPublicUrl(bucket: string, path: string): Promise<string> {
    return `https://mock-storage.example.com/${bucket}/${path}`;
  }
}
