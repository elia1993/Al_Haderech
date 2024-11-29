import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import axios from 'axios';
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/assets';

const MyOrders = () => {
  const [data, setData] = useState([]);
  const { url, token, currency } = useContext(StoreContext);

  const fetchOrders = async () => {
    const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
    setData(response.data.data);
    console.log(response.data.data);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
      const intervalId = setInterval(fetchOrders, 10000); 
      return () => clearInterval(intervalId);
    }
  }, [token]);

  return (
    <div className='my-orders'>
      <h2>הזמנות שלי</h2>
      <div className="container">
        {data.map((order, index) => {
          return (
            <div key={index} className='my-orders-order'>
              <p>
                {order.items.map((item, itemIndex) => {
                  return (
                    <span key={itemIndex} className="item-display">
                      <img src={url + "/images/" + item.image} alt={item.name} className="item-image" />
                      <p className='itemName'>{item.name} {item.quantity}x </p>
                      {itemIndex < order.items.length - 1 ? ", " : ""}
                    </span>
                  );
                })}
                              {order.bentoItems && order.bentoItems.length > 0 && (
                <div className="bento-items">
                  {order.bentoItems.map((bento, bentoIndex) => {
                    return (
                      <div key={bentoIndex} className="bento-item">
                        {/* Display Bento Item Image and Name */}
                        <div className="bento-item-details">
                          <img src={bento.image} alt={bento.itemName} className="bento-image" />
                          <p><b>{bento.itemName}</b></p>
                        </div>
                        {/* Display SubItems of Bento Item */}
                        <div className="sub-items">
                          <p>{bento.subItems.map((subItem, subIndex) => {
                            return subIndex === bento.subItems.length - 1
                              ? subItem.name
                              : subItem.name + ", "; 
                          })}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              </p>
              {/* Display BentoItems with Images */}

              <p>{currency} {order.amount}.00</p>
              <p><span>&#x25cf;</span> <b>{order.status}</b></p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
