import { createContext, useReducer } from "react";
import GithubReducer from "./GithubReducers";

const GithubContext = createContext();
const url = process.env.REACT_APP_GITHUB_URL;
const token = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubContextProvider = ({ children }) => {
  const initialState = {
    users: [],
    isLoading: false,
  };
  const [state, dispatch] = useReducer(GithubReducer, initialState);

  const fetchUsers = async () => {
    setLoading();
    const response = await fetch(`${url}/users`, {
      headers: {
        Authorization: `token ${token}`,
      },
    });

    const data = await response.json();
    dispatch({
      type: "FETCH_USERS",
      payload: data,
    });
  };

  const setLoading = () => dispatch({ type: "SET_LOADING" });
  return (
    <GithubContext.Provider
      value={{ users: state.users, isLoading: state.isLoading }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
