// Import Dependencies
import { useEffect, useReducer } from "react";
import isObject from "lodash/isObject";
import PropTypes from "prop-types";
import isString from "lodash/isString";
import { JWT_HOST_TEST_API } from "configs/auth.config";
// Local Imports
import axios, { setInitializing } from "utils/axios";
import {
  isTokenValid,
  setSession,
  setUserData,
  getUserData,
  clearSession,
} from "utils/jwt";
// import { sanitizeUserData } from "utils/userData";
import {
  setLogoutCallback,
  setRedirectCallback,
  clearCallbacks,
} from "utils/authManager";
import { AuthContextProvider } from "./context";

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,
  errorMessage: null,
  user: null,
};

const reducerHandlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },

  LOGIN_REQUEST: (state) => {
    return {
      ...state,
      isLoading: true,
      errorMessage: null,
    };
  },
  
  LOGIN_SUCCESS: (state, action) => {
    const { user } = action.payload;
    return {
      ...state,
      isAuthenticated: true,
      isInitialized: true,
      isLoading: false,
      user,
      errorMessage: null,
    };
  },

  LOGIN_ERROR: (state, action) => {
    const { errorMessage } = action.payload;

    return {
      ...state,
      errorMessage,
      isLoading: false,
    };
  },

  SET_ERROR_MESSAGE: (state, action) => {
    const { errorMessage } = action.payload;
    return {
      ...state,
      errorMessage,
    };
  },

  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    isInitialized: true,
    user: null,
  }),
};

