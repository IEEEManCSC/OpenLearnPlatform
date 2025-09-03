import React from "react";
import Cookies from "js-cookie";
import { Navigate, useLocation } from "react-router-dom";
interface AuthenticatorProps {
  children: React.ReactNode;
}

const Authenticator: React.FC<AuthenticatorProps> = ({ children }) => {
  const location = useLocation();
  const token = Cookies.get("token");
  const currentPath = location.pathname;
  const isOnAuthPage = currentPath.startsWith("/login");

  if (token) {
    // If user is authenticated and tries to access auth pages, redirect to home
    if (isOnAuthPage) {
      return <Navigate to="/" replace />;
    }
  } else {
    // If not authenticated and NOT on auth page, redirect to landing/login
    if (!isOnAuthPage) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  }

  return <>{children}</>;
};

export default Authenticator;
