export const addUserToLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const removeUserFromLocalStorage = (user) => {
  localStorage.removeItem(user);
};

export const getUserFromLocalStorage = () => {
  const result = localStorage.getItem("user");
  const user = result ? result != "undefined" ? result != "null" ? JSON.parse(result) : null : null : null;
  return user;
};
