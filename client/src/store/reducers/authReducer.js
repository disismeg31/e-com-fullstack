const initialAuthState = {
  user: {
    isLoggedIn: false,
    name:"",
    role: "",
    status:"",
    id:""
  },
};
const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        // user: {
        //   ...state.user,
        //   isLoggedIn: action.payload.isLoggedIn,
        //   name:action.payload.name,
        //   role: action.payload.role,
        //   status: action.payload.role === "seller" ? action.payload.status : "" // only for sellers
        // },
        user: {
      ...state.user,
      ...action.payload
    }
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
