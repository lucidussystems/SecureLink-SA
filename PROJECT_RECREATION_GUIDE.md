# SecureLink SA - Complete Project Recreation Guide

This comprehensive guide contains everything needed to recreate the SecureLink SA project from scratch, including all requirements, credentials, architecture, and implementation details.

## 📋 Project Overview

**SecureLink SA** is a comprehensive mobile security platform specifically designed for South African users. It provides emergency response services, incident reporting, real-time communication, and localized features including load shedding integration and multi-language support.

### Core Features
- Emergency Response System with GPS tracking
- Incident Reporting with photo/video upload
- Real-time Communication via WebSockets
- Background GPS tracking
- Multi-language support (English, Afrikaans, isiZulu)
- Load Shedding integration
- Local emergency services directory
- Offline capability
- End-to-end encryption

## 🏗️ Architecture Overview

### Technology Stack
- **Frontend**: React Native with Expo
- **Backend**: Node.js/Express with TypeScript
- **Database**: PostgreSQL via Supabase
- **Authentication**: Supabase Auth with JWT
- **Real-time**: Socket.IO
- **Storage**: Supabase Storage
- **Push Notifications**: Expo Notifications
- **Maps**: Google Maps API
- **Localization**: i18next

### Project Structure
```
SecureLink SA/
├── mobile-app/           # React Native Expo app
├── backend/              # Node.js/Express backend
├── shared/               # Shared TypeScript types
├── docs/                 # Documentation
└── supabase/            # Supabase configuration
```

## 🔧 Prerequisites & Requirements

### System Requirements
- **Node.js**: v18.0.0 or later
- **npm**: v8.0.0 or later
- **Git**: Latest version
- **PostgreSQL**: v13 or later
- **Redis**: v6 or later (optional but recommended)

### Development Tools
- **React Native CLI**: `npm install -g @react-native-community/cli`
- **Expo CLI**: `npm install -g @expo/cli`
- **TypeScript**: `npm install -g typescript`

### Mobile Development
- **iOS**: Xcode 12.0+ (macOS only)
- **Android**: Android Studio with SDK API 28+

## 📦 Dependencies

### Mobile App Dependencies (`mobile-app/package.json`)
```json
{
  "dependencies": {
    "@react-native-async-storage/async-storage": "1.23.1",
    "@react-navigation/bottom-tabs": "^6.5.7",
    "@react-navigation/native": "^6.1.6",
    "@react-navigation/native-stack": "^6.9.12",
    "@supabase/supabase-js": "^2.51.0",
    "expo": "~51.0.31",
    "expo-av": "~14.0.7",
    "expo-battery": "~8.0.1",
    "expo-camera": "~15.0.16",
    "expo-contacts": "~13.0.5",
    "expo-device": "~6.0.2",
    "expo-file-system": "~17.0.1",
    "expo-haptics": "~13.0.1",
    "expo-image-picker": "~15.1.0",
    "expo-local-authentication": "~14.0.1",
    "expo-localization": "~15.0.3",
    "expo-location": "~17.0.1",
    "expo-notifications": "~0.28.19",
    "expo-secure-store": "~13.0.2",
    "expo-task-manager": "~11.8.2",
    "i18next": "^25.3.2",
    "react": "18.2.0",
    "react-i18next": "^15.6.0",
    "react-native": "0.74.5",
    "react-native-gesture-handler": "~2.16.1",
    "react-native-maps": "1.14.0",
    "react-native-reanimated": "~3.10.1",
    "react-native-safe-area-context": "4.10.5",
    "react-native-screens": "3.31.1",
    "react-native-svg": "15.2.0",
    "socket.io-client": "^4.8.1"
  }
}
```

### Backend Dependencies (`backend/package.json`)
```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.45.7",
    "bcryptjs": "^2.4.3",
    "compression": "^1.7.4",
    "cors": "^2.8.5",
    "dotenv": "^16.4.7",
    "express": "^4.21.2",
    "express-rate-limit": "^7.4.1",
    "express-validator": "^7.2.0",
    "helmet": "^8.0.0",
    "jsonwebtoken": "^9.0.2",
    "morgan": "^1.10.0",
    "multer": "^1.4.5-lts.1",
    "socket.io": "^4.8.1",
    "zod": "^3.22.4"
  }
}
```

