import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../../main";


const ProtectedRoute = ({ children }) => {
  const { isAuthorized, loading } = useContext(Context);

  
  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  
  if (!isAuthorized) {
    return <Navigate to="/login" replace />;
  }

  
  return children;
};

export default ProtectedRoute;
