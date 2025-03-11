import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Layout from "./Layout";

const ProtectedLayout = () => {
  const { auth } = useAuth();
  if (!auth.token) {
    return <Navigate to="/login" replace />;
  }
  return <Layout />;
};

export default ProtectedLayout;
