import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext'
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const PlaceOrder = () => {

    const [payment, setPayment] = useState("cod")
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        entry: "",
        floor: "",
        apartment: "",
        Building_entry_code: "",
        city: "",
        zipcode: "",
        phone: "",
        notes: "",
    })

    const { getTotalCartAmount, token, food_list, cartItems, url, setCartItems,currency,deliveryCharge } = useContext(StoreContext);

    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({ ...data, [name]: value }))
    }

    const placeOrder = async (e) => {
        e.preventDefault()
        let orderItems = [];
        food_list.map(((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo)
            }
        }))
        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + deliveryCharge,
        }
        if (payment === "stripe") {
            let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
            if (response.data.success) {
                const { session_url } = response.data;
                window.location.replace(session_url);
            }
            else {
                toast.error("Something Went Wrong")
            }
        }
        else{
            let response = await axios.post(url + "/api/order/placecod", orderData, { headers: { token } });
            if (response.data.success) {
                navigate("/myorders")
                toast.success(response.data.message)
                setCartItems({});
            }
            else {
                toast.error("Something Went Wrong")
            }
        }

    }

    useEffect(() => {
        if (!token) {
            toast.error("to place an order sign in first")
            navigate('/cart')
        }
        else if (getTotalCartAmount() === 0) {
            navigate('/cart')
        }
    }, [token])

    return (
        <form onSubmit={placeOrder} className='place-order'>
<div className="place-order-left">
    <p className='title'>כתובת משלוח</p>
    
    <div className="multi-field">
        <div className="input-group">
            <label htmlFor="firstName">שם פרטי</label>
            <input type="text" id="firstName" name='firstName' onChange={onChangeHandler} value={data.firstName} placeholder='Enter your first name' required />
        </div>
        <div className="input-group">
            <label htmlFor="lastName">שם משפחה</label>
            <input type="text" id="lastName" name='lastName' onChange={onChangeHandler} value={data.lastName} placeholder='Enter your last name' required />
        </div>
    </div>
    
    <div className="input-group">
        <label htmlFor="email">מייל</label>
        <input type="email" id="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Enter your email address' required />
    </div>
    
    <div className="input-group">
        <label htmlFor="street">רחוב</label>
        <input type="text" id="street" name='street' onChange={onChangeHandler} value={data.street} placeholder='Enter your street' required />
    </div>
    <div className="multi-field">
        <div className="input-group">
            <label htmlFor="entry" className="small-label">כניסה</label>
            <input type="text" id="entry" name="entry" onChange={onChangeHandler} value={data.entry} placeholder="כניסה" />
        </div>
        <div className="input-group">
            <label htmlFor="floor" className="small-label">קומה</label>
            <input type="text" id="floor" name="floor" onChange={onChangeHandler} value={data.floor} placeholder="קומה" />
        </div>
        <div className="input-group">
            <label htmlFor="apartment" className="small-label">דירה</label>
            <input type="text" id="apartment" name="apartment" onChange={onChangeHandler} value={data.apartment} placeholder="דירה" />
        </div>
    </div>
    <div className="multi-field">
        <div className="input-group">
            <label htmlFor="city">עיר / ישוב</label>
            <input type="text" id="city" name='city' onChange={onChangeHandler} value={data.city} placeholder='Enter your city' required />
        </div>
    </div>
    
    <div className="multi-field">
        <div className="input-group">
            <label htmlFor="zipcode">מיקוד</label>
            <input type="text" id="zipcode" name='zipcode' onChange={onChangeHandler} value={data.zipcode} placeholder='Enter your zip code' required />
        </div>
    </div>
    <div className="input-group">
        <label htmlFor="phone">מספר טלפון</label>
        <input type="text" id="phone" name='phone' onChange={onChangeHandler} value={data.phone} placeholder='Enter your phone number' required />
    </div>
    
    <div className="input-group">
        <label htmlFor="notes">הערות לשליח</label>
        <input type="text" id="notes" name='notes' onChange={onChangeHandler} value={data.notes} placeholder='הערות לשליח'/>
    </div>
</div>

            <div className="place-order-right">
                <div className="cart-total">
                    <h2>סך הכל בעגלת הקניות</h2>
                    <div>
                        <div className="cart-total-details"><p>סכום ביניים</p><p>{currency}{getTotalCartAmount()}</p></div>
                        <hr />
                        <div className="cart-total-details"><p>דמי משלוח</p><p>{currency}{getTotalCartAmount() === 0 ? 0 : deliveryCharge}</p></div>
                        <hr />
                        <div className="cart-total-details"><b>סה״כ</b><b>{currency}{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + deliveryCharge}</b></div>
                    </div>
                </div>
                <div className="payment">
                <a className='place-order-submit' href="https://www.bitpay.co.il/app/me/7C724568-7F69-1681-85F9-7F3EC00EE4629598">
  לתשלום <strong>Bit</strong>
</a>
                </div>
                <div></div>

            </div>
        </form>
    )
}

export default PlaceOrder
