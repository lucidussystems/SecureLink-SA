export type EmergencyType = 'panic' | 'silent_alarm' | 'medical' | 'fire' | 'break_in' | 'suspicious_activity' | 'personal_safety' | 'property_damage' | 'other';
export type EmergencyStatus = 'active' | 'dispatched' | 'en_route' | 'arrived' | 'resolved' | 'cancelled' | 'false_alarm';
export type EmergencyPriority = 'low' | 'medium' | 'high' | 'critical';

export interface Location {
  latitude: number;
  longitude: number;
  accuracy?: number;
  altitude?: number;
  heading?: number;
  speed?: number;
}

export interface Emergency {
  id: string;
  userId: string;
  securityCompanyId: string;
  type: EmergencyType;
  status: EmergencyStatus;
  priority: EmergencyPriority;
  location: Location;
  address?: string;
  description?: string;
  isActive: boolean;
  isSilent: boolean;
  assignedPersonnelId?: string;
  estimatedResponseTime?: number;
  actualResponseTime?: number;
  audioRecordingUrl?: string;
  photos: string[];
  videos: string[];
  emergencyContacts: EmergencyContact[];
  metadata?: any;
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
  cancelledAt?: Date;
}

export interface EmergencyUpdate {
  id: string;
  emergencyId: string;
  userId: string;
  status: EmergencyStatus;
  message: string;
  location?: Location;
  estimatedArrival?: number;
  isPublic: boolean;
  createdAt: Date;
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
  isPrimary: boolean;
}
