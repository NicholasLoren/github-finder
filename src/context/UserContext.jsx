import { createContext } from "react";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    
  return <UserContext.Provider values={}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
