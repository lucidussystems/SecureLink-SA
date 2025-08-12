export type UserRole = 'customer' | 'security_personnel' | 'admin' | 'security_company_admin';
export type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending_verification';
export type PreferredLanguage = 'en' | 'af' | 'zu' | 'xh';

export interface NotificationSettings {
  emergencyAlerts: boolean;
  incidentUpdates: boolean;
  securityNews: boolean;
  pushNotifications: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
}

export interface User {
  id: string;
  email: string;
  phone?: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  status: UserStatus;
  profilePicture?: string;
  preferredLanguage: PreferredLanguage;
  securityCompanyId?: string;
  isVerified: boolean;
  biometricEnabled: boolean;
  notificationSettings: NotificationSettings;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
}

export interface UserProfile {
  id: string;
  userId: string;
  dateOfBirth?: Date;
  address?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  emergencyContacts: EmergencyContact[];
  medicalInfo?: string;
  allergies?: string[];
  medications?: string[];
  bloodType?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
  isPrimary: boolean;
}
