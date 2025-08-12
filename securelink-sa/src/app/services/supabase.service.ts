import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User, AuthResponse } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;
  private currentUser = new BehaviorSubject<User | null>(null);

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseAnonKey
    );

    // Listen for auth changes
    this.supabase.auth.onAuthStateChange((event, session) => {
      this.currentUser.next(session?.user || null);
    });
  }

  // Authentication methods
  async signUp(email: string, password: string, userData: any): Promise<AuthResponse> {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    });
    
    if (error) throw error;
    return { data, error: null };
  }

  async signIn(email: string, password: string): Promise<AuthResponse> {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw error;
    return { data, error: null };
  }

  async signOut(): Promise<void> {
    const { error } = await this.supabase.auth.signOut();
    if (error) throw error;
  }

  async resetPassword(email: string): Promise<void> {
    const { error } = await this.supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  }

  // User management
  async getCurrentUser(): Promise<User | null> {
    const { data: { user } } = await this.supabase.auth.getUser();
    return user;
  }

  async updateUserProfile(userId: string, updates: any): Promise<any> {
    const { data, error } = await this.supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async getUserProfile(userId: string): Promise<any> {
    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    return data;
  }

  // Emergency methods
  async createEmergency(emergencyData: any): Promise<any> {
    const { data, error } = await this.supabase
      .from('emergencies')
      .insert(emergencyData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async getEmergencies(userId: string): Promise<any[]> {
    const { data, error } = await this.supabase
      .from('emergencies')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }

  async updateEmergency(emergencyId: string, updates: any): Promise<any> {
    const { data, error } = await this.supabase
      .from('emergencies')
      .update(updates)
      .eq('id', emergencyId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  // Incident methods
  async createIncident(incidentData: any): Promise<any> {
    const { data, error } = await this.supabase
      .from('incidents')
      .insert(incidentData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async getIncidents(userId: string): Promise<any[]> {
    const { data, error } = await this.supabase
      .from('incidents')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }

  async updateIncident(incidentId: string, updates: any): Promise<any> {
    const { data, error } = await this.supabase
      .from('incidents')
      .update(updates)
      .eq('id', incidentId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  // File upload
  async uploadFile(bucket: string, path: string, file: File): Promise<string> {
    const { data, error } = await this.supabase.storage
      .from(bucket)
      .upload(path, file);
    
    if (error) throw error;
    
    const { data: { publicUrl } } = this.supabase.storage
      .from(bucket)
      .getPublicUrl(path);
    
    return publicUrl;
  }

  // Real-time subscriptions
  subscribeToEmergencies(userId: string, callback: (payload: any) => void) {
    return this.supabase
      .channel('emergencies')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'emergencies',
        filter: `user_id=eq.${userId}`
      }, callback)
      .subscribe();
  }

  subscribeToIncidents(userId: string, callback: (payload: any) => void) {
    return this.supabase
      .channel('incidents')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'incidents',
        filter: `user_id=eq.${userId}`
      }, callback)
      .subscribe();
  }

  // Observable for current user
  getCurrentUserObservable(): Observable<User | null> {
    return this.currentUser.asObservable();
  }
}
