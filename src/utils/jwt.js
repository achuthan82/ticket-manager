import { jwtDecode } from "jwt-decode";

/**
 * Checks if the provided JWT token is valid (not expired).
 *
 * @param {string} authToken - The JWT token to validate.
 * @returns {boolean} - Returns `true` if the token is valid, otherwise `false`.
 */
const isTokenValid = (authToken) => {
  if (typeof authToken !== "string") {
    console.error("🔐 Invalid token format.");
    return false;
  }

  try {
    const decoded = jwtDecode(authToken);
    const currentTime = Date.now() / 1000; // Current time in seconds since epoch

    console.log("🔐 Token validation:", {
      tokenLength: authToken.length,
      decodedExp: decoded.exp,
      currentTime: currentTime,
      isExpired: decoded.exp <= currentTime,
      timeUntilExpiry: decoded.exp - currentTime
    });

    return decoded.exp > currentTime;
  } catch (err) {
    console.error("🔐 Failed to decode token:", err);
    return false;
  }
};

/**
 * Sets or removes the authentication token in local storage.
 * Authorization headers are handled automatically by axios interceptor.
 *
 * @param {string} [authToken] - The JWT token to set. If `undefined` or `null`, the session will be cleared.
 */
const setSession = (authToken) => {
  if (typeof authToken === "string" && authToken.trim() !== "") {
    // Store token in local storage
    localStorage.setItem("authToken", authToken);
  } else {
    // Remove token from local storage
    localStorage.removeItem("authToken");
  }
};

/**
 * Stores user data in localStorage for persistence across sessions.
 *
 * @param {Object} userData - The user data object to store.
 */
const setUserData = (userData) => {
  if (userData && typeof userData === "object") {
    localStorage.setItem("userData", JSON.stringify(userData));
  } else {
    localStorage.removeItem("userData");
  }
};

/**
 * Retrieves user data from localStorage.
 *
 * @returns {Object|null} - The stored user data or null if not found.
 */
const getUserData = () => {
  try {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
  } catch (err) {
    console.error("Failed to parse user data from localStorage:", err);
    return null;
  }
};

/**
 * Clears all authentication data from localStorage.
 */
const clearSession = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("userData");
};

export { isTokenValid, setSession, setUserData, getUserData, clearSession };
