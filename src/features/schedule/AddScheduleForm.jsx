import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import DatePicker from '../../components/DatePicker';
import TimeCheckBox from '../../components/TimeCheckBox';
import dateServices from '../date/date';
import { useAddScheduleMutation } from './scheduleSlice';

const AddScheduleForm = () => {
  const [date, setDate] = useState(dateServices.currentDate());
  const [addSchedule, { isLoading }] = useAddScheduleMutation();

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  // obj is an array of times key value
  const fakeObj = [
    { time: '2023-04-02T09:00:00-05:00' },
    { time: '2023-04-02T10:00:00-05:00' },
    { time: '2023-04-02T11:00:00-05:00' },
  ];
  const addClasses = async (obj) => {
    try {
      const apptsForDate = obj.map((o) => {
        return {
          ...o,
          date: dateServices.convertEST(date),
        };
      });
      await addSchedule(apptsForDate);
      // dispatch(addNewSchedule(apptsForDate));
    } catch (error) {
      console.error('failed to save new schedule', error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '10px',
          mt: '8px',
          padding: 2,
        }}
      >
        <DatePicker date={date} handleDateChange={handleDateChange} />
        <TimeCheckBox
          date={dateServices.dateDash(date)}
          createClasses={addClasses}
        />
      </Box>
    </Container>
  );
};

export default AddScheduleForm;
