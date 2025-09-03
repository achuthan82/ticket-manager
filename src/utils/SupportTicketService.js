// SupportTicketService.js
import axios from "./axios";
import { checkAuthHeaders } from "./authDebug";


/**
 * Support Tickets API Service
 * Handles fetching and updating support tickets
 */

/**
 * Get support tickets list
 */
export const getSupportTickets = async (params = {}) => {
  try {
    checkAuthHeaders(); // Ensure auth headers are attached before request

    const page = params.page || 1;
    const perPage = params.per_page || 10;
    const timeZone = params.time_zone || "Asia/Kolkata";
    const isAssigned = params.is_assigned ?? "";

    const queryParams = [
      `page=${page}`,
      `per_page=${perPage}`,
      `time_zone=${encodeURIComponent(timeZone)}`,
      `is_assigned=${isAssigned}`,
    ].join("&");

    const finalUrl = `/support/list?${queryParams}`;

    console.log("SupportTicketsService → Final URL:", finalUrl);

    const response = await axios.get(finalUrl);

    console.log(
      "SupportTicketsService → Response:",
      response.status,
      response.data,
    );

    return { success: true, data: response.data, error: null };
  } catch (error) {
    console.error(
      "SupportTicketsService → Error fetching support tickets:",
      error,
    );

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
 * Edit support ticket status
 * @param {number} supportId - ID of the support ticket
 * @param {number} status - New status code:
 *   1 = New
 *   2 = Open
 *   3 = Pending
 *   4 = Resolved
 *    5 = Closed
 * @returns {Promise<Object>} - Success or error response
 */
export const editSupportTicketStatus = async (supportId, status) => {
  try {
    checkAuthHeaders();

    const finalUrl = `/support/edit/${supportId}`;

    // ✅ Ensure status is always a number
    const body = { status: Number(status) };

    console.log(
      "SupportTicketsService → Editing ticket:",
      supportId,
      "→",
      body,
    );

    const response = await axios.patch(finalUrl, body);

    console.log(
      "SupportTicketsService → Edit Response:",
      response.status,
      response.data,
    );

    return { success: true, data: response.data, error: null };
  } catch (error) {
    console.error("SupportTicketsService → Error editing ticket:", error);

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
 * Assign support ticket
 * @param {number} supportId - ID of the support ticket
 * @param {string} ticketOwner - User ID to assign the ticket to
 * @returns {Promise<Object>} - Success or error response
 */
export const assignSupportTicket = async (supportId, ticketOwner) => {
  try {
    checkAuthHeaders();

    const finalUrl = `/support/assign/${supportId}`;
    const body = { ticket_owner: ticketOwner };

    console.log(
      "SupportTicketsService → Assigning ticket:",
      supportId,
      "→",
      body,
    );

    const response = await axios.post(finalUrl, body);

    console.log(
      "SupportTicketsService → Assign Response:",
      response.status,
      response.data,
    );

    return { success: true, data: response.data, error: null };
  } catch (error) {
    console.error("SupportTicketsService → Error assigning ticket:", error);

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
 * Add a comment to a support ticket
 * @param {number} supportId - ID of the support ticket
 * @param {string} message - Comment message
 * @returns {Promise<Object>} - Success or error response
 */
export const addSupportComment = async (supportId, message) => {
  try {
    checkAuthHeaders();

    const finalUrl = `/comment/add/${supportId}`;

    // ✅ Hardcoding attachment & send_notification
    const body = {
      attachment: false,
      message,
      send_notification: true,
    };

    console.log("SupportTicketsService → Adding comment:", finalUrl, body);

    const response = await axios.post(finalUrl, body);

    console.log(
      "SupportTicketsService → Add Comment Response:",
      response.status,
      response.data,
    );

    return { success: true, data: response.data, error: null };
  } catch (error) {
    console.error("SupportTicketsService → Error adding comment:", error);

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
 * Get comments for a support ticket LISTING TICKET.
 * @param {number} supportId - ID of the support ticket
 * @param {string} timeZone - Optional timezone (default: Asia/Kolkata)
 * @returns {Promise<Object>} - Success or error response
 */
export const getComments = async (supportId, timeZone = "Asia/Kolkata") => {
  try {
    checkAuthHeaders();

    const finalUrl = `/comment/list/${supportId}?time_zone=${encodeURIComponent(timeZone)}`;

    console.log("SupportTicketsService → Fetching comments:", finalUrl);

    const response = await axios.get(finalUrl);

    console.log("SupportTicketsService → Comments Response:", response.data);

    return { success: true, data: response.data.data, error: null };
  } catch (error) {
    console.error("SupportTicketsService → Error fetching comments:", error);

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
