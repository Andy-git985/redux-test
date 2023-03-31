import { useSelector } from 'react-redux';
import { selectEmployees, selectEmployeeById } from './employeeSlice';
import { useGetEmployeesQuery } from './employeeSlice';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  display: 'flex',
  gap: '2rem',
  justifyContent: 'center',
  alignItems: 'center',
}));

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
      <Item>
        <Avatar
          alt={`${employee.firstName} avatar`}
          src={employee.image}
          sx={{ width: 56, height: 56 }}
        />
        <Typography variant="body1">{employee.firstName}</Typography>
      </Item>
    );
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return <>{content}</>;
};

export default Employee;
