import React from 'react';

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'HIGH':
      return 'text-red-500';
    case 'MEDIUM':
      return 'text-yellow-400';
    case 'LOW':
      return 'text-green-400';
    default:
      return 'text-gray-400';
  }
};

const getSeverityColor = (severity) => {
  switch (severity) {
    case 'CRITICAL':
      return 'text-red-700';
    case 'MAJOR':
      return 'text-orange-400';
    case 'MINOR':
      return 'text-blue-400';
    default:
      return 'text-gray-400';
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString();
};

const BugCardDetailed = ({ bug, onEdit, onDelete }) => {
  return (
    <div className="bg-black text-yellow-300 border border-yellow-600 rounded-lg p-6 mb-4 w-full max-w-4xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Bug #{bug.id}: {bug.title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="space-y-3">
          <p><span className="font-semibold text-yellow-400">Description: </span>{bug.description}</p>
          <p><span className="font-semibold">Priority: </span><span className={getPriorityColor(bug.priority)}>{bug.priority}</span></p>
          <p><span className="font-semibold">Severity: </span><span className={getSeverityColor(bug.severity)}>{bug.severity}</span></p>
          <p><span className="font-semibold">Status: </span>{bug.status}</p>
          <p><span className="font-semibold">Project: </span>{bug.projectName}</p>
        </div>

        <div className="space-y-3">
          <p><span className="font-semibold">Assigned To: </span>{bug.assignedToEmail}</p>
          <p><span className="font-semibold">Reported By: </span>{bug.reportedByEmail}</p>
          <p><span className="font-semibold">Created At: </span>{formatDate(bug.createdAt)}</p>
          <p><span className="font-semibold">Updated At: </span>{formatDate(bug.updatedAt)}</p>
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => onEdit(bug.id)}
          className="px-4 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-600 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(bug.id)}
          className="px-4 py-2 border border-yellow-500 text-yellow-400 font-semibold rounded hover:bg-red-600 hover:border-red-600 hover:text-white transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BugCardDetailed;
