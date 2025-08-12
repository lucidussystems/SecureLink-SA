// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:3000',
  websocketUrl: 'ws://localhost:3001',
  
  // Supabase Configuration
  supabaseUrl: 'https://your-project.supabase.co',
  supabaseAnonKey: 'your-anon-key',
  
  // Google Maps
  googleMapsApiKey: 'your-google-maps-api-key',
  
  // South African APIs
  eskomApiKey: 'your-eskom-api-key',
  cityPowerApiKey: 'your-city-power-api-key',
  
  // Feature Flags
  enableLoadShedding: true,
  enableMultiLanguage: true,
  enableOfflineMode: true,
  enableBackgroundTracking: true,
  
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
