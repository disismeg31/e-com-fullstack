const initialAuthState = {
  user: {
    isLoggedIn: false,
    role: "",
  },
};
const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: {
          ...state.user,
          isLoggedIn: action.payload.isLoggedIn,
          role: action.payload.role,
        },
      };
    case "LOGOUT":
      return {
        ...state,
        user: {
          isLoggedIn: false,
          role: "",
        },
      };
    default:
      return state;
  }
};

export { authReducer };
