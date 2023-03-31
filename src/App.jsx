import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, responsiveFontSizes } from '@mui/material';
import Login from './features/auth/Login';
import Schedule from './features/schedule/Schedule';
import AddScheduleForm from './features/schedule/AddScheduleForm';
import Employee from './features/employee/Employee';
import NavBar from './components/NavBar';
import Home from './components/Home';
import RequireAuth from './features/auth/RequireAuth';
import Welcome from './features/auth/Welcome';
import BookingPage from './features/schedule/BookingPage';
import { theme } from './styles/styles';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={responsiveFontSizes(theme)}>
        <CssBaseline />
        <NavBar />
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/add" element={<AddScheduleForm />} />
          <Route element={<RequireAuth />}>
            <Route path="/welcome" element={<Welcome />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
