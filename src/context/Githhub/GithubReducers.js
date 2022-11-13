const GithubReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_USERS":
      return {
        ...state,
        users: action.payload,
        isLoading: false,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
      break;
  }
};
