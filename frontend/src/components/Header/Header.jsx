import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import { FaCar } from 'react-icons/fa';  // Importing a car icon from react-icons

const Header = () => {
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
        <div className='header'>
            <div className='header-contents'>
                <h2 className="header-title">
                    <FaCar className="car-icon" />
                    <span className="on-the-way-text">על הדרך</span>
                </h2>
                <p className="header-description">
                    הבוקר שלכם יכול להיות הרבה יותר קל, נעים ומשמח – עם על הדרך! אנחנו מביאים את המוצרים הטריים והטעימים שאתם אוהבים, ישירות עד לבית, לעסק, לגני ילדים, צהרונים ובתי ספר – כל מה שצריך כדי להתחיל את היום ברגל ימין!
                </p>
                <p className="header-description">
                    אין צורך לצאת מהבית או מהמשרד – עם על הדרך, כל ארוחת בוקר, הפסקת עשר או נשנוש במהלך היום יהיו מתוקתקים, טעימים ובריאים. אנחנו דואגים שהמקרר תמיד יהיה מלא במוצרים טריים: לחמים חמים מהמאפייה, מוצרי חלב איכותיים, פירות וירקות רעננים, מאפים מעולים וכל מה שצריך כדי שהיום שלכם יתחיל בצורה הטובה ביותר.
                </p>
                <button 
                    onClick={handleOrderNow} 
                    className="cta-button"
                >
                    הזמינו עכשיו
                </button>  
                </div>
            <div className="header-image">
            <img src="" alt="Delivery vehicle" />
            </div>
        </div>
    );
};

export default Header;
