import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import storage from "../../utils/storage";

const initialLeaves = storage.get("ems_leaves") || [];

const leaveSlice = createSlice({
  name: "leave",
  initialState: {
    list: initialLeaves,
  },
  reducers: {
    applyLeave: (state, action) => {
      const newLeave = {
        id: uuidv4(),
        employeeId: action.payload.employeeId,
        employeeName: action.payload.employeeName,
        from: action.payload.from,
        to: action.payload.to,
        reason: action.payload.reason,
        status: "Pending",
      };
      state.list.push(newLeave);
      storage.set("ems_leaves", state.list);
    },
    updateLeaveStatus: (state, action) => {
      const { id, status } = action.payload;
      const leave = state.list.find((l) => l.id === id);
      if (leave) {
        leave.status = status;
        storage.set("ems_leaves", state.list);
      }
    },
  },
});

export const { applyLeave, updateLeaveStatus } = leaveSlice.actions;
export default leaveSlice.reducer;