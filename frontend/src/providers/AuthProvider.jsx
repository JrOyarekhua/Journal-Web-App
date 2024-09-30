import axios from "axios";
import { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // initialize state in order to store the access and refresh token

  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken") || ""
  );
  const [errorMessage, setErrorMessage] = useState("");

  const[user_id,setUserId] = useState(null)
  const navigate = useNavigate();

  let isRefreshing = false;
  let refreshQueue = [];

  // function to add the original request to the queue
  const addRequestToQueue = (callback) => {
    return new Promise((resolve, reject) => {
      refreshQueue.push((newToken) => {
        callback(newToken).then(resolve).catch(reject);
      });
    });
  };

  // Function to run queued requests after refresh
  const processQueue = (newToken) => {
    refreshQueue.forEach((callback) => callback(newToken));
    refreshQueue = [];
  };

  //   handle login
  const login = async (data) => {
    try {
      const result = await axios.post(
        "http://localhost:8080/api/users/auth",
        {
          email: data.email,
          password: data.password,
        },
        { withCredentials: true }
      );
      localStorage.setItem("accessToken", result.data.accessToken);
      console.log(result.data)
      setUserId(result.data.user_id)
      console.log("user id stored")
      console.log("cookies and access token set");
      return;
    } catch (error) {
      setErrorMessage(
        error.response.data.message ||
          "login failed. Please check your credentials and try again"
      );
      throw error;
    }
  };

  // handle refresh token

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/users/logout",
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error);
    }
    setAccessToken(null);
    localStorage.removeItem("accessToken");
    navigate("/auth"); // Redirect to login page
  };

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (originalRequest.url.includes("/refresh-token")) {
          console.log("Error with the refresh token");
          await logout();
          return Promise.reject(error);
        }

        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          console.log("Retry property attached, retrying request...");

          if (isRefreshing) {
            return addRequestToQueue((newToken) => {
              originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
              return axios(originalRequest);
            });
          }

          isRefreshing = true;
          try {
            const res = await axios.post(
              "http://localhost:8080/api/users/refresh-token",{},
              {withCredentials: true,
                headers: `Bearer ${localStorage.getItem("accessToken")}`
              }
            );
            console.log("first response: " + res)
            const newAccessToken = res.accessToken;
            localStorage.setItem("accessToken", newAccessToken);
            setAccessToken(newAccessToken);

            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;
            processQueue(newAccessToken);

            return axios(originalRequest);
          } catch (refreshError) {
            console.log("refresh error" + refreshError)
            console.log("Failed to refresh token, logging out...");
            await logout();
            return Promise.reject(refreshError);
          } finally {
            isRefreshing = false;
          }
        } else {
          return Promise.reject(error);
        }
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  
  return (
    <AuthContext.Provider value={{ accessToken, login, logout, errorMessage, user_id }}>
      {children}
    </AuthContext.Provider>
  );
};


