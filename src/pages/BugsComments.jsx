import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import BugCardDetailed from "../components/BugCardDetailed";
import CommentCard from "../components/CommentCard";

const dummyBug = {
  id: 3,
  title: 'Email field does not validate format',
  description: "The email field accepts invalid formats like 'user@'.",
  priority: 'MEDIUM',
  severity: 'MINOR',
  status: 'IN_PROGRESS',
  createdAt: '2025-09-01T11:15:00',
  updatedAt: '2025-09-01T12:00:00',
  reportedByEmail: 'priyanshi@gmail.com',
  assignedToEmail: 'admin@example.com',
  projectName: 'BugTrackingSystem',
};

const handleEdit = (id) => {
  alert(`Edit bug with ID: ${id}`);
};

const handleDelete = (id) => {
  alert(`Delete bug with ID: ${id}`);
};
const dummyComment = {
  id: 12,
  message: "This bug still occurs after deploying the fix.",
};
export function Comments(){
   const navigate=useNavigate();
     const handleClick = () => {
    console.log('Doing something before navigation...');
    navigate('/comments');
  };
    return<>
    <div> All the comments of specific bugs  </div>
    <Button title="Bugs " onclick={handleClick}></Button>
    <BugCardDetailed
        bug={dummyBug}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <CommentCard comment={dummyComment} />
    </>
}