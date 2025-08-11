/**
 * User Data Management Utilities
 * Handles secure storage and retrieval of user data
 */

/**
 * Sanitizes user data before storing in localStorage
 * Removes sensitive information that shouldn't be stored locally
 * 
 * @param {Object} userData - Raw user data from API
 * @returns {Object} - Sanitized user data safe for localStorage
 */
export const sanitizeUserData = (userData) => {
  if (!userData || typeof userData !== 'object') {
    return null;
  }

  // Only store non-sensitive user information
  const safeUserData = {
    id: userData.id,
    email: userData.email,
    first_name: userData.first_name,
    last_name: userData.last_name,
    department_id: userData.department_id,
    role_id: userData.role_id,
    permissions: userData.permissions || [],
    // Add any other non-sensitive fields you need
  };

  return safeUserData;
};

/**
 * Gets user's full name from user data
 * 
 * @param {Object} userData - User data object
 * @returns {string} - Full name or email as fallback
 */
export const getUserFullName = (userData) => {
  if (!userData) return '';
  
  const firstName = userData.first_name || '';
  const lastName = userData.last_name || '';
  
  if (firstName || lastName) {
    return `${firstName} ${lastName}`.trim();
  }
  
  return userData.email || '';
};

/**
 * Checks if user has specific permission
 * 
 * @param {Object} userData - User data object
 * @param {string} permission - Permission to check
 * @returns {boolean} - Whether user has the permission
 */
export const hasPermission = (userData, permission) => {
  if (!userData || !userData.permissions) return false;
  return userData.permissions.includes(permission);
};

/**
 * Checks if user has admin role
 * 
 * @param {Object} userData - User data object
 * @returns {boolean} - Whether user is admin
 */
export const isAdmin = (userData) => {
  if (!userData) return false;
  return userData.role_id === 1; // Assuming role_id 1 is admin
};

/**
 * Gets user's department name (placeholder for future implementation)
 * 
 * @param {Object} userData - User data object
 * @returns {string} - Department name or ID
 */
export const getUserDepartment = (userData) => {
  if (!userData) return '';
  return `Department ${userData.department_id}`; // Placeholder
}; 