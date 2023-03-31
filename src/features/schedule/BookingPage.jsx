import { useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import { FormControlLabel } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import dateServices from '../date/date';
import { useSelector } from 'react-redux';
import { selectAllSchedule } from './scheduleSlice';
import { selectEmployees } from '../employee/employeeSlice';
import { theme } from '../../styles/styles';
import DatePicker from '../../components/DatePicker';
import ReserveDialog from '../../components/ReserveDialog';
import TimeSlotDetail from '../../components/TimeSlotDetail';
import TimeSlots from '../../components/TimeSlots';

const BookingPage = () => {
  const [search, setSearch] = useState({
    employee: 'any',
    date: dateServices.currentDate(),
  });
  const [checked, setChecked] = useState(false);
  const [dateDisabled, setDateDisabled] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  const schedule = useSelector(selectAllSchedule);
  const employees = useSelector(selectEmployees);
  console.log('employees', employees);

  const searchSlots = [];
  const employee = '';
  const slot = '';

  const handleDisabled = () => {
    setDisabled(false);
  };

  const handleSwitchChange = () => {
    setDisabled(true);
    setChecked(!checked);
    setDateDisabled(!dateDisabled);
  };

  const handleCancel = () => {
    setOpenDialog(false);
  };

  const handleDateChange = (newDate) => {
    setDisabled(true);
    const newSearch = {
      ...search,
      date: newDate,
    };
    setSearch(newSearch);
  };

  const handleEmployeeChange = (employee) => {
    setDisabled(true);
    const newSearch = { ...search, employee };
    setSearch(newSearch);
  };

  const reserveDialog = {
    button: 'Reserve Now',
    title: 'Would you like to reserve this appointment?',
    content: `With ${employee?.name} on ${dateServices.dateHyphen(
      slot?.date
    )} on ${dateServices.time(slot?.time)}?`,
  };

  const handleReserve = async () => {
    try {
      console.log('handling booking');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
          mb: 3,
        }}
      >
        <FormControl
          sx={{
            width: '100%',
          }}
        >
          <InputLabel>Choose a barber</InputLabel>
          <Select
            label="Barber"
            value={search.employee}
            fullWidth
            onChange={(event) => handleEmployeeChange(event.target.value)}
            sx={{ color: theme.palette.secondary.main }}
          >
            <MenuItem value="any">No preference</MenuItem>
            {employees.map((employee) => {
              return (
                <MenuItem value={employee.id} key={employee.id}>
                  {employee.firstName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControlLabel
          checked={checked}
          control={<Switch />}
          label="Any Date"
          onChange={handleSwitchChange}
        />
        <DatePicker
          date={search.date}
          handleDateChange={handleDateChange}
          dateDisabled={dateDisabled}
        />
      </Box>
      {/* {searchSlots.length > 0 ? (
        <>
          <TimeSlots
            timeSlots={searchSlots}
            preference={search.employee}
            handleDisabled={handleDisabled}
          />
        </>
      ) : (
        <Typography variant="h6" sx={{ mb: 2 }}>
          No matches
        </Typography>
      )}
      {search.employee === 'any' ? (
        <TimeSlotDetail handleDisabled={handleDisabled} />
      ) : (
        // <Person employee={employees.find((e) => e.id === search.employee)} />
        <div>Person</div>
      )}
      <ReserveDialog
        disabled={disabled}
        dialog={reserveDialog}
        agreeHandler={handleReserve}
        closeHandler={handleCancel}
        openDialog={openDialog}
      /> */}
    </Container>
  );
};

export default BookingPage;
