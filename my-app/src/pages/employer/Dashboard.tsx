import React from 'react';

// Mock KPI data
const kpiData = [
  { title: 'Absenteeism Rate', value: '3.5%', trend: '+0.2%' },
  { title: 'Upcoming Shifts', value: '125', trend: 'Today' },
  { title: 'Planning Conflicts', value: '3', trend: 'Needs attention' },
  { title: 'Open Leave Requests', value: '8', trend: '' },
];

const KpiCard: React.FC<{ title: string; value: string; trend: string }> = ({ title, value, trend }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="text-3xl font-semibold text-gray-900 mt-1">{value}</p>
      {trend && <p className="text-xs text-gray-400 mt-1">{trend}</p>}
    </div>
  );
};

const EmployerDashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Employer Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi) => (
          <KpiCard key={kpi.title} title={kpi.title} value={kpi.value} trend={kpi.trend} />
        ))}
      </div>
      {/* Placeholder for more dashboard components */}
      <div className="mt-8 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Activity</h2>
        <p className="text-gray-600">Placeholder for recent activities, alerts, or quick links...</p>
        {/* Example: A list of recent notifications or tasks */}
        <ul className="mt-4 space-y-2">
          <li className="text-sm text-gray-500">New leave request from John Doe.</li>
          <li className="text-sm text-gray-500">Shift plan for next week published.</li>
          <li className="text-sm text-gray-500">Contract for Jane Smith expiring soon.</li>
        </ul>
      </div>
    </div>
  );
};

export default EmployerDashboard;
