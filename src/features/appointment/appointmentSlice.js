import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const apptAdapter = createEntityAdapter();

const initialState = apptAdapter.getInitialState();

export const apptApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAppointments: builder.query({
      query: () => '/appointment',
      transformResponse: (responseData) => {
        return apptAdapter.setAll(initialState, responseData);
      },
      providesTags: ['Appointment'],
    }),
  }),
});

export const { useGetAppointmentsQuery } = apptApiSlice;

// returns query result object
export const selectApptResult = apptApiSlice.endpoints.getAppointments.select();

// Creates memoized selector
const selectApptData = createSelector(
  selectApptResult,
  (apptResult) => apptResult.data
);

export const { selectAll: selectAllAppointment } = apptAdapter.getSelectors(
  (state) => selectApptData(state) ?? initialState
);
