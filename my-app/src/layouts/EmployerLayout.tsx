import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';

const EmployerLayout: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-grow p-6 bg-gray-100">
        <Outlet /> {/* This is where the routed employer page component will be rendered */}
      </main>
    </div>
  );
};

export default EmployerLayout;
