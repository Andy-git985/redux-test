import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Link to="/schedule">Schedule</Link>
      <Link to="/login">Login</Link>
      <Link to="/employee">Employees</Link>
      <Link to="/welcome">Welcome</Link>
    </div>
  );
};

export default NavBar;
