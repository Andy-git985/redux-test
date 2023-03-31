import { useSelector } from 'react-redux';
import { selectCurrentUser, selectCurrentToken } from './authSlice';
import Appointment from '../appointment/Appointment';

const Welcome = () => {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);

  const welcome = user ? `Welcome ${user.email}!` : 'Welcome!';
  const tokenAbbr = `${token.slice(0, 9)}...`;

  const content = (
    <section>
      <h3>{welcome}</h3>
      <p>Token: {tokenAbbr}</p>
      <Appointment />
    </section>
  );

  return content;
};
export default Welcome;
