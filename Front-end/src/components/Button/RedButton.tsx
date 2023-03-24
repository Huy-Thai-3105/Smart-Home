import React from 'react'
import './redButton.css'
export default function RedButton(props: any) {
  return (
    <button type="button" className="button-red" onClick={props.onClick}>
      {props.children}
    </button>
  )
}
