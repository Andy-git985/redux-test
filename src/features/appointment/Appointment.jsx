import { useSelector } from 'react-redux';
import { selectAllAppointment } from './appointmentSlice';
import { useGetAppointmentsQuery } from './appointmentSlice';

const Appointment = () => {
  const { isLoading, isSuccess, isError, error } = useGetAppointmentsQuery();

  const appointments = useSelector(selectAllAppointment);
  console.log(appointments);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = JSON.stringify(appointments);
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <main>
      <h1>Appointments</h1>
      {content}
    </main>
  );
};

export default Appointment;
