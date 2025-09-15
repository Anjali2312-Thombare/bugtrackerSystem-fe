import React from 'react';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString();
};

const CommentCard = ({ comment, onEdit, onDelete }) => {
  return (
    <div className="flex flex-col bg-black text-yellow-300 border border-yellow-600 rounded p-4 mb-2 text-sm">
      <div className="flex justify-between items-center mb-2">
        <div>
          <span className="font-semibold text-yellow-400">{comment.authorEmail}</span>
          <span className="ml-4 text-yellow-500">{formatDate(comment.createdAt)}</span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(comment.id)}
            className="px-2 py-1 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-600 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(comment.id)}
            className="px-2 py-1 border border-yellow-500 text-yellow-400 font-semibold rounded hover:bg-red-600 hover:border-red-600 hover:text-white transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
      <div className="text-yellow-200 whitespace-pre-wrap">{comment.text}</div>
    </div>
  );
};

export default CommentCard;
