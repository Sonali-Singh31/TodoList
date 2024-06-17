import React from 'react'
import logo from '../images/logo.png'
const User = () => {
  return (
    <div className='User'>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="info">
        <p>Todo App</p>
        <a href="#" className='text-blue-500'>Logout!</a>
      </div>
    </div>
  )
}

export default User
