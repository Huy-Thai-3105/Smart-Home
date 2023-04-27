import React from 'react'
import './Room_component.css'
export default function Room_component(props: any) {
  return (
    <div className="contain__all">
      <div className="contain_imageRoom">
        <img className="image_room" src="../living-room.png"></img>
      </div>
      <div className="contain_info">
        <h2>{props.room_name}</h2>
        <p className="num_device">{props.num_device} Devices</p>
        <p className="num_device_on">Device is on: {props.num_device_on}</p>
      </div>
    </div>
  )
}
