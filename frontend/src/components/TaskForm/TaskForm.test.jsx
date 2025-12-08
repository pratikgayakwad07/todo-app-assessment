import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { tasksApi } from '../../features/tasks/tasksApi';
import TaskForm from './TaskForm';

// Create a mock store for testing
const createMockStore = () => {
  return configureStore({
    reducer: {
      [tasksApi.reducerPath]: tasksApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(tasksApi.middleware)
  });
};

describe('TaskForm Component', () => {
  
  it('renders the form with title and description inputs', () => {
    const store = createMockStore();
    
    render(
      <Provider store={store}>
        <TaskForm />
      </Provider>
    );
    
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add task/i })).toBeInTheDocument();
  });

  it('shows error when submitting empty form', async () => {
    const store = createMockStore();
    
    render(
      <Provider store={store}>
        <TaskForm />
      </Provider>
    );
    
    const submitButton = screen.getByRole('button', { name: /add task/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/title is required/i)).toBeInTheDocument();
    });
  });

  it('shows error when title is missing', async () => {
    const store = createMockStore();
    
    render(
      <Provider store={store}>
        <TaskForm />
      </Provider>
    );
    
    const descriptionInput = screen.getByLabelText(/description/i);
    fireEvent.change(descriptionInput, { target: { value: 'Test description' } });
    
    const submitButton = screen.getByRole('button', { name: /add task/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/title is required/i)). toBeInTheDocument();
    });
  });

  it('shows error when description is missing', async () => {
    const store = createMockStore();
    
    render(
      <Provider store={store}>
        <TaskForm />
      </Provider>
    );
    
    const titleInput = screen.getByLabelText(/title/i);
    fireEvent.change(titleInput, { target: { value: 'Test title' } });
    
    const submitButton = screen.getByRole('button', { name: /add task/i });
    fireEvent. click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/description is required/i)).toBeInTheDocument();
    });
  });

  it('allows user to type in inputs', () => {
    const store = createMockStore();
    
    render(
      <Provider store={store}>
        <TaskForm />
      </Provider>
    );
    
    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    
    fireEvent.change(titleInput, { target: { value: 'Buy groceries' } });
    fireEvent.change(descriptionInput, { target: { value: 'Buy milk and eggs' } });
    
    expect(titleInput. value).toBe('Buy groceries');
    expect(descriptionInput.value).toBe('Buy milk and eggs');
  });

  it('clears error message when user starts typing', async () => {
    const store = createMockStore();
    
    render(
      <Provider store={store}>
        <TaskForm />
      </Provider>
    );
    
    const submitButton = screen.getByRole('button', { name: /add task/i });
    fireEvent. click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/title is required/i)).toBeInTheDocument();
    });
    
    const titleInput = screen.getByLabelText(/title/i);
    fireEvent.change(titleInput, { target: { value: 'T' } });
    
    await waitFor(() => {
      expect(screen.queryByText(/title is required/i)).not.toBeInTheDocument();
    });
  });
});