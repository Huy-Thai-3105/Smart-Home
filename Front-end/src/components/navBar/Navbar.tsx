import React, { useState } from 'react'
import './navbar.css'
import { To, useNavigate } from 'react-router-dom'

export default function Navbar({ name, src, link, active, setActive }) {
  const tmp = window.location.pathname
  const toggleActive = () => {
    let a = {
      '/room': 0,
      '/light': 0,
      '/air': 0,
      '/door':0,
      '/pump': 0,
      '/account': 0
    }
    a[link] = 1
    setActive(a)  
  }

  let navigate = useNavigate()
  const routeChange = () => {
    navigate(link)
  }
  console.log(tmp)
  console.log(link)
  
  console.log(active[tmp])
  return (
    <div
      className={(active[tmp] === 1 && tmp === link) ? 'contain_element_active' : 'contain_element'}
      onClick={toggleActive}
    >
      <div
        className="nav"
        onClick={() => {
          routeChange()
        }}
      >
        <img className="img__1" src={src}></img>
        {name == 'Logout' ? (
          <p className="p_size_red">{name}</p>
        ) : (
          <p className="p_size">{name}</p>
        )}
      </div>
    </div>
  )
}
