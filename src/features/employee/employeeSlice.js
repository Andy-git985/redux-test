import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const employeeAdapter = createEntityAdapter();

const initialState = employeeAdapter.getInitialState();

export const employeeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEmployees: builder.query({
      query: () => '/user/employees',
      transformResponse: (responseData) => {
        return employeeAdapter.setAll(initialState, responseData);
      },
      providesTags: ['Employee'],
    }),
  }),
});

export const { useGetEmployeesQuery, useGetEmployeeByIdQuery } =
  employeeApiSlice;

// returns query result object
export const selectEmployeesResult =
  employeeApiSlice.endpoints.getEmployees.select();

// Creates memoized selector
const selectEmployeesData = createSelector(
  selectEmployeesResult,
  (employeesResult) => employeesResult.data
);

export const { selectAll: selectEmployees, selectById: selectEmployeeById } =
  employeeAdapter.getSelectors(
    (state) => selectEmployeesData(state) ?? initialState
  );
