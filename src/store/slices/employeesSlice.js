import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import storage from "../../utils/storage";

const initialEmployees = storage.get("ems_employees") || [
  // example seed
  {
    id: "e1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    department: "Engineering",
    role: "Developer",
    onboarded: true,
  },
];

const employeesSlice = createSlice({
  name: "employees",
  initialState: {
    list: initialEmployees,
  },
  reducers: {
    addEmployee: (state, action) => {
      const newEmp = { id: uuidv4(), ...action.payload, onboarded: false };
      state.list.push(newEmp);
      storage.set("ems_employees", state.list);
    },
    updateEmployee: (state, action) => {
      const { id, data } = action.payload;
      const idx = state.list.findIndex((e) => e.id === id);
      if (idx >= 0) {
        state.list[idx] = { ...state.list[idx], ...data };
        storage.set("ems_employees", state.list);
      }
    },
    deleteEmployee: (state, action) => {
      state.list = state.list.filter((e) => e.id !== action.payload);
      storage.set("ems_employees", state.list);
    },
    finalizeOnboard: (state, action) => {
      const id = action.payload;
      const emp = state.list.find((e) => e.id === id);
      if (emp) {
        emp.onboarded = true;
        storage.set("ems_employees", state.list);
      }
    },
    setEmployees: (state, action) => {
      state.list = action.payload;
      storage.set("ems_employees", state.list);
    },
  },
});

export const {
  addEmployee,
  updateEmployee,
  deleteEmployee,
  finalizeOnboard,
  setEmployees,
} = employeesSlice.actions;
export default employeesSlice.reducer;