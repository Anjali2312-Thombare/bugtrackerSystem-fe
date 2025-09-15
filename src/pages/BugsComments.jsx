import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import BugCardDetailed from "../components/BugCardDetailed";
import CommentModal from "../components/CommentModal";

const handleEdit = (id) => {
  alert(`Edit bug with ID: ${id}`);
};

const handleDelete = (id) => {
  alert(`Delete bug with ID: ${id}`);
};

export function Comments() {
  const navigate = useNavigate();
  const location = useLocation();
  const bugId = location.state?.bugId;

  const [bug, setBug] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  const handleClick = () => {
    navigate("/bugs");
  };

  const fetchBug = async () => {
    const token = localStorage.getItem("token");

    try {
      const bugResponse = await fetch(`http://localhost:8585/api/bugs/${bugId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!bugResponse.ok) {
        throw new Error("Failed to fetch bug details.");
      }

      const bugData = await bugResponse.json();
      setBug(bugData);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!bugId) {
      setError("No bug ID provided.");
      setLoading(false);
      return;
    }

    fetchBug();
  }, [bugId]);

  const handleAddComment = async (message) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    try {
      const response = await fetch(`http://localhost:8585/api/comments/bug/${bugId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message,
          user: { id: parseInt(userId) },
          bug: { id: bugId },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add comment.");
      }

      setIsCommentModalOpen(false);
    } catch (err) {
      console.error(err);
      alert(err.message || "Could not add comment.");
    }
  };

  return (
    <>
      <div className="text-lg font-semibold mb-4">Add comment to specific bug</div>

      {/* Top bar */}
      <div className="flex justify-between items-center mb-4">
        <Button title="← Back to Bugs" onclick={handleClick} />
        <Button title="+ Add Comment" onclick={() => setIsCommentModalOpen(true)} />
      </div>

      {loading && <p>Loading bug...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {bug && (
        <BugCardDetailed
          bug={bug}
          onEdit={() => handleEdit(bug.id)}
          onDelete={() => handleDelete(bug.id)}
        />
      )}

      {/* Comment modal only opens when button is clicked */}
      {isCommentModalOpen && (
        <CommentModal
          isOpen={isCommentModalOpen}
          onClose={() => setIsCommentModalOpen(false)}
          onSubmit={handleAddComment}
        />
      )}
    </>
  );
}
