export const TOKEN_KEY = "@puc-token";
export const USERNAME_KEY = "@puc-username";
export const USER_ID_KEY = "@puc-user-id";

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getUserName = () => localStorage.getItem(USERNAME_KEY);
export const getUserId = () => localStorage.getItem(USER_ID_KEY);

export const login = (token, username, user_id) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USERNAME_KEY, username);
  localStorage.setItem(USER_ID_KEY, user_id);
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USERNAME_KEY);
  localStorage.removeItem(USER_ID_KEY);
};