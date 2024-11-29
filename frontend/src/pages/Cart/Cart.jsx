import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url, currency, deliveryCharge, bentoItems, removeBentoFromCart } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>פריט</p> <p>כותרת</p> <p>מחיר</p> <p>כמות</p> <p>סכום</p> <p>למחוק</p>
        </div>
        <br />
        <hr />
        
        {/* Render Food items */}
        {food_list.map((item, index) => { 
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}>
                <div className="cart-items-title cart-items-item">
                  <img src={url + "/images/" + item.image} alt={item.name} />
                  <p>{item.name}</p>
                  <p>{currency}{item.price}</p>
                  <div>{cartItems[item._id]}</div>
                  <p>{currency}{item.price * cartItems[item._id]}</p>
                  <p className='cart-items-remove-icon' onClick={() => removeFromCart(item._id)}>x</p>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}

        {/* Render Bento items */}
        {bentoItems && bentoItems.length > 0 ? (
          bentoItems.map((bento, index) => {
            return (
              <div key={index}>
                <div className="cart-items-title cart-items-item">
                  <img src={bento.image} alt={bento.itemName} />
                  <p>
                    {bento.itemName}
                    <br />
                    {bento.subItems && bento.subItems.length > 0 ? (
                      bento.subItems.map((subItem, subIndex) => {
                        return (
                          <span key={subItem._id}>
                            {subItem.name}
                            {subIndex < bento.subItems.length - 1 ? ", " : ""}
                          </span>
                        );
                      })
                    ) : null}
                  </p>
                  <p>{currency}{bento.price}</p>
                  <div>1</div>
                  <p>{currency}{bento.price}</p>
                  <p className='cart-items-remove-icon' onClick={() => removeBentoFromCart(bento.itemId)}>x</p>
                </div>
                <hr />
              </div>
            );
          })
        ) : null}

      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>סך הכל בעגלת הקניות</h2>
          <div>
            <div className="cart-total-details"><p>סכום ביניים</p><p>{currency}{getTotalCartAmount()}</p></div>
            <hr />
            <div className="cart-total-details"><p> דמי משלוח</p><p>{currency}{getTotalCartAmount() === 0 ? 0 : deliveryCharge}</p></div>
            <hr />
            <div className="cart-total-details"><b>סה״כ</b><b>{currency}{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + deliveryCharge}</b></div>
          </div>
          <button onClick={() => navigate('/order')}>המשך לתשלום</button>
        </div>

        <div className="cart-promocode">
          <div>
            <p>קוד קופון</p>
            <div className='cart-promocode-input'>
              <input type="text" placeholder='קוד קופון' ></input>
                           <button>שלח</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
