import React, { useState } from 'react'
import Form from '../../Form/Form'
import BlueButton from '../../Button/BlueButton'
import InputBlue from '../../InputBox/InputBlue'
import RedButton from '../../Button/RedButton'
import axios from 'axios'
import Table from '../../Table/Table'

export default function RoomModal(props: {
  displayModal: boolean
  setDisplayModal: any
  roomId : any 
}) {
  const [roomID, setRoomID] = React.useState(0)
  const [device, setDevide] = React.useState("[]")

  React.useEffect(() => {
    setRoomID(props.roomId);
    console.log(roomID)
  }, [props.roomId]);
  
  React.useEffect(() => {
    if (roomID != 0 && device == "[]"){
      const getDeviceRoom = async (roomID) => {
        const resp = await fetch(`http://localhost:3000/room/device/${roomID}`)
  
        if (!resp.ok) {
          alert('Something wrong')
        }
  
        const json = await resp.json()
        if (json['result'] == 'success') setDevide(json['room'])
      }
      console.log(device)
      getDeviceRoom(roomID)
    }
  }, [[props.roomId]])


  return (
    <Form
      displayModal={props.displayModal}
      setDisplayModal={props.setDisplayModal}
    >
      <div className="window grow p-4 gap-0">
      <div className='flex flex-row justify-end'>
        <button onClick={() => {props.setDisplayModal(false)}} type="button" className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
          <span className="sr-only">Close menu</span>
          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
       <Table>
          <thead>
            <tr>
              <th>ID</th>
              {/* <th>Light </th> */}
              <th>Device name</th>
              <th>Device Status</th>
              <th>Auto</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(device) && device.map((device: any) => (
                <tr key={device.ID}>
                  <td>{device.ID}</td>
                  <td className="color_blue">{device.Devicename}</td>
                  <td className="color_red">{device.Device_Status}</td>
                  <td>{device.Mode}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </Form>
  )
}
