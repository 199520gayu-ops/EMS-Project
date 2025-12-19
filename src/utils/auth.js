// Read logged-in user
export const getAuthUser = () => {
  return JSON.parse(localStorage.getItem("authUser"));
};

// Logout user
export const clearAuthUser = () => {
  localStorage.removeItem("authUser");
};
