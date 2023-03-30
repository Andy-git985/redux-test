import { useSelector } from 'react-redux';
import { selectCurrentUser, selectCurrentToken } from './authSlice';
import { Link } from 'react-router-dom';
import Appointment from '../appointment/Appointment';

const Welcome = () => {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);

  const welcome = user ? `Welcome ${user.email}!` : 'Welcome!';
  const tokenAbbr = `${token.slice(0, 9)}...`;

  const content = (
    <section>
      <h1>{welcome}</h1>
      <p>Token: {tokenAbbr}</p>
      <p>
        {/* <Link to="/userslist">Go to the Users List</Link> */}
        Link here:
      </p>
      <Appointment />
    </section>
  );

  return content;
};
export default Welcome;
