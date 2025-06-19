import React, { useState, useEffect } from 'react';
import leaveRequestsData from '../../data/leave_requests.json';

interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  requestedDate: string;
  approvedBy?: string;
  approvedDate?: string;
  rejectedBy?: string;
  rejectedDate?: string;
  rejectionReason?: string;
}

const LeaveApproval: React.FC = () => {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('Pending'); // Default to 'Pending'

  useEffect(() => {
    setLeaveRequests(leaveRequestsData as LeaveRequest[]);
  }, []);

  const handleUpdateRequestStatus = (id: string, newStatus: 'Approved' | 'Rejected') => {
    // Simulate API call and update local state
    // In a real app, this would also include who approved/rejected and the date.
    // For 'Rejected', a reason would ideally be captured via a modal or input.
    setLeaveRequests(prevRequests =>
      prevRequests.map(req =>
        req.id === id
          ? {
              ...req,
              status: newStatus,
              // Simulate approval/rejection details
              ...(newStatus === 'Approved' && { approvedBy: 'Admin', approvedDate: new Date().toISOString().split('T')[0] }),
              ...(newStatus === 'Rejected' && { rejectedBy: 'Admin', rejectedDate: new Date().toISOString().split('T')[0], rejectionReason: 'N/A (simulation)' }),
            }
          : req
      )
    );
    // Optionally, re-filter or sort if needed after status change.
    // For now, the filter will dynamically update the view.
  };

  const getStatusColor = (status: LeaveRequest['status']): string => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredRequests = leaveRequests.filter(req =>
    filterStatus === '' || req.status === filterStatus
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Leave Approval Center</h1>

      <div className="mb-4 bg-white p-4 rounded-lg shadow">
        <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700">Filter by Status:</label>
        <select
          id="status-filter"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md"
        >
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leave Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested On</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRequests.map((request) => (
              <tr key={request.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.employeeName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.leaveType}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.startDate} to {request.endDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.requestedDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate" title={request.reason}>{request.reason}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(request.status)}`}>
                    {request.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {request.status === 'Pending' && (
                    <>
                      <button
                        onClick={() => handleUpdateRequestStatus(request.id, 'Approved')}
                        className="text-green-600 hover:text-green-900 mr-2"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleUpdateRequestStatus(request.id, 'Rejected')}
                        className="text-red-600 hover:text-red-900"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {(request.status === 'Approved' || request.status === 'Rejected') && (
                     <span className="text-xs text-gray-500">Processed</span>
                  )}
                </td>
              </tr>
            ))}
            {filteredRequests.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                  No leave requests match the current filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveApproval;
