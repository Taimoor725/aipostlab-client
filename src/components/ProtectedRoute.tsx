// components/ProtectedRoute.tsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "./utils/LoadingSpinner/LoadingSpinner";
//import { useAuth } from "../context/AuthContext";

/*
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // Loading state while auth status is being checked

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;*/

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if the user is authenticated
    const checkAuth = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/check-auth`, {
          method: "GET",
          credentials: "include", // Send the cookie with the request
        });

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Auth check failed", error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    // Show a loading indicator while checking auth
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;
