import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EmployerLayout from './layouts/EmployerLayout'; // Added
import EmployerDashboard from './pages/employer/Dashboard';
import EmployeeManagement from './pages/employer/EmployeeManagement';
import ShiftPlanning from './pages/employer/ShiftPlanning';
import TimeAttendance from './pages/employer/TimeAttendance';
import LeaveApproval from './pages/employer/LeaveApproval';
import ContractOverview from './pages/employer/ContractOverview';
import Notifications from './pages/employer/Notifications';

import EmployeeSchedule from './pages/employee/Schedule';
import TimeClock from './pages/employee/TimeClock';
import Availability from './pages/employee/Availability';
import LeaveRequest from './pages/employee/LeaveRequest';
import Profile from './pages/employee/Profile';
import './App.css';

function App() {
  return (
    <Router>
      {/* Global navigation could go here if needed, e.g., for switching between Employer and Employee main sections */}
      <Routes>
        {/* Employer Routes with Sidebar Layout */}
        <Route path="/employer" element={<EmployerLayout />}>
          <Route path="dashboard" element={<EmployerDashboard />} />
          <Route path="employees" element={<EmployeeManagement />} />
          <Route path="planning" element={<ShiftPlanning />} />
          <Route path="attendance" element={<TimeAttendance />} />
          <Route path="leave-approval" element={<LeaveApproval />} />
          <Route path="contracts" element={<ContractOverview />} />
          <Route path="notifications" element={<Notifications />} />
          <Route index element={<EmployerDashboard />} /> {/* Default employer page */}
        </Route>

        {/* Employee Routes (could have their own layout too) */}
        {/* For now, keeping them simple. A Link to switch to employee view is in Sidebar.tsx */}
        <Route path="/employee/schedule" element={<EmployeeSchedule />} />
        <Route path="/employee/time-clock" element={<TimeClock />} />
        <Route path="/employee/availability" element={<Availability />} />
        <Route path="/employee/leave-request" element={<LeaveRequest />} />
        <Route path="/employee/profile" element={<Profile />} />

        {/* Landing Page Route */}
        <Route path="/" element={
          <div className="p-4 text-center">
            <h1 className="text-2xl font-bold mb-4">Welcome to Belgian HR Navigator</h1>
            <p className="mb-2">This is a Phase 1 UI Prototype.</p>
            <div className="space-x-4">
              <Link to="/employer/dashboard" className="text-blue-500 hover:underline">Go to Employer View</Link>
              <Link to="/employee/schedule" className="text-blue-500 hover:underline">Go to Employee View</Link>
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
