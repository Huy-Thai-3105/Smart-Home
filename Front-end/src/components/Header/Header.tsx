import React from 'react'
import './Header.css'

export default function Header() {
  return (
    <div className="page">
      <div className="container_header">
        <div className="logo_contain">
          <img src="./logo.png"></img>
          <h2>My Home</h2>
        </div>
        <div className="user_contain">
          <img src="./user.png"></img>
          <p>Trương Huy Thái</p>
        </div>
      </div>
    </div>
  )
}
