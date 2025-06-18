
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import EmployeeList from "./pages/EmployeeList";
import ShiftPlanner from "./pages/ShiftPlanner";
import TimeTracking from "./pages/TimeTracking";

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <aside className="w-64 bg-white shadow-md p-4">
          <h1 className="text-xl font-bold mb-6">HR Navigator</h1>
          <nav className="space-y-2">
            <Link to="/" className="block hover:text-blue-600">📊 Dashboard</Link>
            <Link to="/employees" className="block hover:text-blue-600">👥 Employees</Link>
            <Link to="/planner" className="block hover:text-blue-600">📅 Shift Planner</Link>
            <Link to="/time" className="block hover:text-blue-600">⏱ Time Tracking</Link>
          </nav>
        </aside>
        <main className="flex-1 p-6 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<EmployeeList />} />
            <Route path="/planner" element={<ShiftPlanner />} />
            <Route path="/time" element={<TimeTracking />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
