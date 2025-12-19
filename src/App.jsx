import { Routes, Route } from "react-router-dom";

// ADMIN IMPORTS
import Layout from "./components/Layout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateUser from "./pages/admin/CreateUser";
import ManageUsers from "./components/ManageUsers";
import Attendance from "./pages/Attendance";
import Leave from "./pages/Leave";
import ProtectedEmployeeRoute from "./components/ProtectedEmployeeRoute";
// EMPLOYEE IMPORTS
import EmployeeLayout from "./pages/employee/EmployeeLayout";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";

import Payslips from "./pages/Payslips";
import Profile from "./pages/Profile";

import Payroll from "./pages/hr/Payroll";
import Onboarding from "./pages/hr/Onboarding";
import HRDashboard from "./pages/hr/HRDashboard";
import HRAttendance from "./pages/hr/HRAttendance";
import ManagerLayout from "./pages/manager/ManagerLayout";
import ManagerDashboard from "./pages/manager/ManagerDashboard";
import { ThemeProvider } from "./pages/hr/ThemeContext";







// AUTH
import Login from "./pages/Login";
import HRLayout from "./pages/hr/HRLayout";
import EmployeesList from "./pages/hr/EmployeesList";
import LeaveDetails from "./pages/hr/LeaveDetails";
import PerformanceManagement from "./pages/manager/PerformanceManagement";
import EmployeeLeaves from "./pages/employee/EmployeeLeaves";
import OnboardingEmail from "./pages/hr/OnboardingEmail";
import ManagerFeedbackModule from "./pages/manager/ManagerFeedbackModule";
import KPIPerformanceModule from "./pages/manager/KPIPerformanceModule";
import ManagerProfile from "./pages/manager/ManagerProfile";
import AdminProfile from "./pages/admin/AdminProfile";
import EmployeeSecurity from "./pages/employee/EmployeeSecurity";
import HRProfile from "./pages/hr/HRProfile";

export default function App() {
  return (
    <ThemeProvider>
    <Routes>
      {/* LOGIN */}
      <Route path="/" element={<Login />} />

      {/* ================= ADMIN ROUTES ================= */}
      <Route path="/admin" element={<Layout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="create-user" element={<CreateUser />} />
        <Route path="manage-users" element={<ManageUsers />} />
        <Route path="adminprofile" element={<AdminProfile />} />
      </Route>

      {/* ================= EMPLOYEE ROUTES ================= */}
      <Route path="login" element={<Login />} />
      <Route
  path="/employee/*"
  element={
    <ProtectedEmployeeRoute>
      <EmployeeLayout />
    </ProtectedEmployeeRoute>
  }
/>

      <Route
        path="/employee/dashboard"
        element={
          <EmployeeLayout>
            <EmployeeDashboard />
          </EmployeeLayout>
        }
      />

      <Route
        path="/employee/attendance"
        element={
          <EmployeeLayout>
            <Attendance />
          </EmployeeLayout>
        }
      />

      <Route
        path="/employee/leave"
        element={
          <EmployeeLayout>
            <Leave />
          </EmployeeLayout>
        }
      />

      <Route
        path="/employee/payslips"
        element={
          <EmployeeLayout>
            <Payslips />
          </EmployeeLayout>
        }
      />

      <Route
        path="/employee/profile"
        element={
          <EmployeeLayout>
            <Profile />
          </EmployeeLayout>
        }
      /> 
      <Route path="/employee/employeeleaves" element={
        <EmployeeLayout><EmployeeLeaves /> </EmployeeLayout>} />
        <Route path="/employee/employeesecurity" element={
        <EmployeeLayout><EmployeeSecurity /> </EmployeeLayout>} />
{/* ================= EMPLOYEE ROUTES ================= */}
  
  
  <Route path="login" element={<Login />} />

  <Route path="/hr" element={<HRLayout />}>
          <Route path="dashboard" element={<HRDashboard />} />
          <Route path="hrattendance" element={<HRAttendance />} />
          <Route path="employeeslist" element={<EmployeesList />} />
          <Route path="payroll" element={<Payroll />} />
          <Route path="onboarding" element={<Onboarding />} />
          <Route path="leavedetails" element={<LeaveDetails />} />
          <Route path="onboardingemail" element={<OnboardingEmail />} />
          <Route path="profile" element={<HRProfile />} />
          

          <Route path="login" element={<Login />} />
          
        
          
        </Route>
    {/* ================= MANAGER ROUTES ================= */}
    <Route path="login" element={<Login />} />
    <Route path="/manager"element={<ManagerLayout />}
>
  <Route path="dashboard" element={<ManagerDashboard />} />
  <Route path="reports" element={<PerformanceManagement />} /> 
  <Route path="managerfeedbackmodule" element={<ManagerFeedbackModule />} /> 
  <Route path="KPIPerformanceModule" element={<KPIPerformanceModule />} />
  <Route path="profile" element={<ManagerProfile />} />
</Route>
  
    </Routes>
    </ThemeProvider>
  );
}

  
