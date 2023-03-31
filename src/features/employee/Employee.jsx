import { useSelector } from 'react-redux';
import { selectEmployees, selectEmployeeById } from './employeeSlice';
import { useGetEmployeesQuery } from './employeeSlice';

const Employee = ({ employeeId }) => {
  const { isLoading, isSuccess, isError, error } = useGetEmployeesQuery();
  const employees = useSelector(selectEmployees);
  const employee = useSelector((state) =>
    selectEmployeeById(state, employeeId)
  );
  console.log('employee', employee);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = (
      <div>
        <div>{employee.firstName}</div>
        <img src={employee.image} style={{ width: 100, height: 100 }}></img>
      </div>
    );
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <main>
      <h1>Employee</h1>
      {content}
    </main>
  );
};

export default Employee;
