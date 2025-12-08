import { useGetTasksQuery } from '../../features/tasks/tasksApi';
import TaskCard from '../TaskCard/TaskCard';
import './TaskList.css';

const TaskList = () => {
  const { data, error, isLoading, refetch } = useGetTasksQuery();

  if (isLoading) {
    return (
      <div className="task-list-container">
        <div className="list-card">
          <div className="list-header">
            <h2 className="list-title">Recent Tasks</h2>
            <span className="task-count">Loading...</span>
          </div>
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Loading your tasks...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="task-list-container">
        <div className="list-card">
          <div className="error-container">
            <div className="error-icon">⚠️</div>
            <h3 className="error-title">Oops! Something went wrong</h3>
            <p className="error-message">
              {error.data?.message || 'Failed to load tasks'}
            </p>
            <button onClick={refetch} className="retry-button">
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const tasks = data?.data || [];

  return (
    <div className="task-list-container">
      <div className="list-card">
        <div className="list-header">
          <h2 className="list-title">
            <span className="list-icon">📝</span>
            Recent Tasks
          </h2>
          <span className="task-count">{tasks.length} / 5</span>
        </div>

        {tasks.length === 0 ?  (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3 className="empty-title">No tasks yet</h3>
            <p className="empty-message">
              Create your first task to get started! 
            </p>
          </div>
        ) : (
          <div className="tasks-grid">
            {tasks. map((task, index) => (
              <TaskCard 
                key={task.id} 
                task={task} 
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;