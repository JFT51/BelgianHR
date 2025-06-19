import React, { useState, useEffect, useMemo } from 'react';
import employeesData from '../../data/employees.json'; // Importing mock data

interface Employee {
  id: string;
  name: string;
  contractType: string;
  status: string;
  email: string;
  phone: string;
  department: string;
  role: string;
  profilePicture?: string; // Optional
}

type SortKey = keyof Employee;

const EmployeeManagement: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [statusFilter, setStatusFilter] = useState<string>(''); // 'Active', 'Inactive', or '' for all

  useEffect(() => {
    // Simulate fetching data
    setEmployees(employeesData as Employee[]);
  }, []);

  const filteredAndSortedEmployees = useMemo(() => {
    let processedEmployees = [...employees];

    // Filter by status
    if (statusFilter) {
      processedEmployees = processedEmployees.filter(emp => emp.status === statusFilter);
    }

    // Filter by search term (name or email)
    if (searchTerm) {
      processedEmployees = processedEmployees.filter(
        emp =>
          emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    processedEmployees.sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return processedEmployees;
  }, [employees, searchTerm, sortKey, sortOrder, statusFilter]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const getSortIndicator = (key: SortKey) => {
    if (sortKey === key) {
      return sortOrder === 'asc' ? ' ▲' : ' ▼';
    }
    return '';
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Employee Management</h1>

      <div className="mb-4 flex space-x-4 bg-white p-4 rounded-lg shadow">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="p-2 border border-gray-300 rounded-md w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="p-2 border border-gray-300 rounded-md"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        {/* Add more filters here if needed, e.g., by department or contract type */}
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {/* Add profile picture column if needed */}
              <th onClick={() => handleSort('name')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">Name{getSortIndicator('name')}</th>
              <th onClick={() => handleSort('email')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">Email{getSortIndicator('email')}</th>
              <th onClick={() => handleSort('department')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">Department{getSortIndicator('department')}</th>
              <th onClick={() => handleSort('role')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">Role{getSortIndicator('role')}</th>
              <th onClick={() => handleSort('contractType')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">Contract Type{getSortIndicator('contractType')}</th>
              <th onClick={() => handleSort('status')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">Status{getSortIndicator('status')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAndSortedEmployees.map((employee) => (
              <tr key={employee.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {/* Placeholder for profile picture - actual image would go here */}
                    {/* <img className="h-10 w-10 rounded-full mr-3" src={employee.profilePicture || '/assets/images/default-avatar.png'} alt={employee.name} /> */}
                    <div className="h-10 w-10 rounded-full mr-3 bg-gray-300 flex items-center justify-center text-white font-bold">
                      {employee.name.substring(0,1)}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                      <div className="text-sm text-gray-500">{employee.phone}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.department}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.role}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.contractType}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    employee.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {employee.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <a href="#" className="text-indigo-600 hover:text-indigo-900 mr-2">Edit</a>
                  <a href="#" className="text-red-600 hover:text-red-900">Delete</a>
                </td>
              </tr>
            ))}
            {filteredAndSortedEmployees.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                  No employees found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeManagement;
