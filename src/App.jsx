import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './features/auth/Login';
import Schedule from './features/schedule/Schedule';
import Employee from './features/employee/Employee';
import NavBar from './components/NavBar';
import Home from './components/Home';
import RequireAuth from './features/auth/RequireAuth';
import Welcome from './features/auth/Welcome';

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/login" element={<Login />} />
          <Route path="/employee" element={<Employee />} />
          <Route element={<RequireAuth />}>
            <Route path="/welcome" element={<Welcome />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
