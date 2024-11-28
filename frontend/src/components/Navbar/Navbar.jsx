import React, { useContext, useState, useEffect } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation(); // Use location hook to get the current path
  const [menuOpen, setMenuOpen] = useState(false);

  // Logout function to clear token and navigate to home page
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate('/');
  };

  // Function to handle menu click and close the menu
  const handleMenuClick = (menuName, scrollToId = null) => {
    setMenu(menuName);
    setMenuOpen(false); // Close the menu when a link is clicked
    if (scrollToId) {
      document.getElementById(scrollToId).scrollIntoView({ behavior: "smooth" });
    }
  };

  // Close the menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest('.navbar') === null) {
        setMenuOpen(false); // Close menu if clicked outside
      }
    };

    document.addEventListener('click', handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className='navbar'>
      <Link to='/'><p className='title'>Al Haderech | על הדרך </p></Link>
      
      <button className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      <ul className={`navbar-menu ${menuOpen ? "open" : ""}`}>
        {/* Conditionally hide this link if we are on the "build-meal" page */}
        {location.pathname !== "/build-meal" && (
          <a
            href="#food-display"
            onClick={(e) => {
              e.preventDefault();
              handleMenuClick("menu", "food-display");
            }}
            className={`${menu === "menu" ? "active" : ""}`}
          >
            מוצרים שלנו
          </a>
        )}

        <a
          href="#footer"
          onClick={() => handleMenuClick("contact")}
          className={`${menu === "contact" ? "active" : ""}`}
        >
          דברו איתנו
        </a>

        <Link
          to="/build-meal"
          onClick={() => handleMenuClick("build-meal")}
          className={`${menu === "build-meal" ? "active" : ""}`}
        >
          לבנות הארוחה שלי
        </Link>
      </ul>

      <div className="navbar-right">
        <Link to='/cart' className='navbar-search-icon'>
          <img src={assets.basket_icon} alt="" />
          <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div>
        </Link>

        {!token ? (
          <button onClick={() => setShowLogin(true)}>כניסה</button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="" />
            <ul className='navbar-profile-dropdown'>
              <li onClick={() => navigate('/myorders')}>
                <img src={assets.bag_icon} alt="" />
                <p>הזמנות</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" />
                <p>התנתק</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
