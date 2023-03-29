import { store } from './app/store';
import { Provider } from 'react-redux';
import { extendedApiSlice } from './features/schedule/scheduleSlice';
import Schedule from './features/schedule/Schedule';
import Employee from './features/user/Employee';

store.dispatch(extendedApiSlice.endpoints.getSchedule.initiate());

function App() {
  return (
    <Provider store={store}>
      <Schedule />
    </Provider>
  );
}

export default App;
