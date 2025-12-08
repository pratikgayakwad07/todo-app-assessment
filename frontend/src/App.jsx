import { useEffect } from 'react';
import TaskForm from './components/TaskForm/TaskForm';
import TaskList from './components/TaskList/TaskList';
import './App.css';

function App() {
  
  useEffect(() => {
    // Add a subtle animation on mount
    document.body.style.opacity = '0';
    setTimeout(() => {
      document.body.style.opacity = '1';
    }, 100);
  }, []);

  return (
    <div className="app">
      {/* Background decorative elements */}
      <div className="bg-decoration"></div>
      
      <div className="app-container">
        {/* Header */}
        <header className="app-header">
          <div className="header-content">
            <h1 className="app-title">
              <span className="title-icon">✓</span>
              My Tasks
            </h1>
            <p className="app-subtitle">Stay organized, stay productive</p>
          </div>
        </header>

        {/* Main content */}
        <main className="app-main">
          <div className="content-grid">
            {/* Left side - Task Form */}
            <div className="form-section">
              <TaskForm />
            </div>

            {/* Right side - Task List */}
            <div className="list-section">
              <TaskList />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="app-footer">
          <p>Built with ❤️ Sabry Ilyas</p>
        </footer>
      </div>
    </div>
  );
}

export default App;