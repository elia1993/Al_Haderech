import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'

const Navbar = ({ setShowLogin }) => {

  const [menu, setMenu,] = useState("home");
  const { getTotalCartAmount, token ,setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate('/')
  }

  return (  
    <div className='navbar'>
      <Link to='/'><p className='title'>Al Haderech | על הדרך </p></Link>
  <button className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)}>
    ☰
  </button>
  <ul className={`navbar-menu ${menuOpen ? "open" : ""}`}>
  <a
  href="#food-display"
  onClick={(e) => {
    e.preventDefault(); 
    setMenu("menu");
    document.getElementById("food-display").scrollIntoView({ behavior: "smooth" });
  }}
  className={`${menu === "menu" ? "active" : ""}`}
>
  מוצרים שלנו
</a>
    <a href="#footer" onClick={() => setMenu("contact")} className={`${menu === "contact" ? "active" : ""}`}>
      דברו איתנו
    </a>
    <Link to="/build-meal" onClick={() => setMenu("build-meal")} className={`${menu === "build-meal" ? "active" : ""}`}>
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
  )
}

export default Navbar
