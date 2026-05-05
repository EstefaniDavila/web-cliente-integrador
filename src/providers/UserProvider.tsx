import React, { createContext, useEffect, useState, useContext, useRef, useMemo, ReactNode } from 'react';
import axios from "axios";
import { jwtDecode } from 'jwt-decode';

const backend_host = import.meta.env.VITE_BACKEND_HOST;

type UserContextType = {
  user: any;
  authTokens: any;
  loginUser: (credentials: any) => Promise<void>;
  logoutUser: () => Promise<void>;
  setAuthTokens: (tokens: any) => void;
  setUser: (user: any) => void;
};

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);

  const [authTokens, setAuthTokens] = useState(() => 
    localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens') as string) : null
  );
  
  const [user, setUser] = useState(() => 
    localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null
  );
  
  const authTokensRef = useRef(authTokens);
  const userRef = useRef(user);

  const loginUser = async (credentials: any) => {
    try {
      const response = await axios.post(
        `${backend_host}/api/v1/general/users/sign_in`,
        {
          authentication: {
            email: credentials.email || undefined,
            document_number: credentials.document_number || undefined,
            password: credentials.password,
          }
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        const accessToken = data.access_token;
        const refreshToken = data.refresh_token;
        const expireAt = data.expire_at;
        const userObj = data.user;
        const message = data.message;

        if (accessToken && refreshToken && expireAt && userObj) {
          const tokens = {
            access_token: accessToken,
            refresh_token: refreshToken,
            expire_at: expireAt,
            message: message,
            user: userObj
          };

          setAuthTokens(tokens);
          authTokensRef.current = tokens;
          
          setUser(userObj);
          userRef.current = userObj;

          localStorage.setItem('authTokens', JSON.stringify(tokens));
          localStorage.setItem('user', JSON.stringify(userObj));
          window.location.href = '/';

        } else {
          console.error('Tokens are missing in the response data');
        }
      } else {
        alert('Something went wrong | incorrect credentials');
      }
    } catch (error: any) {
      console.error('Error en loginUser:', error.response ? error.response.data : error.message);
      alert(error.response?.data?.message || 'Something went wrong | Please try again later');
    }
  };

  const logoutUser = async () => {
    alert("Tu sesión ha sido cerrada con éxito.");
    
    try {
      if (authTokensRef.current) {
        await axios.delete(
          `${backend_host}/api/v1/general/users/sign_out`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: "Bearer " + authTokensRef.current.access_token,
            },
          }
        );
      }
    } catch (error: any) {
      console.error('Error en logoutUser:', error.response ? error.response.data : error.message);
    } finally {
      authTokensRef.current = null;
      userRef.current = null;
      localStorage.removeItem('authTokens');
      localStorage.removeItem('user');
      setAuthTokens(null);
      setUser(null);
      window.location.href = '/login'; // Ajusta la ruta de login según tu proyecto
    }
  };

  const updateToken = async () => {
    try {
      const response = await axios.post(
        `${backend_host}/api/v1/general/users/tokens`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            'Refresh-Token': authTokensRef.current?.refresh_token,
            Authorization: "Bearer " + authTokensRef.current?.access_token,
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        const accessToken = data.access_token;
        const refreshToken = data.refresh_token;
        const expireAt = data.expire_at;

        if (accessToken && refreshToken && expireAt) {
          const tokens = {
            access_token: accessToken,
            refresh_token: refreshToken,
            expire_at: expireAt,
          };

          authTokensRef.current = tokens;
          userRef.current = jwtDecode(accessToken);

          localStorage.setItem('authTokens', JSON.stringify(tokens));
          localStorage.setItem('user', JSON.stringify(data.user));

        } else {
          console.error('Tokens are missing in the response data');
          logoutUser();
        }
      } else {
        console.error('Failed to update token, status:', response.status);
        logoutUser();
      }
      if (loading) {
        setLoading(false);
      }
    } catch (error: any) {
      console.error('Error en updateToken:', error.response ? error.response.data : error.message);
      logoutUser();
    } 
  };

  useEffect(() => {
    const axiosInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          logoutUser();
        }
        return Promise.reject(error);
      }
    );

    return () => axios.interceptors.response.eject(axiosInterceptor);
  }, []);

  useEffect(() => {
    const axiosInterceptor = axios.interceptors.request.use(
      (config) => {
        const token = authTokensRef.current?.access_token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    return () => axios.interceptors.request.eject(axiosInterceptor);
  }, []);

  useEffect(() => {
    if (authTokensRef.current) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + authTokensRef.current?.access_token;
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("authTokens");
    }
  }, [authTokensRef.current]);

  useEffect(() => {
    authTokensRef.current = authTokens;
    userRef.current = user;
  }, [authTokens, user]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const expireAtRefInSeconds = parseInt(authTokensRef.current?.expire_at) || 0;
      const expireAtInMillis = expireAtRefInSeconds * 1000;
      const currentTime = new Date().getTime();
      const fiveMinutesInMillis = 5 * 60 * 1000;
      const rest = expireAtInMillis - currentTime;
      if (rest <= fiveMinutesInMillis && authTokens) {
        updateToken();
      }
    }, 60000);
    return () => clearInterval(intervalId);
  }, [authTokensRef.current]);

  const contextData = useMemo(() => ({
    user: userRef.current,
    authTokens: authTokensRef.current,
    loginUser,
    logoutUser,
    setAuthTokens, 
    setUser, 
  }), [authTokensRef.current, userRef.current]);

  return (
    <UserContext.Provider value={contextData}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useAuth must be used within a UserProvider');
  }
  return context;
};

export default UserContext;
