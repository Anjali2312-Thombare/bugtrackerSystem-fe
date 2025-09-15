import React from 'react';

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'HIGH':
      return 'bg-red-500';
    case 'MEDIUM':
      return 'bg-yellow-500';
    case 'LOW':
      return 'bg-green-500';
    default:
      return 'bg-gray-400';
  }
};

const getSeverityColor = (severity) => {
  switch (severity) {
    case 'CRITICAL':
      return 'bg-red-700';
    case 'MAJOR':
      return 'bg-orange-500';
    case 'MINOR':
      return 'bg-blue-500';
    default:
      return 'bg-gray-400';
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString();
};

const AllBugsCard = ({ bug, onclick }) => {
  return (
    <div className="flex items-center bg-black text-yellow-300 border border-yellow-600 rounded p-4 mb-2 overflow-x-auto text-sm whitespace-nowrap">
      <span className="w-10 font-bold">#{bug.id}</span>
      <span
        onClick={onclick}
        className="mx-4 min-w-[200px] font-semibold cursor-pointer hover:underline"
      >
        {bug.title}
      </span>
      <span className="mx-4 flex items-center space-x-2">
        <span className={`w-3 h-3 rounded-full ${getPriorityColor(bug.priority)}`}></span>
        <span>{bug.priority}</span>
      </span>
      <span className="mx-4">{bug.status}</span>
      <span className="mx-4 flex items-center space-x-2">
        <span className={`w-3 h-3 rounded-full ${getSeverityColor(bug.severity)}`}></span>
        <span>{bug.severity}</span>
      </span>
      <span className="mx-4 text-yellow-400">{bug.assignedToEmail}</span>
      <span className="mx-4 text-yellow-400">{bug.reportedByEmail}</span>
      <span className="mx-4 text-yellow-500">{formatDate(bug.createdAt)}</span>
    </div>
  );
};

export default AllBugsCard;
