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
    checkAuthHeaders();

    const queryParams = new URLSearchParams();
    queryParams.append('page', params.page || 1);
    queryParams.append('per_page', params.per_page || 10);

    //  Required param
    if (!params.time_zone) {
      throw new Error('time_zone is required');
    }
    queryParams.append('time_zone', params.time_zone);

    //  Optional filters
    if (params.status && params.status !== 'all') queryParams.append('status', params.status);
    if (params.priority) queryParams.append('priority', params.priority);
    if (params.is_assigned !== undefined) queryParams.append('is_assigned', params.is_assigned);
    if (params.user_id) queryParams.append('user_id', params.user_id);
    if (params.search && params.search.trim()) queryParams.append('search', params.search.trim());

    // console.log('Making API call to /support/list with params:', Object.fromEntries(queryParams));

    const response = await axios.get(`/support/list?${queryParams.toString()}`);

    // console.log('Tickets API response:', response.status, response.data);

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


    const ticketData = {
      subject: payload.subject,
      description: payload.description,
      priority: priorityMap[payload.priority] || 2, // default medium
      ticket_category: payload.category,
    };

    // console.log('Creating ticket with payload:', ticketData);

    const response = await axios.post('/support', ticketData);
    // console.log('Ticket create response:', response.status, response.data);
    const supportId = response.data?.data?.id || response.data?.id;

    if (payload.attachment && supportId) {
      const formData = new FormData();
      formData.append('file', payload.attachment);

      // console.log(`Uploading attachment for support_id: ${supportId}`);

      const uploadResponse = await axios.post(`/support/upload/documents/${supportId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(
        `Attachment confirmed by backend (status: ${uploadResponse.status}):`,
        uploadResponse.data
      );
    } else {
      console.log('No attachment provided, skipping upload.');
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

/**
 * FAQ API Service
 * Fetch FAQs with pagination and category filter
 */

/**
 * Get FAQs list
 * @param {Object} params
 * @param {number} params.page - Page number (default: 1)
 * @param {number} params.per_page - Items per page (default: 10)
 * @param {string} params.category - Category key (billing, leads, technical, feature, general)
 * @returns {Promise<Object>}
 */
export const getFaqs = async (params) => {
  try {
    checkAuthHeaders();

    const queryParams = new URLSearchParams();
    queryParams.append("page", params.page || 1);
    queryParams.append("per_page", params.per_page || 10);

    if (params.category) {
      queryParams.append("category_id", params.category);
    }

    // console.log("Making API call to /faq/paginated with params:", Object.fromEntries(queryParams));

    const response = await axios.get(`/faq/paginated?${queryParams.toString()}`);

    return { success: true, data: response.data, error: null };
  } catch (error) {
    console.error("Error fetching FAQs:", error);

    if (error.response) {
      return { success: false, data: null, error: error.response.data?.message || `HTTP ${error.response.status} error` };
    } else if (error.request) {
      return { success: false, data: null, error: "Network error. Please check your connection." };
    } else {
      return { success: false, data: null, error: error.message || "Something went wrong" };
    }
  }
};


/**
 * Toggle FAQ Helpful
 * @param {string} faqId - FAQ ID
 * @param {boolean} isHelpful - true/false
 * @returns {Promise<Object>}
 */
export const toggleFaqHelpful = async (faqId, isHelpful) => {
  try {
    checkAuthHeaders();

    const response = await axios.post(`/faq/${faqId}/helpful`, {
      is_helpful: isHelpful,
    });

    return response.data;
  } catch (error) {
    console.error("Error toggling FAQ helpful:", error);

    if (error.response) {
      return {
        success: false,
        error:
          error.response.data?.message ||
          `HTTP ${error.response.status} error`,
      };
    } else if (error.request) {
      return { success: false, error: "Network error. Please check your connection." };
    } else {
      return { success: false, error: error.message || "Something went wrong" };
    }
  }
};


/**
 * Get FAQ details 
 * @param {string} faqId
 * @returns {Promise<Object>}
 */
export const getFaqDetails = async (faqId) => {
  try {
    checkAuthHeaders();
    const response = await axios.get(`/faq/view/${faqId}`);
    return { success: true, data: response.data.data, error: null };
  } catch (error) {
    console.error("Error fetching FAQ details:", error);
    if (error.response) {
      return { success: false, data: null, error: error.response.data?.message || `HTTP ${error.response.status}` };
    } else if (error.request) {
      return { success: false, data: null, error: "Network error" };
    } else {
      return { success: false, data: null, error: error.message };
    }
  }
};

/**
 * Increment FAQ view count 
 * @param {string} faqId
 * @returns {Promise<boolean>}
 */
export const incrementFaqViewCount = async (faqId) => {
  try {
    checkAuthHeaders();
    // Use PATCH instead of POST
    const response = await axios.patch(`/faq/view_count/${faqId}`);
    console.log("View count increment response:", response.status, response.data);
    return true;
  } catch (error) {
    console.error("Error incrementing FAQ view count:", error?.response || error);
    return false;
  }
};


/**
 * Get support categories
 * @returns {Promise<Object>}
 */
export const getCategories = async () => {
  try {
    checkAuthHeaders();

    const response = await axios.get(`/category/list`);

    const apiStatus = response.data?.status ?? response.status;

    if (apiStatus === 200) {
      return { success: true, status: 200, data: response.data.data, error: null };
    }

    if (apiStatus === 204) {
      return { success: true, status: 204, data: [], error: null };
    }

    return {
      success: false,
      status: apiStatus,
      data: null,
      error: response.data?.message || "Failed to fetch categories",
    };
  } catch (error) {
    console.error("Error fetching categories:", error);

    if (error.response) {
      return {
        success: false,
        status: error.response.status,
        data: null,
        error: error.response.data?.message || `HTTP ${error.response.status} error`,
      };
    } else if (error.request) {
      return { success: false, status: null, data: null, error: "Network error. Please check your connection." };
    } else {
      return { success: false, status: null, data: null, error: error.message || "Something went wrong" };
    }
  }
};

