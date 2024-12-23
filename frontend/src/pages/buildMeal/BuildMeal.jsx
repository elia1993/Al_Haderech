import React, { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import './BuildMeal.css';
import eggImage from './media/egg.png';
import tuna from './media/tuna.png';
import carrots from './media/carrots.png';
import corn from './media/corn.png';
import labneh from './media/labneh.png';
import hummus from './media/Hummus.png';
import potato from './media/potato.png';
import scrambledEgg from './media/scrambled_egg.png';
import avocadoImage from './media/Avocado.png';
import closed_bento from './media/closed_bento_box.webp';
import { StoreContext } from '../../Context/StoreContext';

const BuildMeal = () => {
  // State for each spot in the box
  const [spot1, setSpot1] = useState(null);
  const [spot2, setSpot2] = useState(null);
  const [spot3, setSpot3] = useState(null);
  
  // State for controlling the popup
  const [openPopup, setOpenPopup] = useState(false);

  const { addBentoToCart } = useContext(StoreContext);
  const totalPrice = (spot1?.price || 0) + (spot2?.price || 0) + (spot3?.price || 0);
  const createBentoCartItem = () => {
    if (!spot1 || !spot2 || !spot3) {
      alert('נא לבחור כל התוספות/אפשריות');
      return;
    }

    const overall_price = spot1.price + spot2.price + spot3.price;
    const sub_items = [spot1.name, spot2.name, spot3.name];
    const image = closed_bento;
    const item = 'קופסת ארוחת בוקר';

    addBentoToCart({ item: item, image: image, sub_items: sub_items, price: overall_price });
    
    // Open the popup after adding to the cart
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
    setSpot1(null);
    setSpot2(null);
    setSpot3(null);
  };

  /**
   *  1 egg
   *  cherry tomato
   *  cut cucumber
   *  tomato + cucumber
   *  yellow cheese (3emek)
   *  white cheese dip
   *  begala
   *  crackers
   *  4 mini sausage
   *  orange slices
   *  mini carrots
   *  martadila
   *  cottage
   */
  const options = [
    { name: 'תירס', image: corn, price: 3 },
    { name: 'טונה', image: tuna,price: 5 },
    { name: 'אבוקדו', image: avocadoImage, price: 5 },
    { name: 'לבנה', image: labneh, price: 3 },
    { name: 'תפוח אדמה מבושל', image: potato,price: 2 }
  ];

  /**
   * 2 eggs + cherry tomato
   * sandwich - precut / prosot:
   *    peanut butter
   *    jam
   *    yellow cheese
   *    labani
   *    nutella
   *    peanut butter + jam
   * white rice
   * sausages
   */
  const main_dish = [
    { name: '3 ביצים' , image: eggImage, price: 8},
    {name: 'ביצה מקושקשת', image: scrambledEgg, price: 8},
    {name: 'חומוס', image: hummus, price: 5}

  ];
  const handleMainDish = (option) => {
    setSpot1(option);
    if (option.name === 'ביצים') {
      setIsDropping(true);
      setTimeout(() => setIsDropping(false), 1500); 
    }
  };

  const handleSelectOption = (spot, option) => {
    if (spot === 2) {
      setSpot2(option);
    } else if (spot === 3) {
      setSpot3(option);
    }
  };

  return (
    <div className="meal-main-container">
      <h1>לבנות הארוחה שלי</h1>
      <div className="box-container">
        <Box sx={{ minWidth: 100 }}>
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="main-dish-select">
              בחירה 1
            </InputLabel>
            <NativeSelect
              defaultValue={null}
              inputProps={{
                name: 'dish',
                id: 'main-dish-select',
              }}
              autoWidth
              onChange={(e) => {
                const selectedDish = main_dish.find(dish => dish.name === e.target.value);
                handleMainDish(selectedDish);
              }}
            >
              {[<option value='' disabled selected ></option>, ...main_dish.map((option) => (
                <option key={option.name} value={option.name}>
                  {option.name} ₪{option.price}
                </option>
              ))]}
            </NativeSelect>
          </FormControl>
        </Box>

        <Box sx={{ minWidth: 100 }}>
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="spot2-select">
              בחירה 2
            </InputLabel>
            <NativeSelect
              defaultValue=""
              inputProps={{
                name: 'dish',
                id: 'spot2-select',
              }}
              autoWidth
              onChange={(e) => {
                const selectedOption = options.find(option => option.name === e.target.value);
                handleSelectOption(2, selectedOption);
              }}
            >
              {[<option value='' disabled selected ></option>, ...options.map((option, index) => (
                <option key={index} value={option.name}>
                  {option.name} ₪{option.price}
                </option>
              ))]}
            </NativeSelect>
          </FormControl>
        </Box>

        <Box sx={{ minWidth: 100 }}>
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="spot3-select" >
              בחירה 3
            </InputLabel>
            <NativeSelect
              defaultValue=""
              inputProps={{
                name: 'dish',
                id: 'spot3-select',
              }}
              autoWidth
              onChange={(e) => {
                const selectedOption = options.find(option => option.name === e.target.value);
                handleSelectOption(3, selectedOption);
              }}
            >
              {[<option value='' disabled selected ></option>, ...options.map((option, index) => (
                <option key={index} value={option.name}>
                  {option.name} ₪{option.price}
                </option>
              ))]}
            </NativeSelect>
          </FormControl>
        </Box>
      </div>

      {/* Food container with background image */}
      <div className="food-container">
        {/* Spot 1 */}
        <div className={`lunch-box-spot1 ${spot1 ? 'filled' : ''}`} style={{ backgroundImage: `url(${spot1?.image})` }}>
          {!spot1 && 'בחירה 1'}
        </div>

        {/* Spot 2 */}
        <div className={`lunch-box-spot2 ${spot2 ? 'filled' : ''}`} style={{ backgroundImage: `url(${spot2?.image})` }}>
          {!spot2 && 'בחירה 2'}
        </div>

        {/* Spot 3 */}
        <div className={`lunch-box-spot3 ${spot3 ? 'filled' : ''}`} style={{ backgroundImage: `url(${spot3?.image})` }}>
          {!spot3 && 'בחירה 3'}
        </div>
      </div>

      <div className="total-price">
        <h3>סה״כ: ₪{totalPrice}</h3>
      </div>
      <button onClick={createBentoCartItem} className="option-button">
        הוספה לעגלה
      </button>

      {/* Popup Dialog */}
      <Dialog open={openPopup} onClose={handleClosePopup}>
        <DialogContent>
          <p> הפריטים התוספו לעגלה בהצלחה</p>
        </DialogContent>
        <DialogActions>
          <Button className='dialog-X' onClick={handleClosePopup} color="primary">
            סגור
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BuildMeal;
