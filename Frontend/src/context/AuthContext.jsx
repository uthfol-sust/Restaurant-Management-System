import React, { createContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (token) {
      try {
        const decoded = jwtDecode(token);

        const expMs = (decoded.exp || decoded.ExpiresAt || 0) * 1000;

        if (expMs > Date.now()) {
          if (savedUser) {
            try {
              setUser(JSON.parse(savedUser));
            } catch (err) {
              setUser({
                id: decoded.ID || decoded.id,
                name: decoded.Name || decoded.name,
                role: decoded.Role || decoded.role,
                token,
              });
            }
          } else {
            setUser({
              id: decoded.ID || decoded.id,
              name: decoded.Name || decoded.name,
              role: decoded.Role || decoded.role,
              token,
            });
            try {
              localStorage.setItem(
                "user",
                JSON.stringify({
                  id: decoded.ID || decoded.id,
                  name: decoded.Name || decoded.name,
                  role: decoded.Role || decoded.role,
                  token,
                })
              );
            } catch (err) {
              console.error("Failed to save user to localStorage", err);
            }
          }
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setUser(null);
        }
      } catch (err) {
        console.error("Invalid token", err);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
      }
    }

    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    try {
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (e) {}
    if (userData.token) {
      localStorage.setItem("token", userData.token);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