### Shared Dependencies (`shared/package.json`)
```json
{
  "dependencies": {
    "zod": "^3.22.4"
  }
}
```

## 🔐 Environment Variables & Credentials

### Root Environment (`.env`)
```env
# Project Configuration
NODE_ENV=development
PROJECT_NAME=SecureLink SA
VERSION=1.0.0

# Database
DATABASE_URL=postgresql://username:password@localhost:5432/securelink_sa

# Redis (for sessions and caching)
REDIS_URL=redis://localhost:6379

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### Mobile App Environment (`mobile-app/.env`)
```env
# API Configuration
API_BASE_URL=http://localhost:3000
WEBSOCKET_URL=ws://localhost:3001

# Supabase
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Google Maps
GOOGLE_MAPS_API_KEY=your-google-maps-api-key

# Expo
EXPO_PROJECT_ID=your-expo-project-id
EXPO_NOTIFICATIONS_API_KEY=your-expo-notifications-key

# South African API Keys
ESKOM_API_KEY=your-eskom-api-key
CITY_POWER_API_KEY=your-city-power-api-key

# Feature Flags
ENABLE_LOAD_SHEDDING=true
ENABLE_MULTI_LANGUAGE=true
ENABLE_OFFLINE_MODE=true
ENABLE_BACKGROUND_TRACKING=true
```

### Backend Environment (`backend/.env`)
```env
# Server Configuration
PORT=3000
HOST=localhost
NODE_ENV=development

# Database
DATABASE_URL=postgresql://username:password@localhost:5432/securelink_sa

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-refresh-secret
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Socket.IO
SOCKET_IO_PORT=3001
SOCKET_IO_CORS_ORIGIN=http://localhost:3000

# Email
EMAIL_FROM=noreply@securelink-sa.com
EMAIL_FROM_NAME=SecureLink SA

# File Upload
MAX_FILE_SIZE=10485760  # 10MB
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif,video/mp4,video/mov

# External APIs
GOOGLE_MAPS_API_KEY=your-google-maps-api-key
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=your-twilio-phone-number

# South African APIs
ESKOM_API_KEY=your-eskom-api-key
CITY_POWER_API_KEY=your-city-power-api-key
SAPS_API_KEY=your-saps-api-key

# Monitoring
SENTRY_DSN=your-sentry-dsn
LOG_LEVEL=debug
```

## 🗄️ Database Schema

### Core Tables

#### Users Table
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role user_role DEFAULT 'customer',
    status user_status DEFAULT 'pending_verification',
    profile_picture TEXT,
    preferred_language preferred_language DEFAULT 'en',
    security_company_id UUID REFERENCES security_companies(id),
    is_verified BOOLEAN DEFAULT false,
    biometric_enabled BOOLEAN DEFAULT false,
    notification_settings JSONB DEFAULT '{
        "emergencyAlerts": true,
        "incidentUpdates": true,
        "securityNews": true,
        "pushNotifications": true,
        "emailNotifications": true,
        "smsNotifications": true
    }',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login_at TIMESTAMP WITH TIME ZONE
);
```

#### Emergencies Table
```sql
CREATE TABLE emergencies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    security_company_id UUID NOT NULL REFERENCES security_companies(id),
    type emergency_type NOT NULL,
    status emergency_status DEFAULT 'active',
    priority emergency_priority DEFAULT 'high',
    location JSONB NOT NULL,
    address TEXT,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    is_silent BOOLEAN DEFAULT false,
    assigned_personnel_id UUID REFERENCES users(id),
    estimated_response_time INTEGER,
    actual_response_time INTEGER,
    audio_recording_url TEXT,
    photos TEXT[] DEFAULT '{}',
    videos TEXT[] DEFAULT '{}',
    emergency_contacts JSONB DEFAULT '[]',
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    resolved_at TIMESTAMP WITH TIME ZONE,
    cancelled_at TIMESTAMP WITH TIME ZONE
);
```

