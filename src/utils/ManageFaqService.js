import axios from "./axios"; // your configured axios instance
import { checkAuthHeaders } from "./authDebug";

/**
 * Manage FAQ API Service
 * Handles creating, fetching, updating, deleting FAQs
 */

/**
 * Add a new FAQ
 * @param {Object} faqData - { question, answer, category_id }
 * @returns {Object} { success, data, error, status }
 */
export const addFaq = async (faqData) => {
  try {
    checkAuthHeaders(); // Ensure auth headers are attached

    console.log("ManageFaqService → Adding FAQ:", faqData);

    const response = await axios.post("/faq", faqData);

    console.log("ManageFaqService → Response:", response.status, response.data);

    // Backend-level error handling
    if (response.data.status && response.data.status >= 400) {
      return {
        success: false,
        status: response.status, // ✅ include status
        data: [],
        error: response.data.message,
      };
    }

    return {
      success: true,
      status: response.status, //  include status
      data: response.data.data || [],
      error: null,
    };
  } catch (error) {
    console.error("ManageFaqService → Failed to add FAQ:", error);

    if (error.response) {
      return {
        success: false,
        status: error.response.status, //  include status
        data: [],
        error:
          error.response.data?.message || `HTTP ${error.response.status} error`,
      };
    } else if (error.request) {
      return {
        success: false,
        status: null, //  make status explicit
        data: [],
        error: "Network error. Please check your connection.",
      };
    } else {
      return {
        success: false,
        status: null, //  make status explicit
        data: [],
        error: error.message || "Something went wrong",
      };
    }
  }
};

/**
 * Fetch FAQs with pagination
 * @param {Object} options - { page, per_page, category_id }
 * @returns {Object} { success, status, data, pagination, error }
 */
export const getFaqs = async ({
  page = 1,
  per_page = 10,
  category_id = "",
} = {}) => {
  try {
    checkAuthHeaders();

    const response = await axios.get("/faq/paginated", {
      params: { page, per_page, category_id },
    });

    const resData = response.data;

    if (resData.status && resData.status >= 400) {
      return {
        success: false,
        status: response.status,
        data: null,
        error: resData.message,
      };
    }

    return {
      success: true,
      status: response.status,
      data: resData.data || [],
      pagination: resData.pagination || {
        current_page: page,
        per_page,
        total: (resData.data || []).length,
        length: (resData.data || []).length,
      },
      error: null,
    };
  } catch (error) {
    if (error.response) {
      return {
        success: false,
        status: error.response.status,
        data: null,
        error:
          error.response.data?.message || `HTTP ${error.response.status} error`,
      };
    } else if (error.request) {
      return {
        success: false,
        status: null,
        data: null,
        error: "Network error. Please check your connection.",
      };
    } else {
      return {
        success: false,
        status: null,
        data: null,
        error: error.message || "Something went wrong",
      };
    }
  }
};

/**
 * Update an existing FAQ
 * @param {string} faqId - ID of the FAQ to update
 * @param {Object} updateData - { question, answer, category_id (optional) }
 * @returns {Object} { success, status, data, error }
 */
export const updateFaq = async (faqId, updateData) => {
  try {
    checkAuthHeaders(); // Ensure auth headers are attached

    console.log(`ManageFaqService → Updating FAQ ${faqId}:`, updateData);

    const response = await axios.put(`/faq/${faqId}`, updateData);

    console.log("ManageFaqService → Response:", response.status, response.data);

    // Handle backend-level errors even if HTTP status is 200
    if (response.data.status && response.data.status >= 400) {
      console.error("ManageFaqService → Backend error:", response.data.message);
      return {
        success: false,
        status: response.status,
        data: null,
        error: response.data.message,
      };
    }

    return {
      success: true,
      status: response.status,
      data: response.data,
      error: null,
    };
  } catch (error) {
    console.error("ManageFaqService → Failed to update FAQ:", error);

    if (error.response) {
      return {
        success: false,
        status: error.response.status,
        data: null,
        error:
          error.response.data?.message || `HTTP ${error.response.status} error`,
      };
    } else if (error.request) {
      return {
        success: false,
        status: null,
        data: null,
        error: "Network error. Please check your connection.",
      };
    } else {
      return {
        success: false,
        status: null,
        data: null,
        error: error.message || "Something went wrong",
      };
    }
  }
};

