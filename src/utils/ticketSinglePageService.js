import axios from "./axios";
import { checkAuthHeaders } from "./authDebug";

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
export const getTicketInfo = (ticketId) => {
  checkAuthHeaders();
  return axios
    .get(`/support/${ticketId}?time_zone=${timezone}`)
    .then((response) => {
      return { success: true, data: response.data, error: null };
    })
    .catch((error) => {
      console.error("Error fetching ticket info:", error);
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
    });
};
export const getComments = (ticketId) => {
  checkAuthHeaders();
  return axios
    .get(`/comment/list/${ticketId}?time_zone=${timezone}`)
    .then((response) => {
      return { success: true, data: response.data, error: null };
    })
    .catch((error) => {
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
    });
};
export const closeTicket = (ticketId) => {
  checkAuthHeaders();
  return axios
    .patch(`/support/edit/${ticketId}`, { status: 5 })
    .then((response) => {
      return { success: true, data: response.data, error: null };
    })
    .catch((error) => {
      console.error("Error fetching ticket info:", error);
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
    });
};
export const addComment = (ticketId, message) => {
  checkAuthHeaders();
  return axios
    .post(`/comment/add/${ticketId}`, {
      attachment: false,
      message: message,
      send_notification: true,
    })
    .then((response) => {
      return { success: true, data: response.data, error: null };
    })
    .catch((error) => {
      console.error("Error fetching ticket info:", error);
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
    });
};

// Upload Documents.
export const uploadSupportDocument = async (supportId, file) => {
  try {
    checkAuthHeaders();

    // Prepare form data
    const formData = new FormData();
    formData.append("file", file); // The API key for the file might be 'document', confirm with backend

    const response = await axios.post(
      `/support/upload/documents/${supportId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return { success: true, data: response.data, error: null };
  } catch (error) {
    console.error("Error uploading document:", error);
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
