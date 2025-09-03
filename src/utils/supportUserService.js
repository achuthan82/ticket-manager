// import axios from './axios';
// import { checkAuthHeaders } from './authDebug';

// /**
//  * Support Tickets API Service
//  * Handles fetching support tickets with pagination, filtering and search
//  */

// /**
//  * Get tickets list
//  * @param {Object} params - Query parameters
//  * @param {number} [params.page] - Page number (default: 1)
//  * @param {number} [params.per_page] - Items per page (default: 10)
//  * @param {string} params.time_zone - Required timezone (e.g. Asia/Kolkata)
//  * @param {string} [params.status] - Ticket status (Open, In Progress, Resolved, Closed)
//  * @param {string} [params.priority] - Priority (Low, Medium, High, Critical)
//  * @param {string} [params.is_assigned] - Assignment status (0 = unassigned, 1 = assigned)
//  * @param {number} [params.user_id] - User ID (when is_assigned=1)
//  * @param {string} [params.search] - Search term
//  * @returns {Promise<Object>} - Tickets data with pagination info
//  */
// export const getTickets = async (params) => {
//   try {
//     checkAuthHeaders(); // Debugging helper

//     const queryParams = new URLSearchParams();

//     // Required
//     queryParams.append('time_zone', params.time_zone || 'Asia/Kolkata');

//     // Optional
//     if (params.page) queryParams.append('page', params.page);
//     if (params.per_page) queryParams.append('per_page', params.per_page);
//     if (params.status && params.status !== 'all') queryParams.append('status', params.status);
//     if (params.priority) queryParams.append('priority', params.priority);
//     if (params.is_assigned !== undefined) queryParams.append('is_assigned', params.is_assigned);
//     if (params.user_id) queryParams.append('user_id', params.user_id);
//     if (params.search && params.search.trim()) queryParams.append('search', params.search.trim());

//     console.log('Making API call to /support/list with params:', Object.fromEntries(queryParams));

//     const response = await axios.get(`/support/list?${queryParams.toString()}`, {
//       headers: {
//         'X-Platform': params.platform || 'Desktop', // Default Desktop
//       },
//     });

//     console.log('Tickets API response:', response.status, response.data);

//     return { success: true, data: response.data, error: null };
//   } catch (error) {
//     console.error('Error fetching tickets:', error);

//     if (error.response) {
//       return {
//         success: false,
//         data: null,
//         error: error.response.data?.message || `HTTP ${error.response.status} error`,
//       };
//     } else if (error.request) {
//       return { success: false, data: null, error: 'Network error. Please check your connection.' };
//     } else {
//       return { success: false, data: null, error: error.message || 'Something went wrong' };
//     }
//   }
// };




import axios from './axios';
import { checkAuthHeaders } from './authDebug';

/**
 * Support Tickets API Service
 * Handles fetching support tickets with pagination, filtering and search
 */

/**
 * Get tickets list
 * @param {Object} params - Query parameters
 * @param {number} params.page - Page number (default: 1)
 * @param {number} params.per_page - Items per page (default: 10)
 * @param {string} params.time_zone - Time zone (required, e.g. Asia/Kolkata)
 * @param {string} [params.status] - Filter by ticket status (Open, In Progress, Resolved, Closed)
 * @param {string} [params.priority] - Filter by priority (Low, Medium, High, Critical)
 * @param {string} [params.is_assigned] - Assignment status (0 = unassigned, 1 = assigned)
 * @param {number} [params.user_id] - User ID (used when is_assigned = 1)
 * @param {string} [params.search] - Search term (optional)
 * @returns {Promise<Object>} - Tickets data with pagination info
 */
export const getTickets = async (params) => {
  try {
    checkAuthHeaders(); // Debugging call

    const queryParams = new URLSearchParams();
    queryParams.append('page', params.page || 1);
    queryParams.append('per_page', params.per_page || 10);

    // ✅ Required param
    if (!params.time_zone) {
      throw new Error('time_zone is required');
    }
    queryParams.append('time_zone', params.time_zone);

    // ✅ Optional filters
    if (params.status && params.status !== 'all') queryParams.append('status', params.status);
    if (params.priority) queryParams.append('priority', params.priority);
    if (params.is_assigned !== undefined) queryParams.append('is_assigned', params.is_assigned);
    if (params.user_id) queryParams.append('user_id', params.user_id);
    if (params.search && params.search.trim()) queryParams.append('search', params.search.trim());

    console.log('Making API call to /support/list with params:', Object.fromEntries(queryParams));

    // ❌ Removed X-Platform header
    const response = await axios.get(`/support/list?${queryParams.toString()}`);

    console.log('Tickets API response:', response.status, response.data);

    return { success: true, data: response.data, error: null };
  } catch (error) {
    console.error('Error fetching tickets:', error);
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
 * Create a new support ticket
 * @param {Object} payload
 * @param {string} payload.subject - Ticket subject
 * @param {string} payload.description - Ticket description
 * @param {string} payload.priority - low | medium | high (UI values)
 * @param {string} payload.category - category key from UI
 * @param {File} [payload.attachment] - Optional file attachment
 * @returns {Promise<Object>}
 */
export const createTicket = async (payload) => {
  try {
    checkAuthHeaders();

    // Map priorities to backend values
    const priorityMap = {
      low: 1,
      medium: 2,
      high: 3,
    };

    // Map categories to backend UUIDs
    const categoryMap = {
      billing: '82b5d872-744d-429a-ab2b-9a3694e10ea7',
      leads: '5601d4a7-a534-4da1-aac3-95c10e2e212b',
      technical: '52b9f447-6818-4de3-88b3-4f26f9b1f70b',
      feature: '6e4aee31-3191-4510-8bcd-11a384098e61',
      general: '63da341a-ccb4-40df-bf9d-ab8b112ad3f2',
    };

    const ticketData = {
      subject: payload.subject,
      description: payload.description,
      priority: priorityMap[payload.priority] || 2, // default medium
      // status: 1,
      ticket_category: categoryMap[payload.category],
    };

    console.log('Creating ticket with payload:', ticketData);

    // Step 1: Create ticket
    const response = await axios.post('/support', ticketData);

    console.log('Ticket create response:', response.status, response.data);

    const supportId = response.data?.data?.id || response.data?.id; // adapt based on backend response

    // Step 2: If attachment exists, upload it
    if (payload.attachment && supportId) {
      const formData = new FormData();
      formData.append('file', payload.attachment);

      console.log('Uploading attachment for support_id:', supportId);

      await axios.post(`/support/upload/documents/${supportId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    }

    return { success: true, data: response.data, error: null };
  } catch (error) {
    console.error('Error creating ticket:', error);
    if (error.response) {
      return { success: false, data: null, error: error.response.data?.message || `HTTP ${error.response.status} error` };
    } else if (error.request) {
      return { success: false, data: null, error: 'Network error. Please check your connection.' };
    } else {
      return { success: false, data: null, error: error.message || 'Something went wrong' };
    }
  }
};
