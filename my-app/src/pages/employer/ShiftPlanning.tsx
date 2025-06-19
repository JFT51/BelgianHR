import React, { useState, useEffect } from 'react';
import employeesData from '../../data/employees.json';
import shiftsData from '../../data/shifts.json';

interface Employee {
  id: string;
  name: string;
}

interface Shift {
  id: string;
  employeeId: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  endTime: string; // HH:MM
  department: string;
}

// Helper to get dates for a week (e.g., current week)
const getWeekDays = (startDate: Date): Date[] => {
  const days: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(startDate);
    day.setDate(startDate.getDate() + i);
    days.push(day);
  }
  return days;
};

// Basic time slot representation (e.g., hourly)
const timeSlots = Array.from({ length: 15 }, (_, i) => \`\${String(i + 8).padStart(2, '0')}:00\`); // 08:00 to 22:00

const ShiftPlanning: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [shifts, setShifts] = useState<Shift[]>(shiftsData); // Load initial shifts
  const [currentWeekStartDate, setCurrentWeekStartDate] = useState(new Date()); // Default to current date
  const [draggedShift, setDraggedShift] = useState<Shift | null>(null);

  useEffect(() => {
    setEmployees(employeesData.map(e => ({ id: e.id, name: e.name })));
  }, []);

  const weekDays = getWeekDays(currentWeekStartDate);

  const handleDragStart = (shift: Shift, e: React.DragEvent<HTMLDivElement>) => {
    setDraggedShift(shift);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', shift.id); // Necessary for Firefox
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Allow drop
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetDate: string, targetEmployeeId: string, targetTimeSlot?: string) => {
    e.preventDefault();
    if (!draggedShift) return;

    // In a real app, you'd update the shift's date, employeeId, and possibly time
    // For this simulation, we'll just log it and move the shift visually
    console.log(
      \`Dropped shift \${draggedShift.id} for employee \${targetEmployeeId} on \${targetDate} at \${targetTimeSlot || 'N/A'}\`
    );

    // Update shift (simulated - does not persist beyond component state)
    setShifts(prevShifts =>
      prevShifts.map(s =>
        s.id === draggedShift.id
          ? { ...s, date: targetDate, employeeId: targetEmployeeId, startTime: targetTimeSlot || s.startTime }
          : s
      )
    );
    setDraggedShift(null);
  };

  const changeWeek = (direction: 'prev' | 'next') => {
    setCurrentWeekStartDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() + (direction === 'next' ? 7 : -7));
      return newDate;
    });
  };

  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Shift Planning</h1>
      <div className="mb-4 flex justify-between items-center bg-white p-3 rounded shadow">
        <button onClick={() => changeWeek('prev')} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded">
          &lt; Previous Week
        </button>
        <h2 className="text-lg font-medium">
          Week of: {weekDays[0].toLocaleDateString()} - {weekDays[6].toLocaleDateString()}
        </h2>
        <button onClick={() => changeWeek('next')} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded">
          Next Week &gt;
        </button>
      </div>

      {/* Unassigned Shifts Pool (Optional) */}
      <div className="mb-4 p-3 bg-gray-50 rounded shadow">
        <h3 className="text-md font-semibold mb-2">Unassigned Shifts (Drag these)</h3>
        <div className="flex flex-wrap gap-2">
          {shifts.filter(s => !s.employeeId || s.employeeId === "TBD").map(shift => ( // Example: "TBD" employeeId for unassigned
            <div
              key={shift.id}
              draggable
              onDragStart={(e) => handleDragStart(shift, e)}
              className="p-2 bg-yellow-200 border border-yellow-400 rounded cursor-grab text-xs"
            >
              Shift ID: {shift.id} ({shift.startTime}-{shift.endTime})
            </div>
          ))}
        </div>
      </div>


      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="sticky left-0 z-10 bg-gray-50 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">
                Employee
              </th>
              {weekDays.map(date => (
                <th key={date.toISOString()} className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">
                  {date.toLocaleDateString([], { weekday: 'short', month: 'numeric', day: 'numeric' })}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {employees.map(employee => (
              <tr key={employee.id}>
                <td className="sticky left-0 z-10 bg-white px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900 border border-gray-300">
                  {employee.name}
                </td>
                {weekDays.map(date => {
                  const dateString = formatDate(date);
                  const shiftsForCell = shifts.filter(
                    s => s.employeeId === employee.id && s.date === dateString
                  );
                  return (
                    <td
                      key={dateString}
                      className="px-1 py-1 whitespace-nowrap text-xs text-gray-500 border border-gray-300 h-24 align-top relative" // Added relative for positioning drops
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, dateString, employee.id)}
                    >
                      {shiftsForCell.map(shift => (
                        <div
                          key={shift.id}
                          draggable
                          onDragStart={(e) => handleDragStart(shift, e)}
                          className="bg-blue-500 text-white p-1 rounded mb-1 cursor-grab text-xs overflow-hidden"
                          title={`Shift: ${shift.startTime}-${shift.endTime} (${shift.department})`}
                        >
                          {shift.startTime} - {shift.endTime}<br/>
                          <span className="text-xxs">{shift.department}</span>
                        </div>
                      ))}
                      {/* This cell is a drop target for the entire day for this employee */}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* For a more granular grid (e.g., hourly), the table structure would be more complex, dividing each day cell into time slots. */}
      {/* This example uses a simpler day-based drop. */}
    </div>
  );
};

export default ShiftPlanning;
