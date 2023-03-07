import React from 'react'
import "./Header.css"

export default function Header() {
  return (
    <div className="container">
        <div className="logo_contain">
            <img src="./logo.png"></img>
            <h3>My Home</h3>
        </div>
        <div className="logo_contain">
            <img src="../../../public/vite.jpeg" ></img>
            <p>Trương Huy Thái</p>
        </div>
    </div>
  )
}
