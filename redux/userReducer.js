import { UPDATE_USER } from "./constant";

const initialState = {
  user: {
    name: 'Demo User',
    username: 'demoUser',
    mobile: '123456789',
    email: 'demo@user.com',
    password: 'demoUser',
    mpin: '0000'
  }
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER:
      if (action.data.oldPassword !== state.user.password) {
        console.warn("Old password does not match");
        return state;
      }

      return {
        ...state,
        user: {
          ...state.user,
          name: action.data.name || state.user.name,
          username: action.data.username || state.user.username,
          mobile: action.data.mobile || state.user.mobile,
          email: action.data.email || state.user.email,
          password: action.data.newPassword || state.user.password,
          mpin: action.data.newMpin || state.user.mpin
        }
      };

    default:
      return state;
  }
};
