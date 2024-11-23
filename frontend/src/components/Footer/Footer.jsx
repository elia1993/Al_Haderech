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
            <p>מתחשק לכם ארוחת בוקר טעימה? קבלו את ארוחות הבוקר האהובות עליכם במהירות ובטריות. מארוחות בוקר מקומיות ועד לטעמים בינלאומיים, אנו מביאים את המנות הכי טובות ישירות לדלת שלכם. הזמינו עכשיו ותיהנו מארוחת בוקר נוחה וטעימה במרחק נגיעה!</p>
        </div>
        <div className="footer-content-center">
            <h2>אתר</h2>
            <ul>
                <a href='#'><li>אתר הבית</li></a>
                <a href='#explore-menu'><li>מוצרים שלנו</li></a>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>דברו איתנו</h2>
            <ul>
                <li>+91-9082028676</li>
                <li>contact@Al Haderech | על הדרך</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright"> 2024 ©  על הדרך  -  כל הזכויות שמורות | Al Haderech</p>
    </div>
  )
}

export default Footer
