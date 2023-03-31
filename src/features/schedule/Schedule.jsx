import { useSelector } from 'react-redux';
import { selectAllSchedule } from './scheduleSlice';
import { useGetScheduleQuery } from './scheduleSlice';

function Schedule() {
  const { isLoading, isSuccess, isError, error } = useGetScheduleQuery();

  const schedule = useSelector(selectAllSchedule);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = schedule.map((sc) => (
      <div style={{ display: 'flex', outline: 'solid red' }}>
        <div>{sc.date}</div>
        <div>{sc.time}</div>
      </div>
    ));
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <main>
      <h1>Schedule</h1>
      {content}
    </main>
  );
}

export default Schedule;
