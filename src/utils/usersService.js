import axios from './axios';
import { checkAuthHeaders } from './authDebug';

/**
 * Users API Service
 * Handles all user-related API calls with proper authorization and error handling
 */

/**
 * Get users list with pagination, filtering, and search
 * @param {Object} params - Query parameters
 * @param {number} params.page - Page number (required)
 * @param {number} params.per_page - Items per page (required)
 * @param {number} [params.role_id] - Filter by role ID (optional)
 * @param {boolean} [params.is_active] - Filter by active status (optional)
 * @param {string} [params.search] - Search term (optional)
 * @returns {Promise<Object>} - Users data with pagination info
 */
export const getUsers = async (params) => {
  try {
    checkAuthHeaders(); // Debugging call
    const queryParams = new URLSearchParams();
    queryParams.append('page', params.page || 1);
    queryParams.append('per_page', params.per_page || 10);
    if (params.role_id && params.role_id !== '0') { queryParams.append('role_id', params.role_id); }
    if (params.is_active !== undefined && params.is_active !== 'all') { queryParams.append('is_active', params.is_active); }
    if (params.search && params.search.trim()) { queryParams.append('search', params.search.trim()); }

    console.log('Making API call to /users with params:', Object.fromEntries(queryParams));
    const response = await axios.get(`/users?${queryParams.toString()}`);
    console.log('Users API response:', response.status, response.data);

    return { success: true, data: response.data, error: null };
  } catch (error) {
    console.error('Error fetching users:', error);
    if (error.response) {
      return { success: false, data: null, error: error.response.data?.message || `HTTP ${error.response.status} error` };
    } else if (error.request) {
      return { success: false, data: null, error: 'Network error. Please check your connection.' };
    } else {
      return { success: false, data: null, error: error.message || 'Something went wrong' };
    }
  }
};

/**
 * Get user statistics (for dashboard stats)
 * @returns {Promise<Object>} - User statistics
 */
export const getUserStats = async () => {
  try {
    checkAuthHeaders();
    const response = await axios.get('/users/stats');
    console.log('User stats API response:', response.status, response.data);
    return { success: true, data: response.data, error: null };
  } catch (error) {
    console.error('Error fetching user stats:', error);
    if (error.response) {
      return { success: false, data: null, error: error.response.data?.message || `HTTP ${error.response.status} error` };
    } else if (error.request) {
      return { success: false, data: null, error: 'Network error. Please check your connection.' };
    } else {
      return { success: false, data: null, error: error.message || 'Something went wrong' };
    }
  }
};

/**
 * Update user status (activate/deactivate)
 * @param {string} userId - User ID
 * @param {boolean} isActive - New status
 * @returns {Promise<Object>} - Update result
 */
export const updateUserStatus = async (userId, isActive) => {
  try {
    checkAuthHeaders();
    const response = await axios.patch(`/users/${userId}/status`, {
      is_active: isActive
    });
    console.log('Update user status API response:', response.status, response.data);
    return { success: true, data: response.data, error: null };
  } catch (error) {
    console.error('Error updating user status:', error);
    if (error.response) {
      return { success: false, data: null, error: error.response.data?.message || `HTTP ${error.response.status} error` };
    } else if (error.request) {
      return { success: false, data: null, error: 'Network error. Please check your connection.' };
    } else {
      return { success: false, data: null, error: error.message || 'Something went wrong' };
    }
  }
};

/**
 * Delete user
 * @param {string} userId - User ID
 * @returns {Promise<Object>} - Delete result
 */
export const deleteUser = async (userId) => {
  try {
    checkAuthHeaders();
    const response = await axios.delete(`/users/${userId}`);
    console.log('Delete user API response:', response.status, response.data);
    return { success: true, data: response.data, error: null };
  } catch (error) {
    console.error('Error deleting user:', error);
    if (error.response) {
      return { success: false, data: null, error: error.response.data?.message || `HTTP ${error.response.status} error` };
    } else if (error.request) {
      return { success: false, data: null, error: 'Network error. Please check your connection.' };
    } else {
      return { success: false, data: null, error: error.message || 'Something went wrong' };
    }
  }
};

export const inviteUser = async (userData) => {
  try {
    checkAuthHeaders();
    
    // Prepare the payload according to API specification
    const payload = {
      first_name: userData.first_name,
      last_name: userData.last_name,
      role_id: parseInt(userData.role_id),
      email: userData.email,
      department_id: userData.department_id,
    //   department_name: userData.department_name || userData.other_department || '',
      permissions: userData.permissions || []
    };

    console.log('Making API call to /users/invite with payload:', payload);
    const response = await axios.post('/users/invite', payload);
    console.log('Invite user API response:', response.status, response.data);

    return { success: true, data: response.data, error: null };
  } catch (error) {
    console.error('Error inviting user:', error);
    if (error.response) {
      return { success: false, data: null, error: error.response.data?.message || `HTTP ${error.response.status} error` };
    } else if (error.request) {
      return { success: false, data: null, error: 'Network error. Please check your connection.' };
    } else {
      return { success: false, data: null, error: error.message || 'Something went wrong' };
    }
  }
}; 