#### Incidents Table
```sql
CREATE TABLE incidents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    security_company_id UUID NOT NULL REFERENCES security_companies(id),
    type incident_type NOT NULL,
    status incident_status DEFAULT 'reported',
    severity incident_severity DEFAULT 'medium',
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    location JSONB NOT NULL,
    address TEXT,
    photos TEXT[] DEFAULT '{}',
    videos TEXT[] DEFAULT '{}',
    evidence JSONB DEFAULT '[]',
    assigned_personnel_id UUID REFERENCES users(id),
    tags TEXT[] DEFAULT '{}',
    is_public BOOLEAN DEFAULT false,
    follow_up_required BOOLEAN DEFAULT false,
    estimated_resolution TIMESTAMP WITH TIME ZONE,
    actual_resolution TIMESTAMP WITH TIME ZONE,
    customer_satisfaction INTEGER CHECK (customer_satisfaction >= 1 AND customer_satisfaction <= 5),
    feedback TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    resolved_at TIMESTAMP WITH TIME ZONE,
    closed_at TIMESTAMP WITH TIME ZONE
);
```

### Custom Types/Enums
```sql
CREATE TYPE user_role AS ENUM ('customer', 'security_personnel', 'admin', 'security_company_admin');
CREATE TYPE user_status AS ENUM ('active', 'inactive', 'suspended', 'pending_verification');
CREATE TYPE emergency_type AS ENUM ('panic', 'silent_alarm', 'medical', 'fire', 'break_in', 'suspicious_activity', 'personal_safety', 'property_damage', 'other');
CREATE TYPE emergency_status AS ENUM ('active', 'dispatched', 'en_route', 'arrived', 'resolved', 'cancelled', 'false_alarm');
CREATE TYPE emergency_priority AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE incident_type AS ENUM ('burglary', 'vandalism', 'suspicious_activity', 'noise_complaint', 'trespassing', 'vehicle_break_in', 'property_damage', 'power_outage', 'water_leak', 'medical_incident', 'fire_incident', 'animal_incident', 'neighborhood_watch', 'other');
CREATE TYPE incident_status AS ENUM ('reported', 'acknowledged', 'investigating', 'in_progress', 'resolved', 'closed', 'cancelled');
CREATE TYPE incident_severity AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE preferred_language AS ENUM ('en', 'af', 'zu', 'xh');
```

## 🔐 Row Level Security (RLS) Policies

### Enable RLS on all tables
```sql
ALTER TABLE security_companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE emergencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE emergency_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE incident_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE file_uploads ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
```

### Example RLS Policies
```sql
-- Users can view their own emergencies
CREATE POLICY "Users can view emergencies based on role" ON emergencies
    FOR SELECT
    USING (
        user_id = auth.uid() OR
        get_current_user_role() = 'admin' OR
        (is_security_personnel() AND security_company_id = get_current_user_security_company()) OR
        assigned_personnel_id = auth.uid()
    );

-- Users can create emergencies
CREATE POLICY "Users can create emergencies" ON emergencies
    FOR INSERT
    WITH CHECK (
        user_id = auth.uid() OR
        (is_security_personnel() AND security_company_id = get_current_user_security_company())
    );
```

## 📱 Mobile App Configuration

### Expo Configuration (`mobile-app/app.json`)
```json
{
  "expo": {
    "name": "SecureLink SA",
    "slug": "securelink-sa",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": ["**/*"],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.securelink.sa",
      "infoPlist": {
        "NSLocationWhenInUseUsageDescription": "This app needs location access for emergency services.",
        "NSLocationAlwaysAndWhenInUseUsageDescription": "This app needs location access for emergency services.",
        "NSCameraUsageDescription": "This app needs camera access to capture incident evidence.",
        "NSMicrophoneUsageDescription": "This app needs microphone access for emergency recordings.",
        "NSPhotoLibraryUsageDescription": "This app needs photo library access to select incident images."
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      },
      "package": "com.securelink.sa",
      "permissions": [
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION",
        "CAMERA",
        "RECORD_AUDIO",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE",
        "VIBRATE",
        "RECEIVE_BOOT_COMPLETED",
        "WAKE_LOCK"
      ]
    },
    "plugins": [
      "expo-location",
      "expo-camera",
      "expo-av",
      "expo-notifications",
      "expo-task-manager",
      "expo-background-fetch"
    ]
  }
}
```

