import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='navbar'>
      <Link to='/'><p className='title'>Foodzip</p><code>Admin</code></Link>
      {/* <img className='logo' src={assets.logo} alt="" /> */}
      <img className='profile' src={assets.profile_image} alt="" />
    </div>
  )
}

export default Navbar
