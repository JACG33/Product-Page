import { useState, useEffect, useContext, createContext } from "react";
import { API_URL } from "../../config/appConstans";

const AppContext = createContext({
  stateUser: false,
  setStateUser: () => {},
  setToken: () => {},
  getToken: () => {},
  userInfo: {},
  setUserInfo: () => {},
  logut: () => {},
});

export function AppProvider({ children }) {
  const [stateUser, setStateUser] = useState(false);
  const [token, setToken] = useState();
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    let verify = JSON.parse(localStorage.getItem("auth"));
    if (verify && verify.message == "Logeado") {
      setStateUser(true);
      setUserInfo(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  const getToken = () => {
    return token;
  };

  const logut = () => {
    setStateUser(false);
    setToken(null);
    setUserInfo({});
    window.localStorage.clear();
  };

  return (
    <AppContext.Provider
      value={{
        stateUser,
        setStateUser,
        getToken,
        setToken,
        userInfo,
        setUserInfo,
        logut,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppProvider = () => useContext(AppContext);