## 🔧 Backend Configuration

### Express Server Setup
```typescript
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

const app = express();

// Security middleware
app.use(helmet());
app.use(compression());

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(morgan('combined'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/emergencies', emergencyRoutes);
app.use('/api/incidents', incidentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/notifications', notificationRoutes);
```

### Socket.IO Setup
```typescript
import { Server } from 'socket.io';
import { createServer } from 'http';

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.SOCKET_IO_CORS_ORIGIN || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
  });
  
  socket.on('emergency-activated', (data) => {
    socket.to(data.securityCompanyId).emit('emergency-alert', data);
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});
```

## 🌍 Localization

### Supported Languages
- **English** (en) - Primary language
- **Afrikaans** (af) - South African Afrikaans
- **isiZulu** (zu) - South African Zulu

### Translation Files Structure
```
mobile-app/src/locales/
├── en.json
├── af.json
└── zu.json
```

### Example Translation File (`en.json`)
```json
{
  "common": {
    "emergency": "Emergency",
    "incident": "Incident",
    "settings": "Settings",
    "profile": "Profile",
    "cancel": "Cancel",
    "save": "Save",
    "delete": "Delete",
    "edit": "Edit"
  },
  "emergency": {
    "panicButton": "Panic Button",
    "silentAlarm": "Silent Alarm",
    "activateEmergency": "Activate Emergency",
    "emergencyActivated": "Emergency Activated",
    "helpOnTheWay": "Help is on the way",
    "estimatedResponseTime": "Estimated response time: {{time}} minutes"
  },
  "incidents": {
    "reportIncident": "Report Incident",
    "incidentType": "Incident Type",
    "description": "Description",
    "location": "Location",
    "addPhotos": "Add Photos",
    "submitReport": "Submit Report"
  }
}
```

## 🔌 API Endpoints

### Authentication Endpoints
```typescript
// POST /api/auth/register
interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  preferredLanguage?: 'en' | 'af' | 'zu';
}

// POST /api/auth/login
interface LoginRequest {
  email: string;
  password: string;
}

// POST /api/auth/refresh
interface RefreshRequest {
  refreshToken: string;
}
```

### Emergency Endpoints
```typescript
// POST /api/emergencies
interface CreateEmergencyRequest {
  type: EmergencyType;
  location: Location;
  description?: string;
  isSilent?: boolean;
  emergencyContacts?: EmergencyContact[];
}

// GET /api/emergencies
// GET /api/emergencies/:id
// PUT /api/emergencies/:id
// DELETE /api/emergencies/:id
```

### Incident Endpoints
```typescript
// POST /api/incidents
interface CreateIncidentRequest {
  type: IncidentType;
  title: string;
  description: string;
  location: Location;
  severity: IncidentSeverity;
  photos?: string[];
  videos?: string[];
}

// GET /api/incidents
// GET /api/incidents/:id
// PUT /api/incidents/:id
// DELETE /api/incidents/:id
```

## 🚀 Setup Instructions

### 1. Clone and Install
```bash
git clone https://github.com/yourusername/securelink-sa.git
cd securelink-sa

# Install dependencies
npm install
cd mobile-app && npm install && cd ..
cd backend && npm install && cd ..
cd shared && npm install && cd ..
```

### 2. Database Setup
```bash
# Install PostgreSQL
brew install postgresql  # macOS
sudo apt-get install postgresql postgresql-contrib  # Ubuntu

# Create database
createdb securelink_sa

# Run migrations
cd backend
npx supabase db push
```

