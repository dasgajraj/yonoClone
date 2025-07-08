// action.js
import { Theme, UPDATE_USER, FETCH_TRANSACTION } from "./constant";

export function setTheme(isDarkMode) {
    return {
        type: Theme,
        data: isDarkMode
    };
}

export function updateUser({
  oldPassword,
  newPassword,
  newMpin,
  name,
  email,
  mobile,
  username
}) {
  return {
    type: UPDATE_USER,
    data: {
      oldPassword,
      newPassword,
      newMpin,
      name,
      email,
      mobile,
      username
    }
  };
}
