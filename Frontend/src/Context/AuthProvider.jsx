import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const getRefreshToken = async () => {
      try {
        const res = await axios.post(
          "http://localhost:3000/api/v1/user/refresh",
          {},
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          setAccessToken(res.data.accessToken);
          setRole(res.data.user.role);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
        } else {
          console.error("Error during refresh token check:", error);
        }
      }
    };

    getRefreshToken();
  }, []);

  const login = async (userData) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/login",
        userData,
        { withCredentials: true }
      );
      console.log(res.data);

      if (res.data.success) {
        setAccessToken(res.data.accessToken);
        setUserId(res.data.id);
        setRole(res.data.user.role);
        alert(res.data.message);
        return true;
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = async () => {
    if (!accessToken) return;
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setAccessToken(null);
        setRole(null);
        alert(res.data.message);
        return true;
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div>
      <AuthContext.Provider
        value={{ userId, accessToken, role, login, logout }}
      >
        {children}
      </AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;