/**
 * Delete an existing FAQ
 * @param {string} faqId - ID of the FAQ to delete
 * @returns {Object} { success, status, data, error }
 */
export const deleteFaq = async (faqId) => {
  try {
    checkAuthHeaders(); // Ensure auth headers are attached

    console.log(`ManageFaqService → Deleting FAQ ${faqId}`);

    const response = await axios.delete(`/faq/${faqId}`);

    console.log("ManageFaqService → Response:", response.status, response.data);

    // Handle backend-level errors even if HTTP status is 200
    if (response.data.status && response.data.status >= 400) {
      console.error("ManageFaqService → Backend error:", response.data.message);
      return {
        success: false,
        status: response.status,
        data: null,
        error: response.data.message,
      };
    }

    return {
      success: true,
      status: response.status,
      data: response.data,
      error: null,
    };
  } catch (error) {
    console.error("ManageFaqService → Failed to delete FAQ:", error);

    if (error.response) {
      return {
        success: false,
        status: error.response.status,
        data: null,
        error:
          error.response.data?.message || `HTTP ${error.response.status} error`,
      };
    } else if (error.request) {
      return {
        success: false,
        status: null,
        data: null,
        error: "Network error. Please check your connection.",
      };
    } else {
      return {
        success: false,
        status: null,
        data: null,
        error: error.message || "Something went wrong",
      };
    }
  }
};

/**
 * Fetch view count for a FAQ
 * @param {string} faqId - ID of the FAQ
 * @returns {Object} { success, data, error }
 */
export const getViewCount = async (faqId) => {
  try {
    checkAuthHeaders(); // Ensure auth headers are attached

    console.log(`ManageFaqService → Fetching view count for FAQ ${faqId}`);

    const response = await axios.get(`/faq/view/${faqId}`);

    console.log("ManageFaqService → Response:", response.status, response.data);

    // Handle backend-level errors even if HTTP status is 200
    if (response.data.status && response.data.status >= 400) {
      console.error("ManageFaqService → Backend error:", response.data.message);
      return { success: false, data: null, error: response.data.message };
    }

    return { success: true, data: response.data, error: null };
  } catch (error) {
    console.error("ManageFaqService → Failed to fetch view count:", error);

    if (error.response) {
      return {
        success: false,
        data: null,
        error:
          error.response.data?.message || `HTTP ${error.response.status} error`,
      };
    } else if (error.request) {
      return {
        success: false,
        data: null,
        error: "Network error. Please check your connection.",
      };
    } else {
      return {
        success: false,
        data: null,
        error: error.message || "Something went wrong",
      };
    }
  }
};

/**
 * Fetch all FAQ categories
 * @returns {Object} { success, status, data, error }
 */
export const getCategories = async () => {
  try {
    checkAuthHeaders(); // Ensure auth headers are attached

    const response = await axios.get("/category/list");

    console.log(
      "ManageFaqService → Categories Response:",
      response.status,
      response.data,
    );

    // Backend-level error handling
    if (response.data.status && response.data.status >= 400) {
      return {
        success: false,
        status: response.status, //  include status
        data: [],
        error: response.data.message,
      };
    }

    return {
      success: true,
      status: response.status, //  include status
      data: response.data.data || [],
      error: null,
    };
  } catch (error) {
    console.error("ManageFaqService → Failed to fetch categories:", error);

    if (error.response) {
      return {
        success: false,
        status: error.response.status, //  include status
        data: [],
        error:
          error.response.data?.message || `HTTP ${error.response.status} error`,
      };
    } else if (error.request) {
      return {
        success: false,
        status: null, //  make status explicit
        data: [],
        error: "Network error. Please check your connection.",
      };
    } else {
      return {
        success: false,
        status: null, //  make status explicit
        data: [],
        error: error.message || "Something went wrong",
      };
    }
  }
};
