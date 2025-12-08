import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { tasksApi } from '../../features/tasks/tasksApi';
import TaskList from './TaskList';

const createMockStore = () => {
  return configureStore({
    reducer: {
      [tasksApi.reducerPath]: tasksApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(tasksApi.middleware)
  });
};

describe('TaskList Component', () => {
  
  it('renders the list title', () => {
    const store = createMockStore();
    
    render(
      <Provider store={store}>
        <TaskList />
      </Provider>
    );
    
    expect(screen.getByText(/recent tasks/i)).toBeInTheDocument();
  });

  it('shows loading state initially', () => {
    const store = createMockStore();
    
    render(
      <Provider store={store}>
        <TaskList />
      </Provider>
    );
    
    // Loading text should appear
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});