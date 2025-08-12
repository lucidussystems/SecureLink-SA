// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:3000',
  websocketUrl: '', // Disabled for development to prevent connection errors
  
  // Supabase Configuration - Real credentials
  supabaseUrl: 'https://owxuhscvynbaqpuavoje.supabase.co',
  supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93eHVoc2N2eW5iYXFwdWF2b2plIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2MDI4OTgsImV4cCI6MjA2ODE3ODg5OH0.sZx0OJxFqeCytXyd2Pq4ro1AhmIRTPXcb9igeZOemkI',
  
  // Google Maps
  googleMapsApiKey: 'your-google-maps-api-key',
  
  // South African APIs
  eskomApiKey: 'your-eskom-api-key',
  cityPowerApiKey: 'your-city-power-api-key',
  
  // Feature Flags - Enable authentication and core features
  enableLoadShedding: false,
  enableMultiLanguage: false,
  enableOfflineMode: true,
  enableBackgroundTracking: false, // Keep disabled for web development
  
  // App Configuration
  appName: 'SecureLink SA',
  version: '1.0.0',
  
  // Emergency Numbers (South Africa)
  emergencyNumbers: {
    police: '10111',
    ambulance: '10177',
    emergency: '112',
    poisonControl: '0861 555 777'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
