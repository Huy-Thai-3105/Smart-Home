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
  roomId: any
}) {
  const [roomID, setRoomID] = React.useState(0)
  const [device, setDevide] = React.useState('[]')
  const [click, setClick] = React.useState(false)
  React.useEffect(() => {
    setRoomID(props.roomId)
    // console.log(roomID)
  }, [props.roomId])

  React.useEffect(() => {
    if (roomID != 0) {
      console.log(props.roomId)
      const getDeviceRoom = async (roomID) => {
        const resp = await fetch(`http://localhost:3000/room/device/${roomID}`)

        if (!resp.ok) {
          alert('Something wrong')
        }

        const json = await resp.json()
        if (json['result'] == 'success') setDevide(json['room'])
      }
      getDeviceRoom(roomID)
    }
  }, [roomID])

  React.useEffect(() => {
    if (click == true) {
      async function deleteRoom() {
        await fetch(`http://localhost:3000/room/${roomID}`, {
          method: 'DELETE',
        })
      }
      console.log('DELETE DEVICE', { roomID })
      deleteRoom()
    }
  }, [click])
  return (
    <Form
      displayModal={props.displayModal}
      setDisplayModal={props.setDisplayModal}
    >
      <div className="window grow gap-0 p-4">
        <div className="flex flex-row justify-end">
          <button
            onClick={() => {
              props.setDisplayModal(false)
            }}
            type="button"
            className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 hover:bg-gray-100 hover:text-gray-500"
          >
            <span className="sr-only">Close menu</span>
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
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
            {Array.isArray(device) &&
              device.map((device: any) => (
                <tr key={device.ID}>
                  <td>{device.ID}</td>
                  <td className="color_blue">{device.Devicename}</td>
                  <td className="color_red">{device.Device_Status}</td>
                  <td>{device.Mode}</td>
                </tr>
              ))}
          </tbody>
        </Table>
        <div className="flex flex-row justify-end">
          <RedButton onClick={() => setClick(true)}>Delete Room</RedButton>
        </div>
      </div>
    </Form>
  )
}
