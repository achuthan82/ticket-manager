import { createSafeContext } from "utils/createSafeContext";

export const [NotificationContextProvider, useNotificationContext] = createSafeContext(
    "useNotificationContext must be used within NotificationProvider"
);

// For backward compatibility
export const NotificationContext = NotificationContextProvider;
