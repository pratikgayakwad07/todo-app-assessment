import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define API service using RTK Query
export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api'
  }),
  tagTypes: ['Tasks'],
  endpoints: (builder) => ({
    // Get recent tasks (5 most recent incomplete)
    getTasks: builder.query({
      query: () => '/tasks',
      providesTags: ['Tasks']
    }),
    
    // Create new task
    createTask: builder.mutation({
      query: (newTask) => ({
        url: '/tasks',
        method: 'POST',
        body: newTask
      }),
      // Automatically refetch tasks after creating
      invalidatesTags: ['Tasks']
    }),
    
    // Mark task as completed
    completeTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}/complete`,
        method: 'PUT'
      }),
      // Automatically refetch tasks after completing
      invalidatesTags: ['Tasks']
    })
  })
});

// Export hooks for usage in components
export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useCompleteTaskMutation
} = tasksApi;