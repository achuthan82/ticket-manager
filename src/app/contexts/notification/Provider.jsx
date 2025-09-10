import { useState } from "react";
import { NotificationContextProvider } from "./context";
import PropTypes from "prop-types";

export function NotificationProvider({ children }) {
  const [callApi, setCallApi] = useState(false);
  const value = {
    callApi,
    setCallApi,
  };
  return (
  <NotificationContextProvider value={value}>
        {children}
  </NotificationContextProvider>
  )
}
NotificationProvider.propTypes = {
  children: PropTypes.node,
};