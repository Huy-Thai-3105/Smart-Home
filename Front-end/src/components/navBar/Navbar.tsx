import React, { useState } from 'react'
import './navbar.css'
import { To, useNavigate } from 'react-router-dom'

export default function Navbar({ name, src, link }) {
  const [active, setActive] = React.useState(false)
  //const [path, setPath] = React.useState(link)
  const toggleActive = () => {
    setActive(!active)
  }

  let navigate = useNavigate()
  const routeChange = () => {
    navigate(link)
  }

  return (
    <div
      className={!active ? 'contain_element' : 'contain_element_active'}
      onClick={toggleActive}
    >
      <div
        className="nav"
        onClick={() => {
          routeChange()
        }}
      >
        <img className="img__1" src={src}></img>
        <p className="p_size">{name}</p>
      </div>
    </div>
  )
}
