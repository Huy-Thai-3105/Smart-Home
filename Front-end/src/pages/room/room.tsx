import React from 'react'
import Room_component from '../../components/Room/Room_component'
import "../../style/room.css"
export default function Room() {
  return (
    <div className="contain">
        <div className="contain_content">
            <Room_component></Room_component>
        </div>
    </div>
  )
}
