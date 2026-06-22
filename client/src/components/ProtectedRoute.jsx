import React from "react";
import { Navigate } from "react-router-dom";
import Loader from "./Loader";

const ProtectedRoute = ({
  children,
  user,
  loading,
  requiredRole,
}) => {
  if (loading) {
    return (
      <Loader
        fullScreen
        text="Authenticating User"
      />
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (
    requiredRole &&
    user.role !== requiredRole
  ) {
    return (
      <Navigate
        to="/unauthorized"
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;
