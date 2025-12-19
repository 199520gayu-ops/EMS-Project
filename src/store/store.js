import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import leaveReducer from "./slices/leaveSlice"
import employeesReducer from "./slices/employeesSlice"


   // ✅ Important import

const store = configureStore({
  reducer: {
    auth: authReducer,
    employees: employeesReducer,
    leave: leaveReducer,   // ✅ Must match the import
  },
});

export default store;