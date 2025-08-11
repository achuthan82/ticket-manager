// Import Dependencies
import { Navigate } from "react-router";

// Local Imports
import MainLayoutProvider from "app/layouts/MainLayout/MainLayoutProvider";
import AuthGuard from "middleware/AuthGuard";

// ----------------------------------------------------------------------

const protectedRoutes = {
  id: "protected",
  Component: AuthGuard,
  children: [
    // The main layout with context providers
    {
      Component: MainLayoutProvider,
      children: [
        {
          index: true,
          element: <Navigate to="/dashboard" />,
        },
    
        {
          path: "dashboard",
          lazy: async () => ({
            Component: (await import("app/pages/dashboards/Dashboard")).default,
          }),
        },
      ],
    },

  ],
};

export { protectedRoutes };
