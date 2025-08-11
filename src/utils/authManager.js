/**
 * Global Auth Manager
 * Handles logout and redirect functionality that can be called from anywhere
 */

let logoutCallback = null;
let redirectCallback = null;

/**
 * Sets the logout callback function
 * @param {Function} callback - Function to call when logout is needed
 */
export const setLogoutCallback = (callback) => {
  logoutCallback = callback;
};

/**
 * Sets the redirect callback function
 * @param {Function} callback - Function to call when redirect is needed
 */
export const setRedirectCallback = (callback) => {
  redirectCallback = callback;
};

/**
 * Triggers logout and redirect to login page
 * @param {string} message - Optional error message to show
 */
export const handleUnauthorized = async (message = 'Session expired. Please login again.') => {
  // Clear all auth data
  localStorage.removeItem('authToken');
  localStorage.removeItem('userData');
  
  // Store error message for login page to display
  if (message) {
    localStorage.setItem('loginErrorMessage', message);
  }
  
  // Try to call logout API (but don't block if it fails)
  try {
    const axios = (await import('./axios')).default;
    await axios.post("/auth/logout");
  } catch (err) {
    console.warn("Logout API call failed during unauthorized handling:", err);
  }
  
  // Call logout callback if set
  if (logoutCallback) {
    logoutCallback();
  }
  
  // Call redirect callback if set
  if (redirectCallback) {
    redirectCallback('/login');
  }
  
  // Fallback: redirect to login page
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
};

/**
 * Clears the callback functions
 */
export const clearCallbacks = () => {
  logoutCallback = null;
  redirectCallback = null;
}; 