### 3. Environment Configuration
```bash
# Copy environment files
cp .env.example .env
cp mobile-app/.env.example mobile-app/.env
cp backend/.env.example backend/.env

# Edit with your actual values
nano .env
nano mobile-app/.env
nano backend/.env
```

### 4. Supabase Setup
1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Get project URL and API keys
4. Update environment variables
5. Run database migrations

### 5. Start Development
```bash
# Start backend
cd backend
npm run dev

# Start mobile app (in new terminal)
cd mobile-app
npx expo start
```

## 🔑 Required API Keys

### Google Maps API
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project or select existing
3. Enable Maps SDK for iOS and Android
4. Create API key
5. Add to environment variables

### Supabase
1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Get project URL and anon/service keys
4. Add to environment variables

### Expo
1. Create account at [expo.dev](https://expo.dev)
2. Create new project
3. Get project ID and notifications key
4. Add to environment variables

### South African APIs
- **Eskom API**: [sepush.co.za](https://sepush.co.za) for load shedding data
- **City Power API**: For municipal power updates
- **SAPS API**: For police integration (if available)

## 📊 Testing

### Backend Testing
```bash
cd backend
npm test
npm run test:coverage
```

### Mobile App Testing
```bash
cd mobile-app
npm test
```

### E2E Testing
```bash
npm run test:e2e
```

## 🚀 Deployment

### Mobile App Deployment
```bash
# Build for production
cd mobile-app
npx expo build:ios
npx expo build:android

# Or use EAS Build
npm install -g @expo/eas-cli
eas build --platform all
```

### Backend Deployment
```bash
cd backend
npm run build
npm start
```

## 🔒 Security Considerations

### Authentication
- JWT tokens with short expiration (15 minutes)
- Refresh tokens with longer expiration (7 days)
- Secure token storage using Expo SecureStore
- Biometric authentication support

### Data Protection
- End-to-end encryption for sensitive data
- Row Level Security (RLS) in database
- Input validation using Zod schemas
- Rate limiting on API endpoints

### Privacy
- GDPR and POPI Act compliance
- Minimal data collection
- User consent for location tracking
- Secure data deletion

## 📈 Performance Optimization

### Mobile App
- Lazy loading of components
- Image optimization and caching
- Background task optimization
- Offline capability with sync

### Backend
- Database query optimization
- Redis caching for frequently accessed data
- CDN for static assets
- Load balancing for high availability

## 🐛 Common Issues & Solutions

### Node.js Version Issues
```bash
# Use nvm to manage versions
nvm install 18
nvm use 18
nvm alias default 18
```

### iOS Build Issues
```bash
# Clear derived data
rm -rf ~/Library/Developer/Xcode/DerivedData

# Reinstall pods
cd mobile-app/ios
pod deintegrate
pod install
```

### Android Build Issues
```bash
# Clear build cache
cd mobile-app/android
./gradlew clean

# Reset Metro cache
npx react-native start --reset-cache
```

### Database Connection Issues
```bash
# Check PostgreSQL status
brew services list | grep postgresql

# Restart PostgreSQL
brew services restart postgresql
```

## 📞 Support & Resources

### Documentation
- [Setup Guide](docs/SETUP_GUIDE.md)
- [API Documentation](docs/API_DOCUMENTATION.md)
- [Developer Guide](docs/DEVELOPER_GUIDE.md)
- [User Manual](docs/USER_MANUAL.md)

### Emergency Numbers (South Africa)
- **Police**: 10111
- **Ambulance/Fire**: 10177
- **Emergency Services**: 112
- **Poison Control**: 0861 555 777

### Contact Information
- **Technical Support**: support@securelink-sa.com
- **Emergency Support**: Use in-app emergency features
- **GitHub Issues**: [Project Issues](https://github.com/yourusername/securelink-sa/issues)

---

This guide contains all the essential information needed to recreate the SecureLink SA project. Follow the setup instructions carefully and ensure all environment variables and API keys are properly configured before running the application.
