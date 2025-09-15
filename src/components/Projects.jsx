import React from 'react';

const AllProjectsCard = ({ id, name, description, createdBy }) => {
  return (
    <div className="bg-black text-yellow-400 border border-yellow-500 rounded-lg shadow-lg p-6 mx-4">
      <div className="mb-2 text-sm text-yellow-500">Project ID: #{id}</div>
      <h2 className="text-2xl font-bold mb-2">{name}</h2>
      <p className="text-yellow-300 mb-2">{description}</p>
      
    </div>
  );
};

export default AllProjectsCard;
