import React from 'react';

const CommentCard = ({ comment }) => {
  return (
    <div className="bg-black text-yellow-300 border border-yellow-600 rounded p-4 mb-2 shadow-sm max-w-md">
      <p className="text-sm font-semibold mb-1">Comment #{comment.id}</p>
      <p className="text-yellow-400">{comment.message}</p>
    </div>
  );
};

export default CommentCard;
