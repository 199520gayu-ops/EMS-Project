import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import storage from "../../utils/storage";

/*
  Simple auth using localStorage:
  - users stored in localStorage key "ems_users"
  - current user in localStorage key "ems_current_user"
*/

const initialUser = storage.get("ems_current_user") || null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: initialUser,
    error: null,
  },
  reducers: {
    signup: (state, action) => {
      const users = storage.get("ems_users") || [];
      const { name, email, password, role } = action.payload;

      if (users.find((u) => u.email === email)) {
        state.error = "Email already registered.";
        return;
      }

      const newUser = { id: uuidv4(), name, email, password, role };
      users.push(newUser);
      storage.set("ems_users", users);
      storage.set("ems_current_user", newUser);
      state.user = newUser;
      state.error = null;
    },
    login: (state, action) => {
      const { email, password } = action.payload;
      const users = storage.get("ems_users") || [];
      const user = users.find((u) => u.email === email && u.password === password);

      if (!user) {
        state.error = "Invalid credentials.";
        return;
      }

      storage.set("ems_current_user", user);
      state.user = user;
      state.error = null;
    },
    logout: (state) => {
      storage.remove("ems_current_user");
      state.user = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { signup, login, logout, clearError } = authSlice.actions;
export default authSlice.reducer;