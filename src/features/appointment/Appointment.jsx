import { useSelector } from 'react-redux';
import { selectAllAppointment } from './appointmentSlice';
import { useGetAppointmentsQuery } from './appointmentSlice';
import { selectCurrentRole } from '../auth/authSlice';
import Employee from '../employee/Employee';

const Appointment = () => {
  const { isLoading, isSuccess, isError, error } = useGetAppointmentsQuery();

  const appointments = useSelector(selectAllAppointment);
  console.log(appointments);
  const role = useSelector(selectCurrentRole);
  console.log('role', role);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = appointments.map((appt) => (
      <div
        key={appt.id}
        style={{
          display: 'flex',
          flexDirection: 'column',
          outline: 'solid blue',
        }}
      >
        <div>{appt.date}</div>
        <div>{appt.time}</div>
        {role === 'client' ? (
          <Employee employeeId={appt.employee.id} />
        ) : (
          <div>{JSON.stringify(appt.client)}</div>
        )}
      </div>
    ));
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <main>
      <h3>Appointments</h3>
      {content}
    </main>
  );
};

export default Appointment;
