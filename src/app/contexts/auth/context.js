import { createSafeContext } from "utils/createSafeContext";

export const [AuthContextProvider, useAuthContext] = createSafeContext(
    "useAuthContext must be used within AuthProvider"
);

// For backward compatibility
export const AuthContext = AuthContextProvider;
