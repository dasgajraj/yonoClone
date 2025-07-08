import { Theme } from "./constant";

const initialState = {
    isDarkMode: false,

}

export const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case Theme:
      return {
        ...state,
        isDarkMode: !state.isDarkMode
      };
    default:
      return state;
  }
};