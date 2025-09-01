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
 * @param {number} params.page - Page number (required, defaults to 1)
 * @param {number} params.per_page - Items per page (required, defaults to 10)
 * @param {string} params.time_zone - Time zone (required, defaults to Asia/Kolkata)
 * @param {0|1|""} [params.is_assigned] - Assigned filter (0 = not assigned, 1 = assigned, "" = all)
 * @returns {Promise<Object>} - Tickets data with pagination info
 */
export const getSupportTickets = async (params = {}) => {
  try {
    checkAuthHeaders(); // Ensure auth headers are attached before request

    // Ensure defaults
    const page = params.page || 1;
    const perPage = params.per_page || 10;
    const timeZone = params.time_zone || "Asia/Kolkata";
    const isAssigned = params.is_assigned ?? ""; // Accepts 0, 1, or ""

    // Build query string manually
    const queryParams = [
      `page=${page}`,
      `per_page=${perPage}`,
      `time_zone=${encodeURIComponent(timeZone)}`,
      `is_assigned=${isAssigned}`
    ].join("&");

    const finalUrl = `/support/list?${queryParams}`;

    // Debug logs
    console.log("SupportTicketsService → Final URL:", finalUrl);
    console.log("SupportTicketsService → Params:", { page, perPage, timeZone, isAssigned });

    // API request
    const response = await axios.get(finalUrl);

    console.log("SupportTicketsService → Response:", response.status, response.data);

    return { success: true, data: response.data, error: null };
  } catch (error) {
    console.error("SupportTicketsService → Error fetching support tickets:", error);

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
