import React from 'react';
import { Link } from 'react-router-dom';

const employerNavItems = [
  { path: '/employer/dashboard', label: 'Dashboard' },
  { path: '/employer/employees', label: 'Employee Management' },
  { path: '/employer/planning', label: 'Shift Planning' },
  { path: '/employer/attendance', label: 'Time & Attendance' },
  { path: '/employer/leave-approval', label: 'Leave Approval' },
  { path: '/employer/contracts', label: 'Contract Overview' },
  { path: '/employer/notifications', label: 'Notifications' },
];

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4 space-y-2">
      <h2 className="text-xl font-semibold mb-4">Employer Menu</h2>
      <nav>
        <ul>
          {employerNavItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className="block py-2 px-3 hover:bg-gray-700 rounded"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <hr className="my-4 border-gray-600" />
      <h3 className="text-lg font-semibold mb-2">Employee View</h3>
      <nav>
        <ul>
          <li>
            <Link
              to="/employee/schedule" // Example link to employee section
              className="block py-2 px-3 hover:bg-gray-700 rounded"
            >
              Go to Employee View
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
