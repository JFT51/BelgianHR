import React, { useState, useEffect } from 'react';
import shiftsData from '../../data/shifts.json'; // Using existing shifts as planned schedule
import employeesData from '../../data/employees.json'; // To map employee IDs to names

interface Shift {
  id: string;
  employeeId: string;
  date: string;
  startTime: string;
  endTime: string;
  department: string;
}

interface Employee {
  id: string;
  name: string;
}

interface AttendanceEntry extends Shift {
  actualStartTime?: string;
  actualEndTime?: string;
  status: 'On Time' | 'Late In' | 'Early Out' | 'Absent' | 'Time Off' | 'Unknown';
  notes?: string;
}

// Function to simulate generating attendance data from shifts
const generateMockAttendance = (shifts: Shift[], employees: Employee[]): AttendanceEntry[] => {
  return shifts.map((shift, index) => {
    const employee = employees.find(e => e.id === shift.employeeId);
    let actualStartTime = shift.startTime;
    let actualEndTime = shift.endTime;
    let status: AttendanceEntry['status'] = 'On Time';
    let notes = '';

    // Introduce some deviations for demonstration
    if (index % 5 === 1 && employee) { // Late In
      const [h, m] = shift.startTime.split(':').map(Number);
      actualStartTime = \`\${String(h).padStart(2, '0')}:\${String(m + 15).padStart(2, '0')}\`; // 15 mins late
      status = 'Late In';
      notes = 'Traffic delay reported by employee.';
    } else if (index % 5 === 2 && employee) { // Early Out
      const [h, m] = shift.endTime.split(':').map(Number);
      actualEndTime = \`\${String(h - 1).padStart(2, '0')}:\${String(m).padStart(2, '0')}\`; // 1 hour early
      status = 'Early Out';
      notes = 'Left early due to personal reasons.';
    } else if (index % 5 === 3 && employee) { // Absent (no actual times)
      actualStartTime = undefined;
      actualEndTime = undefined;
      status = 'Absent';
      notes = 'Called in sick.';
    } else if (index % 5 === 4 && employee && shift.department === "HR") { // Time Off (e.g. HR approved)
        actualStartTime = undefined;
        actualEndTime = undefined;
        status = 'Time Off';
        notes = 'Approved vacation day.';
    }
    // Some will remain 'On Time'

    return {
      ...shift,
      actualStartTime,
      actualEndTime,
      status,
      notes,
    };
  });
};

const TimeAttendance: React.FC = () => {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceEntry[]>([]);
  const [employeesMap, setEmployeesMap] = useState<Record<string, string>>({});
  const [filterDate, setFilterDate] = useState(new Date().toISOString().split('T')[0]); // Default to today
  const [statusFilter, setStatusFilter] = useState<string>(''); // 'All', 'Late In', 'Early Out', etc.

  useEffect(() => {
    const empMap: Record<string, string> = employeesData.reduce((acc, emp) => {
      acc[emp.id] = emp.name;
      return acc;
    }, {} as Record<string, string>);
    setEmployeesMap(empMap);

    // Filter shifts for the selected date before generating attendance
    const todaysShifts = shiftsData.filter(shift => shift.date === filterDate);
    setAttendanceRecords(generateMockAttendance(todaysShifts as Shift[], employeesData as Employee[]));
  }, [filterDate]); // Re-generate if filterDate changes

  const getStatusColor = (status: AttendanceEntry['status']): string => {
    switch (status) {
      case 'On Time': return 'bg-green-100 text-green-800';
      case 'Late In': return 'bg-yellow-100 text-yellow-800';
      case 'Early Out': return 'bg-orange-100 text-orange-800'; // Tailwind doesn't have orange by default, consider adding
      case 'Absent': return 'bg-red-100 text-red-800';
      case 'Time Off': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterDate(e.target.value);
  };

  const filteredRecords = attendanceRecords.filter(record =>
    statusFilter === '' || record.status === statusFilter
  );


  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Time & Attendance</h1>
      <div className="mb-4 bg-white p-4 rounded-lg shadow flex items-center space-x-4">
        <div>
          <label htmlFor="date-filter" className="block text-sm font-medium text-gray-700">Filter by Date:</label>
          <input
            type="date"
            id="date-filter"
            value={filterDate}
            onChange={handleDateChange}
            className="mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700">Filter by Status:</label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md"
          >
            <option value="">All Statuses</option>
            <option value="On Time">On Time</option>
            <option value="Late In">Late In</option>
            <option value="Early Out">Early Out</option>
            <option value="Absent">Absent</option>
            <option value="Time Off">Time Off</option>
          </select>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scheduled Shift</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actual Times</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRecords.map((record) => (
              <tr key={record.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employeesMap[record.employeeId] || 'Unknown Employee'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.startTime} - {record.endTime}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {record.actualStartTime && record.actualEndTime
                    ? \`\${record.actualStartTime} - \${record.actualEndTime}\`
                    : 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(record.status)}`}>
                    {record.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.notes}</td>
              </tr>
            ))}
            {filteredRecords.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  No attendance records found for the selected date or filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimeAttendance;
