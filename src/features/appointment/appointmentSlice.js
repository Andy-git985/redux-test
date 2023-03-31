import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';
import date from '../date/date';

const apptAdapter = createEntityAdapter();

const initialState = apptAdapter.getInitialState();

export const apptApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAppointments: builder.query({
      query: () => '/appointment',
      transformResponse: (responseData) => {
        const loadedAppts = responseData.map((appt) => ({
          ...appt,
          date: date.dateHyphen(appt.date),
          time: date.time(appt.time),
        }));
        return apptAdapter.setAll(initialState, loadedAppts);
      },
      providesTags: (result, error, arg) => [
        { type: 'Appointment', id: 'LIST' },
        ...result.ids.map((id) => ({ type: 'Appointment', id })),
      ],
    }),
    addAppointment: builder.mutation({
      query: (appointment) => ({
        url: '/appointment',
        method: 'POST',
        body: appointment,
      }),
      invalidatesTags: [{ type: 'Schedule', id: 'LIST' }],
    }),
  }),
});

export const { useGetAppointmentsQuery, useAddAppointmentMutation } =
  apptApiSlice;

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
