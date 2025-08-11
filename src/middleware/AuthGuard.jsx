// Import Dependencies
import { Navigate, useLocation, useOutlet } from "react-router";

// Local Imports
import { useAuthContext } from "app/contexts/auth/context";
import { GHOST_ENTRY_PATH, REDIRECT_URL_KEY } from "../constants/app.constant";

// ----------------------------------------------------------------------

export default function AuthGuard() {
  const outlet = useOutlet();
  const { isAuthenticated, isInitialized } = useAuthContext();

  const location = useLocation();

  // Debug logging
  console.log("🔐 AuthGuard Debug:", {
    isAuthenticated,
    isInitialized,
    currentPath: location.pathname,
    hasToken: !!localStorage.getItem('authToken'),
    hasUserData: !!localStorage.getItem('userData')
  });

  // Wait for auth to initialize before making any decisions
  if (!isInitialized) {
    // Show loading spinner while initializing
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log("🔐 AuthGuard: Redirecting to login");
    return (
      <Navigate
        to={`${GHOST_ENTRY_PATH}?${REDIRECT_URL_KEY}=${location.pathname}`}
        replace
      />
    );
  }

  console.log("🔐 AuthGuard: User authenticated, rendering outlet");
  return <>{outlet}</>;
}
