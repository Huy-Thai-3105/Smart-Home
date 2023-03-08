import React from 'react'
import "./navbar.css"
export default function Navbar({name,src}) {
  return (
    <div className='nav'>
        <img src={src}></img>
        <p className='p_size'>{name}</p>
        
    </div>
  )
}
