import { createContext, useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const authContext = createContext();
function AuthProvider({ children }) {
  const { data: currDoctor, setData: setCurrDoctor } = useLocalStorage();
  const [isAuthenticated, setAuthenticated] = useState(false);

  function loginDoctorFunc(doctorData) {
    setAuthenticated(true);
    setCurrDoctor(doctorData);
  }

  function logoutDoctorFunc() {
    setCurrDoctor();
    setAuthenticated(false);
  }

  return (
    <authContext.Provider
      value={{
        currDoctor,
        loginDoctorFunc,
        logoutDoctorFunc,
        setAuthenticated,
        isAuthenticated,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

export function useAuthContext() {
  const x = useContext(authContext);
  if (!x) {
    throw new Error("Attempt to access context from out of scope");
  }
  return x;
}

export default AuthProvider;
