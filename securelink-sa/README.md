# SecureLink SA - Ionic/Angular Mobile App

A comprehensive mobile security platform specifically designed for South African users, built with Ionic and Angular.

## 🚀 Features

### Core Functionality
- **Emergency Response System** with GPS tracking
- **Incident Reporting** with photo/video upload
- **Real-time Communication** via WebSockets
- **Background GPS tracking**
- **Multi-language support** (English, Afrikaans, isiZulu)
- **Load Shedding integration**
- **Local emergency services directory**
- **Offline capability**
- **End-to-end encryption**

### Emergency Features
- Panic button for immediate emergency activation
- Silent alarm for discreet emergency signaling
- Medical emergency support
- Fire emergency support
- Real-time location tracking
- Emergency contact management

### Security Features
- User authentication via Supabase
- Biometric authentication support
- Secure data storage
- Row Level Security (RLS)
- End-to-end encryption

## 🏗️ Architecture

### Technology Stack
- **Frontend**: Ionic 7 + Angular 17
- **Backend**: Node.js/Express with TypeScript (planned)
- **Database**: PostgreSQL via Supabase
- **Authentication**: Supabase Auth with JWT
- **Real-time**: Socket.IO
- **Storage**: Supabase Storage
- **Push Notifications**: Capacitor Local Notifications
- **Maps**: Google Maps API
- **Localization**: i18next (planned)

### Project Structure
```
securelink-sa/
├── src/
│   ├── app/
│   │   ├── models/           # TypeScript interfaces
│   │   ├── pages/            # Ionic pages
│   │   ├── services/         # Business logic services
│   │   └── environments/     # Environment configuration
│   ├── assets/               # Static assets
│   └── theme/                # Ionic theme customization
├── www/                      # Built application
└── capacitor.config.ts       # Capacitor configuration
```

## 📱 Pages

### Implemented Pages
- **Home Page**: Main dashboard with emergency buttons
- **Login Page**: User authentication
- **Register Page**: User registration (placeholder)
- **Incidents Page**: Incident management (placeholder)
- **Profile Page**: User profile management (placeholder)
- **Settings Page**: App settings (placeholder)

### Emergency Features
- Large, prominent panic button
- Secondary emergency buttons (silent, medical, fire)
- Real-time location status
- Emergency contact quick access
- Emergency numbers for South Africa

## 🔧 Setup & Installation

### Prerequisites
- Node.js 18.0.0 or later
- npm 8.0.0 or later
- Ionic CLI: `npm install -g @ionic/cli`

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd securelink-sa

# Install dependencies
npm install

# Start development server
ionic serve
```

### Environment Configuration
Create environment files with your API keys:

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:3000',
  websocketUrl: 'ws://localhost:3001',
  supabaseUrl: 'your-supabase-url',
  supabaseAnonKey: 'your-supabase-anon-key',
  googleMapsApiKey: 'your-google-maps-api-key',
  // ... other configuration
};
```

## 🚀 Development

### Running the App
```bash
# Development server
ionic serve

# Build for production
ionic build

# Run on device
ionic capacitor run ios
ionic capacitor run android
```

### Key Services

#### SupabaseService
Handles authentication and database operations:
- User registration and login
- Emergency data management
- Real-time subscriptions
- File uploads

#### LocationService
Manages GPS tracking and location data:
- Current location retrieval
- Continuous location tracking
- Distance calculations
- Address reverse geocoding

#### EmergencyService
Core emergency functionality:
- Emergency activation
- Real-time communication
- Haptic feedback
- Local notifications

## 🔐 Security

### Authentication
- JWT tokens with short expiration
- Secure token storage using Capacitor Preferences
- Biometric authentication support
- Row Level Security (RLS) in database

### Data Protection
- End-to-end encryption for sensitive data
- Input validation
- Rate limiting on API endpoints
- Secure data deletion

## 📊 Database Schema

### Core Tables
- **users**: User profiles and authentication
- **emergencies**: Emergency incidents and tracking
- **incidents**: Non-emergency incident reports
- **emergency_updates**: Real-time emergency updates
- **user_profiles**: Extended user information

### Emergency Types
- panic
- silent_alarm
- medical
- fire
- break_in
- suspicious_activity
- personal_safety
- property_damage

## 🌍 Localization

### Supported Languages
- **English** (en) - Primary language
- **Afrikaans** (af) - South African Afrikaans
- **isiZulu** (zu) - South African Zulu

### Emergency Numbers (South Africa)
- **Police**: 10111
- **Ambulance/Fire**: 10177
- **Emergency Services**: 112
- **Poison Control**: 0861 555 777

## 🔌 API Integration

### Required APIs
- **Google Maps API**: For location services and mapping
- **Supabase**: For authentication and database
- **Eskom API**: For load shedding data (planned)
- **City Power API**: For municipal power updates (planned)

## 📱 Mobile Features

### Capacitor Plugins
- **@capacitor/geolocation**: GPS tracking
- **@capacitor/camera**: Photo/video capture
- **@capacitor/local-notifications**: Push notifications
- **@capacitor/haptics**: Haptic feedback
- **@capacitor/device**: Device information
- **@capacitor/status-bar**: Status bar management
- **@capacitor/splash-screen**: Splash screen

### Platform Support
- **iOS**: Full native support
- **Android**: Full native support
- **Web**: Progressive Web App (PWA)

## 🚀 Deployment

### Web Deployment
```bash
# Build for production
ionic build

# Deploy to hosting service
# (Firebase, Netlify, Vercel, etc.)
```

### Mobile Deployment
```bash
# Build for iOS
ionic capacitor build ios

# Build for Android
ionic capacitor build android

# Submit to app stores
# (App Store, Google Play Store)
```

## 🐛 Troubleshooting

### Common Issues
1. **Build Errors**: Ensure all dependencies are installed
2. **Location Issues**: Check device permissions
3. **API Errors**: Verify environment configuration
4. **Authentication Issues**: Check Supabase configuration

### Development Tips
- Use `ionic serve` for web development
- Use `ionic capacitor run` for device testing
- Check browser console for errors
- Use Ionic DevTools for debugging

## 📈 Future Enhancements

### Planned Features
- **Load Shedding Integration**: Real-time power outage data
- **Community Features**: Neighborhood watch integration
- **Advanced Analytics**: Emergency response analytics
- **AI Integration**: Smart incident classification
- **Multi-language Support**: Full localization
- **Offline Mode**: Enhanced offline capabilities

### Technical Improvements
- **Performance Optimization**: Lazy loading and caching
- **Security Enhancements**: Advanced encryption
- **UI/UX Improvements**: Enhanced user experience
- **Testing**: Comprehensive test coverage

## 📞 Support

### Emergency Support
- **In-App Emergency Features**: Use the panic button
- **Emergency Numbers**: Call local emergency services

### Technical Support
- **Documentation**: Check this README and inline comments
- **Issues**: Report bugs via GitHub issues
- **Community**: Join the Ionic community forums

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

**SecureLink SA** - Your safety is our priority. 🇿🇦
