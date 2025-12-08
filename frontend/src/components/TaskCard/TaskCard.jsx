import { useState } from 'react';
import { useCompleteTaskMutation } from '../../features/tasks/tasksApi';
import './TaskCard.css';

const TaskCard = ({ task, index }) => {
  const [completeTask, { isLoading }] = useCompleteTaskMutation();
  const [isCompleting, setIsCompleting] = useState(false);

  // Array of gradient colors for cards (inspired by the design)
  const cardColors = [
    'card-mint',      // Mint green
    'card-purple',    // Purple
    'card-coral',     // Coral/Pink
    'card-orange',    // Orange
    'card-blue'       // Blue
  ];

  // Cycle through colors based on index
  const cardColor = cardColors[index % cardColors.length];

  const handleComplete = async () => {
    try {
      setIsCompleting(true);
      
      // Add a slight delay for smooth animation
      setTimeout(async () => {
        await completeTask(task.id). unwrap();
      }, 300);
      
    } catch (error) {
      console.error('Failed to complete task:', error);
      setIsCompleting(false);
    }
  };

  // Format date to readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div 
      className={`task-card ${cardColor} ${isCompleting ? 'completing' : ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Card Icon/Badge */}
      <div className="card-badge">
        <span className="badge-icon">✓</span>
      </div>

      {/* Task Content */}
      <div className="card-content">
        <h3 className="task-title">{task.title}</h3>
        <p className="task-description">{task. description}</p>
        
        <div className="task-meta">
          <span className="task-date">
            <span className="meta-icon">📅</span>
            {formatDate(task. created_at)}
          </span>
        </div>
      </div>

      {/* Done Button */}
      <button
        className="done-button"
        onClick={handleComplete}
        disabled={isLoading || isCompleting}
        aria-label="Mark task as done"
      >
        {isLoading || isCompleting ? (
          <span className="button-spinner"></span>
        ) : (
          <>
            <span className="button-checkmark">✓</span>
            <span className="button-text">Done</span>
          </>
        )}
      </button>

      {/* Completing overlay animation */}
      {isCompleting && (
        <div className="completing-overlay">
          <div className="check-animation">✓</div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;