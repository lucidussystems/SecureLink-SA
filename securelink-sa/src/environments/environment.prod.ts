export const environment = {
  production: true,
  apiBaseUrl: 'https://api.securelink-sa.com',
  websocketUrl: 'wss://api.securelink-sa.com',
  
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
