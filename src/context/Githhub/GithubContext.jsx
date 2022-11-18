import { createContext, useReducer } from 'react'
import { Navigate } from 'react-router-dom'
import GithubReducer from './GithubReducers'

const GithubContext = createContext()
const url = process.env.REACT_APP_GITHUB_URL
const token = process.env.REACT_APP_GITHUB_TOKEN

export const GithubContextProvider = ({ children }) => {
  const initialState = {
    users: [],
    isLoading: false,
    user: {},
    repos: [],
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
    if (response.status === 404) return <Navigate to="/not-found" />
    else {
      const { items } = await response.json()
      dispatch({
        type: 'FETCH_USERS',
        payload: items,
      })
    }
  }
  //get User repo results
  const getUserRepos = async (user) => {
    const response = await fetch(`${url}/users/${user}/repos`)
    if (response.status === 404) return <Navigate to="/not-found" />
    else {
      const data = await response.json()
      dispatch({
        type: 'FETCH_REPOS',
        payload: data,
      })
    }
  }

  //get user details
  const getUser = async (login) => {
    setLoading()
    const response = await fetch(`${url}/users/${login}`, {
      headers: {
        Authorization: `token ${token}`,
      },
    })

    const data = await response.json()
    dispatch({
      type: 'GET_USER',
      payload: data,
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
        user: state.user,
        isLoading: state.isLoading,
        repos: state.repos,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext
