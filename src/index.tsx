import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import RegisterHotel from './components/RegisterHotel';
import Login from './components/Login';
import BodyIndex from './components/BodyIndex';
import RegisterCustomer from './components/RegisterCustomer';
import Searching from './components/Searching';
import Booking from './components/Booking';
import MyBooking from './components/MyBooking';
import ProfileCustomer from './components/ProfileCustomer';
import UpdateProfileCustomer from './components/UpdateProfileCustomer';
import ProfileHotel from './components/ProfileHotel';
import UpdateProfileHotel from './components/UpdateProfileHotel';
import ChangePasswordCustomer from './components/ChangePasswordCustomer';
import ChangePasswordHotel from './components/ChangePasswordHotel';
import LoginBooking from './components/LoginBooking';
import ErrorPage from './components/ErrorPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLMapElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>

      <Routes>

        <Route path='/' element={<App />}>
          <Route path='/' element={<BodyIndex />} />
          <Route path='/register-hotel' element={<RegisterHotel />} />
          <Route path='/searching' element={<Searching />} />
          <Route path='/booking' element={<Booking />} />
          <Route path='/mybooking' element={<MyBooking />} />
          <Route path='/profile-customer' element={<ProfileCustomer />} />
          <Route path='/update-profile-customer' element={<UpdateProfileCustomer />} />
          <Route path='/change-password-customer' element={<ChangePasswordCustomer />} />
          <Route path='/profile-hotel' element={<ProfileHotel />} />
          <Route path='/update-profile-hotel' element={<UpdateProfileHotel />} />
          <Route path='/change-password-hotel' element={<ChangePasswordHotel />} />
          <Route path='*' element={<ErrorPage />} />
        </Route>

        <Route path='/login' element={<Login />} />
        <Route path='/login-booking' element={<LoginBooking />} />
        <Route path='/register-customer' element={<RegisterCustomer />} />

      </Routes>

    </BrowserRouter>
  </React.StrictMode>
);