// Import Dependencies
import { Navigate, useOutlet } from "react-router";

// Local Imports
import { useAuthContext } from "app/contexts/auth/context";
import { HOME_PATH, REDIRECT_URL_KEY } from "constants/app.constant";

// ----------------------------------------------------------------------


export default function GhostGuard() {
  const outlet = useOutlet();
  const { isAuthenticated, isInitialized } = useAuthContext();

  const url = `${new URLSearchParams(window.location.search).get(
    REDIRECT_URL_KEY,
  )}`;

  // Wait for auth to initialize before making any decisions
  if (!isInitialized) {
    // Show loading spinner while initializing
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    if (url && url !== "") {
      return <Navigate to={url} />;
    }
    return <Navigate to={HOME_PATH} />;
  }

  return <>{outlet}</>;
}
