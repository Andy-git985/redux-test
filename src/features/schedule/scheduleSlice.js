import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';
import date from '../date/date';

const scheduleAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.date.localeCompare(b.date),
});

const initialState = scheduleAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSchedule: builder.query({
      query: () => '/api/schedule',
      // transform the dates on this
      transformResponse: (responseData) => {
        const loadedData = responseData.map((rd) => ({
          ...rd,
          date: date.dateHyphen(rd.date),
          time: date.time(rd.time),
        }));
        return scheduleAdapter.setAll(initialState, loadedData);
      },
      // Check on this
      providesTags: ['Schedule'],
    }),
    addSchedule: builder.mutation({
      query: (schedule) => ({
        url: '/api/schedule',
        method: 'POST',
        body: schedule,
      }),
      // Check on this
      invalidatesTags: ['Schedule'],
    }),
    // TODO: PUT
    // add appointment id to appt array
    // remove employee from available array
    // send updated slot to user
    updateSchedule: builder.mutation({
      query: (schedule) => ({
        url: `/api/schedule/${schedule.id}`,
        method: 'PUT',
        body: {
          appointment,
          employee,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Schedule', id: arg.id },
      ],
    }),
    // TODO: DELETE
    // Not in controller yet
  }),
});

export const {
  useGetScheduleQuery,
  useAddScheduleMutation,
  useUpdateScheduleMutation,
} = extendedApiSlice;

// returns the query result object
// check select()
export const selectScheduleResult =
  extendedApiSlice.endpoints.getSchedule.select();

// Creates memoized selector
const selectScheduleData = createSelector(
  selectScheduleResult,
  (scheduleResult) => scheduleResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const { selectAll: selectAllSchedule } = scheduleAdapter.getSelectors(
  (state) => selectScheduleData(state) ?? initialState
);
