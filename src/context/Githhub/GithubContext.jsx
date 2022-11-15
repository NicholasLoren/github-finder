import { createContext, useReducer } from 'react'
import GithubReducer from './GithubReducers'

const GithubContext = createContext()
const url = process.env.REACT_APP_GITHUB_URL
const token = process.env.REACT_APP_GITHUB_TOKEN

export const GithubContextProvider = ({ children }) => {
  const initialState = {
    users: [],
    isLoading: false,
  }
  const [state, dispatch] = useReducer(GithubReducer, initialState)

  //get search results
  const searchUsers = async (text) => {
    const params = new URLSearchParams({ q: text })
    setLoading()
    const response = await fetch(`${url}/search/users?${params}`, {
      headers: {
        Authorization: `token ${token}`,
      },
    })

    const { items } = await response.json()
    dispatch({
      type: 'FETCH_USERS',
      payload: items,
    })
  }
  //clear all users in our results
  const clearUsers = () => dispatch({ type: 'CLEAR_USERS' })
  //set loading animation
  const setLoading = () => dispatch({ type: 'SET_LOADING' })
  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        isLoading: state.isLoading,
        searchUsers,
        clearUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext
