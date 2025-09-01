// SupportTicketService.js
import axios from './axios';
import { checkAuthHeaders } from './authDebug';

/**
 * Support Tickets API Service
 * Handles fetching support tickets with pagination, time zone, and assignment status
 */

/**
 * Get support tickets list
 * @param {Object} params - Query parameters
 * @param {number} params.page - Page number (required)
 * @param {number} params.per_page - Items per page (required)
 * @param {string} params.time_zone - Time zone (required, defaults to Asia/Kolkata)
 * @param {string} [params.is_assigned] - Assigned filter (optional, defaults to empty string)
 * @returns {Promise<Object>} - Tickets data with pagination info
 */
export const getSupportTickets = async (params) => {
  try {
    checkAuthHeaders(); // Ensure auth headers are attached

    // Ensure defaults
    const page = params.page || 1;
    const perPage = params.per_page || 10;
    const timeZone = params.time_zone || "Asia/Kolkata";
    const isAssigned = params.is_assigned ?? "";

    // Build query string manually
    const queryParams = [
      `page=${page}`,
      `per_page=${perPage}`,
      `time_zone=${timeZone}`,
      `is_assigned=${isAssigned}`
    ].join("&");

    // const finalUrl = `https://shield-tickets-backend-4bfb1f52b122.herokuapp.com`;

    // Debug logs
    // console.log("Making API call to:", finalUrl);
    console.log("Query Params Object:", { page, perPage, timeZone, isAssigned });

    // API request.
    const response = await axios.get(`/support/list?${queryParams}`);

    console.log("Support Tickets API response:", response.status, response.data);

    return { success: true, data: response.data, error: null };
  } catch (error) {
    console.error("Error fetching support tickets:", error);

    if (error.response) {
      return {
        success: false,
        data: null,
        error: error.response.data?.message || `HTTP ${error.response.status} error`,
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
