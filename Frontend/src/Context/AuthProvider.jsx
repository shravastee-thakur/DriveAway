import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

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
        alert(res.data.message);
        return true;
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div>
      <AuthContext.Provider value={{ userId, accessToken, login }}>
        {children}
      </AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;
