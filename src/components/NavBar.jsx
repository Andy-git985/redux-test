import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Link to="/schedule">Schedule</Link>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default NavBar;
