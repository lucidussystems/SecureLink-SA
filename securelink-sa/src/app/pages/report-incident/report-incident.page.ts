import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
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
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonIcon,
  IonCheckbox,
  IonText,
  IonButtons,
  IonBackButton,
  ToastController,
  LoadingController
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { 
  location, 
  camera, 
  videocam, 
  close, 
  send 
} from 'ionicons/icons';

import { NavigationService } from '../../services/navigation.service';
import { SupabaseService } from '../../services/supabase.service';
import { LocationService } from '../../services/location.service';
import { LoadingService } from '../../services/loading.service';
import { ToastService } from '../../services/toast.service';
import { Incident, Location as IncidentLocation } from '../../models/incident.model';

@Component({
  selector: 'app-report-incident',
  templateUrl: './report-incident.page.html',
  styleUrls: ['./report-incident.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonIcon,
    IonCheckbox,
    IonText,
    IonButtons,
    IonBackButton
  ]
})
export class ReportIncidentPage implements OnInit {
  incidentForm: FormGroup;
  currentLocation: IncidentLocation | null = null;
  photos: string[] = [];
  videos: string[] = [];
  isGettingLocation = false;
  isRecording = false;
  isSubmitting = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private navigationService: NavigationService,
    private supabaseService: SupabaseService,
    private locationService: LocationService,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {
    addIcons({ location, camera, videocam, close, send });
    this.incidentForm = this.formBuilder.group({
      type: ['', Validators.required],
      severity: ['', Validators.required],
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      address: [''],
      tags: [''],
      isPublic: [false],
      followUpRequired: [false]
    });
  }

  ngOnInit() {
    console.log('Report Incident page loaded successfully!');
  }

  async getCurrentLocation() {
    this.isGettingLocation = true;
    try {
      const location = await this.locationService.getCurrentLocation();
      this.currentLocation = location;
      await this.toastService.showSuccess('Location captured successfully');
    } catch (error) {
      console.error('Error getting location:', error);
      await this.toastService.showError('Failed to get location. Please try again.');
    } finally {
      this.isGettingLocation = false;
    }
  }

  async takePhoto() {
    try {
      // Mock photo capture - in real app, this would use Camera API
      const mockPhotoUrl = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=';
      this.photos.push(mockPhotoUrl);
      await this.toastService.showSuccess('Photo captured successfully');
    } catch (error) {
      console.error('Error taking photo:', error);
      await this.toastService.showError('Failed to take photo');
    }
  }

  async recordVideo() {
    if (this.isRecording) {
      this.isRecording = false;
      await this.toastService.showSuccess('Video recording stopped');
    } else {
      this.isRecording = true;
      // Mock video recording - in real app, this would use Camera API
      setTimeout(async () => {
        this.isRecording = false;
        const mockVideoUrl = 'data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAA';
        this.videos.push(mockVideoUrl);
        await this.toastService.showSuccess('Video recorded successfully');
      }, 3000);
    }
  }

  removePhoto(index: number) {
    this.photos.splice(index, 1);
  }

  removeVideo(index: number) {
    this.videos.splice(index, 1);
  }

  async submitIncident() {
    if (this.incidentForm.invalid) {
      await this.toastService.showError('Please fill in all required fields');
      return;
    }

    if (!this.currentLocation) {
      await this.toastService.showError('Please capture your location first');
      return;
    }

    this.isSubmitting = true;
    const loading = await this.loadingController.create({
      message: 'Submitting incident report...'
    });
    await loading.present();

    try {
      const formValue = this.incidentForm.value;
      const currentUser = await this.supabaseService.getCurrentUser();
      
      if (!currentUser) {
        throw new Error('User not authenticated');
      }

      const incident: Partial<Incident> = {
        userId: currentUser.id,
        securityCompanyId: currentUser.securityCompanyId || '',
        type: formValue.type,
        status: 'reported',
        severity: formValue.severity,
        title: formValue.title,
        description: formValue.description,
        location: this.currentLocation,
        address: formValue.address,
        photos: this.photos,
        videos: this.videos,
        evidence: [],
        tags: formValue.tags ? formValue.tags.split(',').map((tag: string) => tag.trim()) : [],
        isPublic: formValue.isPublic,
        followUpRequired: formValue.followUpRequired,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const result = await this.supabaseService.insert('incidents', incident);
      
      if (result.error) {
        throw new Error(result.error);
      }

      await this.toastService.showSuccess('Incident reported successfully');
      this.router.navigate(['/incidents']);
    } catch (error) {
      console.error('Error submitting incident:', error);
      await this.toastService.showError('Failed to submit incident. Please try again.');
    } finally {
      this.isSubmitting = false;
      await loading.dismiss();
    }
  }

  goBack(): void {
    this.navigationService.goBack();
  }
}
