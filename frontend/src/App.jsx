import React, { useEffect, useState } from 'react';
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Cart from './pages/Cart/Cart';
import LoginPopup from './components/LoginPopup/LoginPopup';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import MyOrders from './pages/MyOrders/MyOrders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify/Verify';
import BuildMeal from './pages/buildMeal/BuildMeal'; 
import axios from 'axios';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  const trackVisit = async () => {
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4000" || import.meta.env.VITE_ADMIN_API_URL;
    if (!apiUrl) {
      console.error("API URL is missing in the environment variables!");
    } else {
      console.log("API URL:", apiUrl); // Log the API URL to confirm it's loaded correctly
    }

    try {
      const timestamp = new Date().toISOString();
      await axios.post(`${apiUrl}/api/analytics/track`, { timestamp });
    } catch (error) {
      console.error('Error tracking visit:', error);
    }
  };

  useEffect(() => {
    trackVisit();
  }, []);

  return (
    <>
      <ToastContainer />
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/myorders' element={<MyOrders />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/build-meal' element={<BuildMeal />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
