export type IncidentType = 'burglary' | 'vandalism' | 'suspicious_activity' | 'noise_complaint' | 'trespassing' | 'vehicle_break_in' | 'property_damage' | 'power_outage' | 'water_leak' | 'medical_incident' | 'fire_incident' | 'animal_incident' | 'neighborhood_watch' | 'other';
export type IncidentStatus = 'reported' | 'acknowledged' | 'investigating' | 'in_progress' | 'resolved' | 'closed' | 'cancelled';
export type IncidentSeverity = 'low' | 'medium' | 'high' | 'critical';

export interface Incident {
  id: string;
  userId: string;
  securityCompanyId: string;
  type: IncidentType;
  status: IncidentStatus;
  severity: IncidentSeverity;
  title: string;
  description: string;
  location: Location;
  address?: string;
  photos: string[];
  videos: string[];
  evidence: any[];
  assignedPersonnelId?: string;
  tags: string[];
  isPublic: boolean;
  followUpRequired: boolean;
  estimatedResolution?: Date;
  actualResolution?: Date;
  customerSatisfaction?: number;
  feedback?: string;
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
  closedAt?: Date;
}

export interface IncidentUpdate {
  id: string;
  incidentId: string;
  userId: string;
  status: IncidentStatus;
  message: string;
  isPublic: boolean;
  createdAt: Date;
}

export interface Location {
  latitude: number;
  longitude: number;
  accuracy?: number;
  altitude?: number;
  heading?: number;
  speed?: number;
}
