import React, { useContext, useState } from 'react';
import './FoodDisplay.css';
import FoodItem from '../FoodItem/FoodItem';
import { StoreContext } from '../../Context/StoreContext';
import groceriesImg from '../../assets/groceries.png';
import drinks from '../../assets/drinks.png';

const FoodDisplay = () => {
  const { food_list } = useContext(StoreContext);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [visibleItems, setVisibleItems] = useState(5); // Track the number of visible items

  const categories = [
    { key: 'All', label: 'All', img: null },
    { key: 'Sandwich', label: 'מזון', img: groceriesImg },
    { key: 'drinks', label: 'משקאות', img: drinks },
  ];

  const handleImageClick = (categoryKey) => {
    setSelectedCategory(categoryKey);
  };

  const handleLoadMore = () => {
    setVisibleItems(visibleItems + 5); // Show 5 more items
  };

  return (
    <div className="food-display" id="food-display">
      <h2>תפריט</h2>

      {/* Sorting Menu */}
      <div className="sorting-menu-icons">
        {categories
          .filter((category) => category.img)
          .map((category) => (
            <div
              key={category.key}
              className={`sorting-item ${selectedCategory === category.key ? 'active' : ''}`}
              onClick={() => handleImageClick(category.key)}
            >
              <img src={category.img} alt={category.label} className="sorting-img" />
              <div className="sorting-label">{category.label}</div>
            </div>
          ))}
      </div>

      {/* Food Display */}
      <div className="food-display-list">
        {food_list
          .filter((item) => {
            if (item.category === 'small_dish' || item.category === 'box') {
              return false;
            }
            return selectedCategory === 'All' || item.category === selectedCategory;
          })
          .slice(0, visibleItems) // Limit the number of visible items based on `visibleItems`
          .map((item) => (
            <FoodItem
              key={item._id}
              image={item.image}
              name={item.name}
              desc={item.description}
              price={item.price}
              id={item._id}
            />
          ))}
      </div>

      {/* Load More Button */}
      {visibleItems < food_list.length && (
        <button className="load-more-btn" onClick={handleLoadMore}>
          הצג עוד
        </button>
      )}
    </div>
  );
};

export default FoodDisplay;
