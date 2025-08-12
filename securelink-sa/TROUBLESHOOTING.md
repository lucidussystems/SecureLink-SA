# Troubleshooting Guide - SecureLink SA

## Issues Fixed

### 1. StatusBar Plugin Error
**Error**: `CapacitorException: "StatusBar" plugin is not implemented on web`

**Solution**: Added platform checks in `app.component.ts` to only call StatusBar and SplashScreen plugins on native platforms:

```typescript
// Only call StatusBar and SplashScreen on native platforms
if (this.platform.is('capacitor')) {
  StatusBar.setStyle({ style: Style.Dark }).catch(err => {
    console.warn('StatusBar not available:', err);
  });
  SplashScreen.hide().catch(err => {
    console.warn('SplashScreen not available:', err);
  });
}
```

### 2. Navigator LockManager Error
**Error**: `NavigatorLockAcquireTimeoutError: Acquiring an exclusive Navigator LockManager lock "lock:sb-your-project-auth-token" immediately failed`

**Solution**: Added retry logic and better error handling in `supabase.service.ts`:

```typescript
// Retry operation helper to handle Navigator LockManager errors
private async retryOperation<T>(operation: () => Promise<T>, maxRetries: number = 3): Promise<T> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error: any) {
      // Check if it's a Navigator LockManager error
      if (error.name === 'NavigatorLockAcquireTimeoutError' || 
          error.message?.includes('lock:sb-your-project-auth-token')) {
        if (attempt < maxRetries) {
          // Wait before retrying (exponential backoff)
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 100));
          continue;
        }
      }
      throw error;
    }
  }
  throw new Error('Max retries exceeded');
}
```

### 3. White Screen Issue
**Cause**: Authentication errors and Capacitor plugin failures preventing app initialization

**Solutions**:
1. **Platform Checks**: Added platform checks to all Capacitor plugin calls
2. **Error Handling**: Added try-catch blocks to prevent initialization failures
3. **Environment Configuration**: Disabled features that require external services for development

### 4. TypeScript Errors
**Error**: Type mismatches in LocationService for watchId handling

**Solution**: Fixed type handling for both web and native platforms:

```typescript
private watchId: string | number | null = null;

// In stopLocationTracking method:
if (this.platform.is('capacitor')) {
  await Geolocation.clearWatch({ id: this.watchId as string });
} else {
  navigator.geolocation.clearWatch(this.watchId as number);
}
```

## Environment Configuration Changes

Updated `environment.ts` to disable features that require external services:

```typescript
export const environment = {
  // ... other config
  websocketUrl: '', // Disabled for development
  enableBackgroundTracking: false, // Disabled to prevent location permission issues
  enableLoadShedding: false,
  enableMultiLanguage: false,
  // ... other config
};
```

## Platform-Specific Handling

### Web Platform
- Uses browser Geolocation API instead of Capacitor Geolocation
- Uses browser notifications instead of Capacitor Local Notifications
- Disables haptic feedback (not available on web)
- Disables WebSocket connections (if not configured)

### Native Platform (iOS/Android)
- Uses Capacitor plugins for all native functionality
- Full access to device features
- Native notifications and haptic feedback

## Testing the Application

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Start development server**:
   ```bash
   npm start
   ```

3. **Access the application**:
   - Open browser to `http://localhost:4200`
   - The application should load without console errors
   - You should see the home page with emergency buttons

## Current Status

✅ **Fixed Issues**:
- StatusBar plugin error
- Navigator LockManager error
- White screen issue
- TypeScript compilation errors

✅ **Working Features**:
- Application loads successfully
- Home page displays correctly
- Emergency buttons are functional
- Navigation between pages works
- Platform-specific feature handling

⚠️ **Development Mode Features**:
- Authentication is disabled (uses placeholder Supabase config)
- WebSocket connections are disabled
- Background location tracking is disabled
- External API integrations are disabled

## Next Steps for Production

1. **Configure Supabase**:
   - Set up a real Supabase project
   - Update `environment.ts` with real credentials
   - Configure database schema

2. **Enable Features**:
   - Configure WebSocket server
   - Enable background location tracking
   - Set up external API integrations

3. **Testing**:
   - Test on real devices
   - Test authentication flow
   - Test emergency functionality

## Common Issues and Solutions

### If you still see console errors:
1. Clear browser cache and reload
2. Check that all dependencies are installed: `npm install`
3. Restart the development server: `npm start`

### If the app doesn't load:
1. Check browser console for errors
2. Verify that the development server is running on port 4200
3. Check that all TypeScript files compile without errors

### If Capacitor plugins don't work:
1. Ensure you're testing on a native platform (iOS/Android)
2. Check that plugins are properly installed: `npm install @capacitor/[plugin-name]`
3. Verify platform-specific configurations in `capacitor.config.ts`
