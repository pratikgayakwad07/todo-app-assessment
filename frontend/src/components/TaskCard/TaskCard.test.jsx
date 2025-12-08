import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { tasksApi } from '../../features/tasks/tasksApi';
import TaskCard from './TaskCard';

const createMockStore = () => {
  return configureStore({
    reducer: {
      [tasksApi.reducerPath]: tasksApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(tasksApi. middleware)
  });
};

describe('TaskCard Component', () => {
  
  const mockTask = {
    id: 1,
    title: 'Buy groceries',
    description: 'Buy milk and eggs from the store',
    is_completed: false,
    created_at: new Date().toISOString()
  };

  it('renders task information correctly', () => {
    const store = createMockStore();
    
    render(
      <Provider store={store}>
        <TaskCard task={mockTask} index={0} />
      </Provider>
    );
    
    expect(screen.getByText('Buy groceries')).toBeInTheDocument();
    expect(screen.getByText('Buy milk and eggs from the store')).toBeInTheDocument();
  });

  it('renders done button', () => {
    const store = createMockStore();
    
    render(
      <Provider store={store}>
        <TaskCard task={mockTask} index={0} />
      </Provider>
    );
    
    const doneButton = screen.getByRole('button', { name: /done/i });
    expect(doneButton).toBeInTheDocument();
  });

  it('displays formatted date', () => {
    const store = createMockStore();
    
    render(
      <Provider store={store}>
        <TaskCard task={mockTask} index={0} />
      </Provider>
    );
    
    // Should show "Today" for current date
    expect(screen.getByText(/today/i)).toBeInTheDocument();
  });

  it('applies different colors based on index', () => {
    const store = createMockStore();
    
    const { container } = render(
      <Provider store={store}>
        <TaskCard task={mockTask} index={0} />
      </Provider>
    );
    
    const card = container.querySelector('.task-card');
    expect(card).toHaveClass('card-mint');
  });

  it('has accessible button label', () => {
    const store = createMockStore();
    
    render(
      <Provider store={store}>
        <TaskCard task={mockTask} index={0} />
      </Provider>
    );
    
    const button = screen.getByLabelText('Mark task as done');
    expect(button).toBeInTheDocument();
  });
});