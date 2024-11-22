import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Footer.css'
import { assets } from '../../assets/assets'


const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            {/* <img src={assets.logo} alt="" /> */}
            <Link to='/'><p className='title'>Al Haderech | על הדרך </p></Link>
            <p>Craving something delicious? Get your favorite meals delivered fast and fresh with our food delivery app. From local favorites to international cuisines, we bring the best dishes straight to your door. Order now and enjoy hassle-free dining at your fingertips!</p>
            <div className="footer-social-icons">
                <a href='https://github.com/shreyJS'><img src={assets.github2} alt="" /></a>
                <a href='https://www.linkedin.com/in/shreyasdeshpande7/'><img src={assets.linkedin_icon} alt="" /></a>
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <a href='#'><li>Home</li></a>
                <a href='#explore-menu'><li>Menu</li></a>
                <a href='#app-download'><li>App</li></a>
                <a href=''><li>Privacy policy</li></a>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+91-9082028676</li>
                <li>contact@Al Haderech | על הדרך .com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2024 © Al Haderech | על הדרך .com - All Right Reserved.</p>
    </div>
  )
}

export default Footer
