import axios from './axios';
import { checkAuthHeaders } from './authDebug';

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
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
    .patch(`/support/edit/${ticketId}`, {status:5})
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