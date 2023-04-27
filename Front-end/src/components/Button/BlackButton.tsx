import React from 'react'
import './Button.css'
export default function Button(props: any) {
  return (
    <button type="button" className="black_btn" onClick={props.onClick}>
      {props.children}
    </button>
  )
}
