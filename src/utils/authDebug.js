/**
 * Auth Debug Utilities
 * Help troubleshoot authorization header issues
 */

/**
 * Check if authorization header is being added to requests
 */
export const checkAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  
  console.log('=== Auth Debug Info ===');
  console.log('Token exists:', !!token);
  console.log('Token length:', token ? token.length : 0);
  console.log('Token preview:', token ? `${token.substring(0, 20)}...` : 'None');
  
  if (token) {
    try {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      console.log('Token payload:', decoded);
      console.log('Token expires at:', new Date(decoded.exp * 1000));
      console.log('Token is expired:', Date.now() / 1000 > decoded.exp);
    } catch (err) {
      console.log('Failed to decode token:', err);
    }
  }
  
  return {
    hasToken: !!token,
    tokenLength: token ? token.length : 0,
    tokenPreview: token ? `${token.substring(0, 20)}...` : 'None'
  };
};

/**
 * Manually add authorization header to a request
 */
export const addAuthHeader = (config) => {
  const token = localStorage.getItem('authToken');
  
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
    console.log('Manually added auth header to:', config.url);
  } else {
    console.log('No token available for:', config.url);
  }
  
  return config;
};

/**
 * Test API call with manual auth header
 */
export const testApiCall = async (url) => {
  const token = localStorage.getItem('authToken');
  
  if (!token) {
    console.error('No token available for API call');
    return null;
  }
  
  try {
    const response = await fetch(`https://docuhub-1525466ccc8b.herokuapp.com/api/v1${url}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Test API call response:', response.status, response.statusText);
    return response;
  } catch (error) {
    console.error('Test API call error:', error);
    return null;
  }
}; 