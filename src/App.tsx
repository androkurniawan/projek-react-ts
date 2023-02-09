import React from 'react';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import {Outlet} from 'react-router-dom';
// import GoToTop from './components/GoToTop';

function App() {
  return (
    <>
      <Navbar />
        <Outlet />
      <Footer />
      {/* <GoToTop /> */}
    </>
  );
}

export default App;