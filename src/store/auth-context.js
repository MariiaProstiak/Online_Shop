import React, { useState, useEffect, useCallback, useContext } from "react";

let logoutTimer;
export const currentAdminAddress = "admin@admin.ad";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  isAdmin: false,
  userNick: "",
  currentUser: "",
  setIsAdmin: () => {},
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;
  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedAdmin = localStorage.getItem("admin");
  const storedNick = localStorage.getItem("nick");
  const storedUser = localStorage.getItem("userId");
  const storedExpirationDate = localStorage.getItem("expirationTime");

  const remainingTime = calculateRemainingTime(storedExpirationDate);
  if (remainingTime <= 6000) {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    localStorage.removeItem("nick");
    localStorage.removeItem("userId");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("isDesc");
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
    admin: storedAdmin,
    user: storedUser,
    nick: storedNick,
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  let initialToken;
  let initialUser;
  let initialUserNick;
  let initialAdmin = false;
  if (tokenData) {
    initialToken = tokenData.token;
    initialAdmin = tokenData.admin;
    initialUser = tokenData.user;
    initialUserNick = tokenData.nick;
  }

  const [token, setToken] = useState(initialToken);
  const [admin, setAdmin] = useState(initialAdmin);
  const [user, setUser] = useState(initialUser);
  const [userNick, setUserNick] = useState(initialUserNick);

  const setIsAdmin = () => {
    localStorage.setItem("admin", true);
    setAdmin(true);
  };
  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    setAdmin(false);
    localStorage.removeItem("admin");
    localStorage.removeItem("nick");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("isDesc");
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token, expirationTime, userId, userNick) => {
    setToken(token);
    setUser(userId);
    setUserNick(userNick);
    localStorage.setItem("nick", userNick);
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("expirationTime", expirationTime);

    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    isAdmin: admin,
    currentUser: user,
    userNick,
    setIsAdmin,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
