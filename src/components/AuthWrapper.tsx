import React from "react";
import { Navigate, Outlet } from "react-router-dom";
interface AuthWrapperProps {
  isAuthenticated: () => boolean;
}
const AuthWrapper = ({ isAuthenticated }: AuthWrapperProps) => {
  return isAuthenticated() ? <Navigate to="/todo" replace /> : <Outlet />;
};

export default AuthWrapper;
