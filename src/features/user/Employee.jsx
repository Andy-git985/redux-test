import { useSelector } from 'react-redux';
import { selectEmployees } from './userSlice';
import { useGetEmployeesQuery } from './userSlice';

function Employee() {
  const { isLoading, isSuccess, isError, error } = useGetEmployeesQuery();

  const employees = useSelector(selectEmployees);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = JSON.stringify(employees);
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <main>
      <h1>Employee</h1>
      {content}
    </main>
  );
}

export default Employee;
