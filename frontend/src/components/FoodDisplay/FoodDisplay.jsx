import React, { useContext } from 'react';
import './FoodDisplay.css';
import FoodItem from '../FoodItem/FoodItem';
import { StoreContext } from '../../Context/StoreContext';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className="food-display" id="food-display">
    <h2>תפריט</h2>
    <div className="food-display-list">
      {food_list
        .filter(item => item.category !== 'box' && item.category !== 'small_dish') // Exclude unwanted categories
        .map(item => {
          if (category === 'All' || category === item.category) {
            return (
              <FoodItem
                key={item._id}
                image={item.image}
                name={item.name}
                desc={item.description}
                price={item.price}
                id={item._id}
              />
            );
          }
          return null; // To avoid warnings when no item is returned
        })}
    </div>
  </div>
  
  );
};

export default FoodDisplay;