const reducer = (state, action) => {
  const handler = reducerHandlers[action.type];
  if (handler) {
    return handler(state, action);
  }
  return state;
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Register logout and redirect callbacks with auth manager
  useEffect(() => {
    setLogoutCallback(() => {
      dispatch({ type: "LOGOUT" });
    });

    setRedirectCallback((path) => {
      // This will be handled by the router
      if (typeof window !== "undefined") {
        window.location.href = path;
      }
    });

    // Cleanup callbacks on unmount
    return () => {
      clearCallbacks();
    };
  }, []);

  useEffect(() => {
    const init = async () => {
      try {
        console.log("🔐 Starting auth initialization...");
        setInitializing(true); // Prevent 401 handling during initialization

        const authToken = window.localStorage.getItem("authToken");
        const storedUserData = getUserData();

        console.log("🔐 Token exists:", !!authToken);
        console.log("🔐 Stored user data exists:", !!storedUserData);

        if (authToken) {
          console.log("🔐 Token valid:", isTokenValid(authToken));
        }

        if (authToken && isTokenValid(authToken)) {
          console.log("🔐 Valid token found, setting session...");
          setSession(authToken);

          // If we have stored user data, use it immediately for faster initialization
          if (storedUserData) {
            console.log(
              "🔐 Using stored user data for immediate initialization",
            );
            dispatch({
              type: "INITIALIZE",
              payload: {
                isAuthenticated: true,
                user: storedUserData,
              },
            });

            // Fetch fresh user data in the background (don't block initialization)
            setTimeout(async () => {
              try {
                console.log("🔐 Fetching fresh user data in background...");
                const response = await axios.get("/user/profile");
                const { user } = response.data;

                // Sanitize and store fresh user data
                // const sanitizedUserData = sanitizeUserData(user);
                setUserData(user);

                console.log("🔐 Fresh user data fetched successfully");
                dispatch({
                  type: "INITIALIZE",
                  payload: {
                    isAuthenticated: true,
                    user: user,
                  },
                });
              } catch (err) {
                console.warn("🔐 Failed to fetch fresh user data:", err);
                // Keep using stored data if fresh fetch fails
              }
            }, 100);
          } else {
            // No stored data, must fetch from API
            console.log("🔐 No stored user data, fetching from API...");
            const response = await axios.get("/user/profile");
            const { user } = response.data;

            // const sanitizedUserData = sanitizeUserData(user);
            setUserData(user);

            console.log("🔐 User data fetched from API successfully");
            dispatch({
              type: "INITIALIZE",
              payload: {
                isAuthenticated: true,
                user: user,
              },
            });
          }
        } else if (authToken) {
          // DEBUG: Temporarily bypass token validation for testing
          console.log(
            "🔐 DEBUG: Token validation failed, but bypassing for testing...",
          );
          setSession(authToken);

          if (storedUserData) {
            console.log(
              "🔐 Using stored user data despite invalid token (DEBUG)",
            );
            dispatch({
              type: "INITIALIZE",
              payload: {
                isAuthenticated: true,
                user: storedUserData,
              },
            });
          } else {
            console.log("🔐 No stored data, cannot bypass token validation");
            clearSession();
            dispatch({
              type: "INITIALIZE",
              payload: {
                isAuthenticated: false,
                user: null,
              },
            });
          }
        } else {
          // Clear any invalid data
          console.log("🔐 No valid token found, clearing session...");
          clearSession();

          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error("🔐 Auth initialization error:", err);
        clearSession();

        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      } finally {
        setInitializing(false); // Re-enable 401 handling after initialization
      }
    };

    init();
  }, []);
  // const getDeviceType = () => {
  //   const width = window.innerWidth;
  //   if (width <= 480) {
  //     return "Mobile";
  //   } else if (width > 480 && width <= 1024) {
  //     return "Tablet";
  //   } else {
  //     return "Desktop";
  //   }
  // };
  const login = async ({ email, password }) => {
    // localStorage.setItem("device_type", getDeviceType());
    dispatch({
      type: "LOGIN_REQUEST",
    });

    try {
      const response = await axios.post(
        `${JWT_HOST_TEST_API}/auth/login`,
        {
          email,
          password,
        },
      );

      const { auth_token, data, status } = response.data;
      console.log(status);

      if (status !== 200 || !isString(auth_token) || !isObject(data)) {
        throw new Error(
          response.data.message || "Invalid response from server",
        );
      }

      // Sanitize and store user data
      // const sanitizedUserData = sanitizeUserData(data);

      // Store token and sanitized user data
      setSession(auth_token);
      setUserData(data);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: data,
        },
      });
    } catch (err) {
      let errorMessage = "An error occurred during login";

      if (err.response) {
        // Server responded with error status
        const { data, status } = err.response;
        if (data && data.message) {
          errorMessage = data.message;
        } else if (status === 401) {
          errorMessage = "Invalid email or password";
        } else if (status === 400) {
          errorMessage = "Please check your email and password";
        } else if (status >= 500) {
          errorMessage = "Server error. Please try again later";
        }
      } else if (err.request) {
        // Network error
        errorMessage = "Network error. Please check your connection";
      } else if (err.message) {
        // Other errors
        errorMessage = err.message;
      }

      dispatch({
        type: "LOGIN_ERROR",
        payload: {
          errorMessage: { message: errorMessage },
        },
      });
    }
  };
  const loginWithToken = async ({ token }) => {
    // localStorage.setItem("device_type", getDeviceType());
    dispatch({
      type: "LOGIN_REQUEST",
    });

    try {
      const response = await axios.post(
        "/auth/validate_token",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const {  data, status } = response.data;
      console.log(status);

      if (status !== 200 || !isString(token) || !isObject(data)) {
        throw new Error(
          response.data.message || "Invalid response from server",
        );
      }

      // Sanitize and store user data
      // const sanitizedUserData = sanitizeUserData(data);

      // Store token and sanitized user data
      setSession(token);
      setUserData(data);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: data,
        },
      });
    } catch (err) {
      let errorMessage = "An error occurred during login";

      if (err.response) {
        // Server responded with error status
        const { data, status } = err.response;
        if (data && data.message) {
          errorMessage = data.message;
        } else if (status === 401) {
          errorMessage = "Invalid email or password";
        } else if (status === 400) {
          errorMessage = "Please check your email and password";
        } else if (status >= 500) {
          errorMessage = "Server error. Please try again later";
        }
      } else if (err.request) {
        // Network error
        errorMessage = "Network error. Please check your connection";
      } else if (err.message) {
        // Other errors
        errorMessage = err.message;
      }

      dispatch({
        type: "LOGIN_ERROR",
        payload: {
          errorMessage: { message: errorMessage },
        },
      });
    }
  };
  const logout = async () => {
    try {
      // Call logout API to invalidate token on server
      await axios.get("/auth/logout");
    } catch (err) {
      // Log error but don't prevent logout from completing
      console.warn("Logout API call failed:", err);
    } finally {
      // Always clear local session regardless of API call result
      clearSession();
      dispatch({ type: "LOGOUT" });
    }
  };

  const setErrorMessage = (message) => {
    dispatch({
      type: "SET_ERROR_MESSAGE",
      payload: {
        errorMessage: { message },
      },
    });
  };

  if (!children) {
    return null;
  }

  return (
    <AuthContextProvider
      value={{
        ...state,
        login,
        loginWithToken,
        logout,
        setErrorMessage,
      }}
    >
      {children}
    </AuthContextProvider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
