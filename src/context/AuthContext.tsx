import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  loading: true,
});

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      try {
        console.log("Verifying session");
        const response = await fetch(`${API_BASE_URL}/auth/check-auth`, {
          method: "GET",
          credentials: "include", // Ensures cookies are sent with the request
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          console.error("Failed to verify session, response not ok");
          setIsAuthenticated(false);
          return;
        }

        const data = await response.json();
        setIsAuthenticated(data.isAuthenticated);
      } catch (error) {
        console.error("Session verification failed", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
