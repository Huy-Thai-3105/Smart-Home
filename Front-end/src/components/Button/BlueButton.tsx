import React from 'react'
import './blueButton.css'
export default function BlueButton(props: any) {
  return (
    <button type="button" className="button-3 " onClick={props.onClick}>
      {props.children}
    </button>
  )
}
