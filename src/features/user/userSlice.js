import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';

const userAdapter = createEntityAdapter();

const initialState = userAdapter.getInitialState();

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEmployees: builder.query({
      query: () => '/user/employees',
      transformResponse: (responseData) => {
        return userAdapter.setAll(initialState, responseData);
      },
      providesTags: ['User'],
    }),
  }),
});

export const { useGetEmployeesQuery } = userApiSlice;

// returns query result object
export const selectEmployeesResult =
  userApiSlice.endpoints.getEmployees.select();

// Creates memoized selector
const selectEmployeesData = createSelector(
  selectEmployeesResult,
  (employeesResult) => employeesResult.data
);

export const { selectAll: selectEmployees } = userAdapter.getSelectors(
  (state) => selectEmployeesData(state) ?? initialState
);
