import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const LoginPopup = ({ setShowLogin }) => {

    const { setToken, url, loadCartData } = useContext(StoreContext)
    const [currState, setCurrState] = useState("Login");  

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({ ...data, [name]: value }))
    }

    const onLogin = async (e) => {
        e.preventDefault()

        let new_url = url;
        if (currState === "Login") {
            new_url += "/api/user/login";
        } else {
            new_url += "/api/user/register"
        }
        const response = await axios.post(new_url, data);
        if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem("token", response.data.token)
            loadCartData({ token: response.data.token })
            setShowLogin(false)
            console.log("Token being passed to loadCartData:", response.data.token);
        } else {
            toast.error(response.data.message)
        }
    }

    return (

<div className='login-popup'>
    <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currState === "Login" ? "כניסה לחשבון שלי" : "הצטרפות"}</h2> 
            <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
            {currState === "Sign Up" && (
                <>
                    <div className="input-container">
                        <h4>שם מלא</h4>
                        <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='ישראל ישראל' required />
                    </div>
                </>
            )}
            <div className="input-container">
                <h4>אימייל</h4>
                <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Example@gmail.com' />
            </div>

            <div className="input-container">
                <h4>סיסמא</h4>
                <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='*******' required />
            </div>
        </div>
        <button>{currState === "Login" ? "כניסה לחשבון שלי" : "הצטרפות"}</button>
        {currState === "Login"
            ? <p>אין לך חשבון? <span onClick={() => setCurrState('Sign Up')}>להצטרפות</span></p>
            : <p>יש לך חשבון? <span onClick={() => setCurrState('Login')}>כניסה</span></p>
        }
    </form>
</div>

    )
}

export default LoginPopup
