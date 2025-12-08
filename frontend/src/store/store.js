import { configureStore } from '@reduxjs/toolkit';
import { tasksApi } from '../features/tasks/tasksApi';

// Configure Redux store with RTK Query
export const store = configureStore({
  reducer: {
    // Add the RTK Query reducer
    [tasksApi.reducerPath]: tasksApi.reducer
  },
  // Add the RTK Query middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tasksApi.middleware)
});