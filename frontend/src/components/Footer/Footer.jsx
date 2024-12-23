import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Footer.css';
import { assets } from '../../assets/assets';
import { FaWhatsapp } from 'react-icons/fa';  // Importing WhatsApp icon from React Icons

const Footer = () => {
  const navigate = useNavigate();

  const handleOrderNow = () => {
    // If not on the home page, navigate to home first
    if (window.location.pathname !== '/') {
      navigate('/');
    }

    // Use setTimeout to ensure the page has navigated/rendered
    setTimeout(() => {
      const foodDisplayElement = document.getElementById('food-display');
      if (foodDisplayElement) {
        foodDisplayElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          {/* <img src={assets.logo} alt="" /> */}
          <Link to="/">
            <p className="title">Al Haderech | על הדרך</p>
          </Link>
          <p>
            מתחשק לכם ארוחת בוקר טעימה? קבלו את ארוחות הבוקר האהובות עליכם במהירות ובטריות.
            מארוחות בוקר מקומיות ועד לטעמים בינלאומיים, אנו מביאים את המנות הכי טובות ישירות
            לדלת שלכם. הזמינו עכשיו ותיהנו מארוחת בוקר נוחה וטעימה במרחק נגיעה!
          </p>
        </div>
        <div className="footer-content-center">
          <h2>אתר</h2>
          <ul>
            <a href="#">
              <li>אתר הבית</li>
            </a>
            <a href="#" onClick={handleOrderNow}>
              <li>המוצרים שלנו</li>
            </a>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>דברו איתנו</h2>
          <ul>
          <li>
              <a
                href="https://wa.me/972542545616"  
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp size={24} style={{ marginRight: '8px' }} /> WhatsApp
              </a>
            </li>   
            <li>
              <a href="mailto:alhadearech.customerservice@gmail.com">
                alhadearech.customerservice@gmail.com
              </a>
            </li>
              </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        2024 © על הדרך - כל הזכויות שמורות | Al Haderech
      </p>
    </div>
  );
};

export default Footer;
