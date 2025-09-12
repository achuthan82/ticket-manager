// Import Dependencies
import { Navigate } from "react-router";

// Local Imports
import MainLayoutProvider from "app/layouts/MainLayout/MainLayoutProvider";
import AuthGuard from "middleware/AuthGuard";
import { useAuthContext } from "app/contexts/auth/context";

// ----------------------------------------------------------------------
const RoleRedirect = () => {
  const { user } = useAuthContext();
  return <Navigate to={user?.role_id === 1 ? "/support-ticket" : "/support-user"} replace />;
};
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
          element: <RoleRedirect/>,
        },

        {
          path: "home",
          lazy: async () => ({
            Component: (await import("app/pages/dashboards/Dashboard")).default,
          }),
        },
        {
          path: "notifications",
          lazy: async () => ({
            Component: (await import("app/pages/notifications/NotificationList"))
              .default,
          }),
        },
        {
          path: "support-ticket",
          lazy: async () => ({
            Component: (await import("app/pages/support-ticket/SupportTicket"))
              .default,
          }),
        },
        {
          path: "support-user",
          lazy: async () => ({
            Component: (await import("app/pages/support-user/SupportUser"))
              .default,
          }),
        },
        {
          path: "support-user/:ticketId",
          lazy: async () => ({
            Component: (await import("app/pages/support-user/TicketChat"))
              .default,
          }),
        },
        {
          path: "users",
          lazy: async () => ({
            Component: (await import("app/pages/users/UserList")).default,
          }),
        },
           // ✅ New FAQ Route
        {
          path: "faq",
          lazy: async () => ({
            Component: (await import("app/pages/FAQ/FAQPage")).default,
          }),
        },
        {
          path: "*",
          element: <RoleRedirect/>,
        },
      ],
    },
  ],
};

export { protectedRoutes };
