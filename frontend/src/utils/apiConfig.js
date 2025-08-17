// Common API configuration
export const API_CONFIG = {
  // Base URLs for different environments
  BASE_URLS: {
    development: 'http://localhost:5000/api',
    production: 'https://iteg-backend-demo.onrender.com/api',
    staging: 'https://iteg.ssism.org/api'
  },
  
  // Get current base URL from environment
  getCurrentBaseUrl: () => {
    return import.meta.env.VITE_API_URL || API_CONFIG.BASE_URLS.development;
  },
  
  // Common headers for external APIs
  EXTERNAL_API_HEADERS: {
    'x-access-key': '2d4be3923900850970e8817835c3b92b:0f6f6395561d1503a09e1bd307dc7da0917e1c0a887b6f5c984eb3fe2cf86098',
    'Content-Type': 'application/json'
  },
  
  // Attendance API specific configuration
  ATTENDANCE_API: {
    baseUrl: 'http://localhost:5000', // External attendance API URL
    endpoints: {
      studentAttendance: '/api/attendance/student/'
    }
  }
};

// Helper function to build full API URLs
export const buildApiUrl = (endpoint, baseUrl = null) => {
  const base = baseUrl || API_CONFIG.getCurrentBaseUrl();
  return `${base}${endpoint}`;
};

// Helper function for external API calls
export const getExternalApiConfig = (url, options = {}) => {
  return {
    url,
    ...options,
    headers: {
      ...API_CONFIG.EXTERNAL_API_HEADERS,
      ...options.headers
    }
  };
};

// Get center API URL
export const getCenterApiUrl = () => {
  return import.meta.env.VITE_CENTRAL_API || 'http://localhost:5000';
};