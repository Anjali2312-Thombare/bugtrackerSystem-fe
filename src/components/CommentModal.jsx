// components/CommentModal.jsx
import { useState, useEffect } from "react";

const CommentModal = ({ isOpen, onClose, onSubmit }) => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isOpen) setMessage(""); // Reset comment box when modal opens
  }, [isOpen]);

  if (!isOpen) return null; // 🔥 THIS LINE IS IMPORTANT

  const handleSubmit = () => {
    if (!message.trim()) {
      alert("Please enter a comment.");
      return;
    }

    onSubmit(message); // Send message to parent
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-black text-yellow-300 border border-yellow-600 rounded-lg p-6 w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold mb-4">Add a Comment</h2>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your comment..."
          className="w-full h-28 p-3 border border-yellow-500 bg-black text-yellow-200 rounded resize-none"
        />

        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-yellow-500 text-yellow-400 rounded hover:bg-yellow-600 hover:text-black"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
