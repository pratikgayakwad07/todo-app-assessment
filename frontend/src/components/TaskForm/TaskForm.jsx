import { useState } from 'react';
import { useCreateTaskMutation } from '../../features/tasks/tasksApi';
import './TaskForm.css';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [createTask, { isLoading }] = useCreateTaskMutation();
  
  // Form state for visual feedback
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.trim().length > 255) {
      newErrors.title = 'Title must be less than 255 characters';
    }
    
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await createTask({
        title: title.trim(),
        description: description.trim()
      }). unwrap();
      
      // Clear form
      setTitle('');
      setDescription('');
      setErrors({});
      
      // Show success message
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
    } catch (error) {
      console.error('Failed to create task:', error);
      setErrors({ submit: 'Failed to create task.  Please try again.' });
    }
  };

  return (
    <div className="task-form-container">
      <div className="form-card">
        <div className="form-header">
          <h2 className="form-title">
            <span className="form-icon">+</span>
            Add New Task
          </h2>
          <p className="form-description">Create a task to stay on track</p>
        </div>

        <form onSubmit={handleSubmit} className="task-form">
          {/* Title Input */}
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              id="title"
              className={`form-input ${errors. title ? 'input-error' : ''}`}
              placeholder="e.g., Buy groceries"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) {
                  setErrors({ ...errors, title: '' });
                }
              }}
              maxLength={255}
            />
            {errors.title && (
              <span className="error-message">{errors.title}</span>
            )}
          </div>

          {/* Description Input */}
          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              className={`form-textarea ${errors.description ?  'input-error' : ''}`}
              placeholder="e.g., Buy milk, eggs, and bread from the store"
              value={description}
              onChange={(e) => {
                setDescription(e. target.value);
                if (errors.description) {
                  setErrors({ ...errors, description: '' });
                }
              }}
              rows={4}
            />
            {errors.description && (
              <span className="error-message">{errors.description}</span>
            )}
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="submit-error">
              {errors.submit}
            </div>
          )}

          {/* Success Message */}
          {showSuccess && (
            <div className="success-message">
              ✓ Task created successfully! 
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="submit-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Creating...
              </>
            ) : (
              <>
                <span className="button-icon">+</span>
                Add Task
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;