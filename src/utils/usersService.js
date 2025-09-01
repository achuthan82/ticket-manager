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
export const getUsers =  async (params) => {
  try {
    checkAuthHeaders(); // Debugging call
    const queryParams = new URLSearchParams();
    queryParams.append('page', params.page || 1);
    queryParams.append('per_page', params.per_page || 10);
    if (params.role_id && params.role_id !== '0') { queryParams.append('role_id', params.role_id); }
    if (params.is_active !== undefined && params.is_active !== 'all') { queryParams.append('is_active', params.is_active); }
    if (params.search && params.search.trim()) { queryParams.append('search', params.search.trim()); }

    console.log('Making API call to /users with params:', Object.fromEntries(queryParams));
    const response = await axios.get(`/user/paginated_list?${queryParams.toString()}`);
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
 