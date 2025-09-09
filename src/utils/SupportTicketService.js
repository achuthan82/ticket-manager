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


/**
 * Get list of support ticket assignees
 * @returns {Promise<Object>} - Success or error response
 */
export const getSupportTicketAssignees = async () => {
  try {
    checkAuthHeaders();

    const finalUrl = `/support/list-assignee`;

    console.log("SupportTicketsService → Fetching assignees:", finalUrl);

    const response = await axios.get(finalUrl);

    console.log(
      "SupportTicketsService → Assignees Response:",
      response.status,
      response.data
    );

    return { success: true, data: response.data, error: null };
  } catch (error) {
    console.error("SupportTicketsService → Error fetching assignees:", error);

    if (error.response) {
      return {
        success: false,
        data: null,
        error:
          error.response.data?.message ||
          `HTTP ${error.response.status} error`,
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
 * Delete a comment by ID
 * @param {number|string} commentId - ID of the comment to delete
 * @returns {Promise<Object>} - Success or error response
 */
export const deleteComment = async (commentId) => {
  try {
    checkAuthHeaders();

    const finalUrl = `/comment/delete/${commentId}`;

    console.log("SupportTicketsService → Deleting comment:", finalUrl);

    const response = await axios.delete(finalUrl);

    console.log(
      "SupportTicketsService → Delete Comment Response:",
      response.status,
      response.data
    );

    return { success: true, data: response.data, error: null };
  } catch (error) {
    console.error("SupportTicketsService → Error deleting comment:", error);

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
 * Edit a comment
 * @param {string|number} commentId - ID of the comment to edit
 * @param {string} message - Updated comment message
 * @returns {Promise<Object>} - Success or error response
 */
export const editComment = async (commentId, message) => {
  try {
    checkAuthHeaders();

    const finalUrl = `/comment/edit/${commentId}`;
    const body = { message };

    console.log("SupportTicketsService → Editing comment:", finalUrl, body);

    const response = await axios.patch(finalUrl, body);

    console.log("SupportTicketsService → Edit Comment Response:", response.status, response.data);

    return { success: true, data: response.data, error: null };
  } catch (error) {
    console.error("SupportTicketsService → Error editing comment:", error);

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


/**
 * Upload a document to a support ticket
 * @param {number} supportId - ID of the support ticket
 * @param {File} file - File object to upload
 * @returns {Promise<Object>} - Success or error response
 */
export const uploadSupportDocument = async (supportId, file) => {
  try {
    checkAuthHeaders();

    const finalUrl = `/support/upload/documents/${supportId}`;
    const formData = new FormData();
    formData.append("file", file); // ✅ backend expects "file"

    console.log("SupportTicketsService → Uploading document:", finalUrl, file);

    const response = await axios.post(finalUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(
      "SupportTicketsService → Upload Document Response:",
      response.status,
      response.data,
    );

    return { success: true, data: response.data, error: null };
  } catch (error) {
    console.error("SupportTicketsService → Error uploading document:", error);

    if (error.response) {
      return {
        success: false,
        data: null,
        error:
          error.response.data?.message ||
          `HTTP ${error.response.status} error`,
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
 * Get list of documents for a support ticket
 * @param {number} supportId - ID of the support ticket
 * @returns {Promise<Object>} - Success or error response
 */
export const getSupportDocuments = async (supportId) => {
  try {
    checkAuthHeaders();

    const finalUrl = `/support/list/documents/${supportId}`;

    console.log("SupportTicketsService → Fetching documents:", finalUrl);

    const response = await axios.get(finalUrl);

    console.log(
      "SupportTicketsService → Documents Response:",
      response.status,
      response.data
    );

    return { success: true, data: response.data, error: null };
  } catch (error) {
    console.error(
      "SupportTicketsService → Error fetching documents:",
      error
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
