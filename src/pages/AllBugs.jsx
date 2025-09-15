import React, { useEffect, useState } from 'react';
import AllBugsCard from '../components/Bugs';

const AllBugs = () => {
  const [bugs, setBugs] = useState([]);

  useEffect(() => {
    const fetchBugs = async () => {
      try {
        const response = await fetch('http://localhost:8585/api/bugs');
        if (!response.ok) throw new Error('Failed to fetch bugs');
        const data = await response.json();
        setBugs(data);
      } catch (error) {
        console.error('Error fetching bugs:', error);
      }
    };

    fetchBugs();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-yellow-400">All Bugs</h1>

      {/* Table Headers */}
      <div className="flex items-center bg-yellow-700 text-black font-semibold border border-yellow-600 rounded p-4 mb-2 text-sm whitespace-nowrap overflow-x-auto">
        <span className="w-10">ID</span>
        <span className="mx-4 min-w-[200px]">Title</span>
        <span className="mx-4">Priority</span>
        <span className="mx-4">Status</span>
        <span className="mx-4">Severity</span>
        <span className="mx-4">Assigned To</span>
        <span className="mx-4">Reported By</span>
        <span className="mx-4">Created At</span>
      </div>

      {/* Bug List */}
      {bugs.map((bug) => (
        <AllBugsCard key={bug.id} bug={bug} />
      ))}
    </div>
  );
};

export default AllBugs;
