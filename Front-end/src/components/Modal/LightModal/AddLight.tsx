import React, { useState } from 'react'
import Form from '../../Form/Form'
import BlueButton from '../../Button/BlueButton'
import InputBlue from '../../InputBox/InputBlue'
import RedButton from '../../Button/RedButton'
import axios from 'axios'

export default function ModalCreate(props: {
  displayModal: boolean
  setDisplayModal: any
}) {
  const [id, setId] = React.useState('')
  const [name, setName] = React.useState('')
  const [roomID, setRoomID] = React.useState('')
  const [click, setClick] = React.useState(false)
  const [allRoom, setAllRoom] = React.useState([])

  React.useEffect(() => {
    const getRoom = async () => {
      const resp = await fetch(`http://localhost:3000/room/all/2`)

      if (!resp.ok) {
        alert('Something wrong')
      }

      const json = await resp.json()
      if (json['result'] == 'success') setAllRoom(json['rooms'])
    }
    getRoom()
  }, [])

  React.useEffect(() => {
    const createNewLigth = async () => {
      var today = new Date(),
        date =
          today.getFullYear() +
          '-' +
          (today.getMonth() + 1) +
          '-' +
          today.getDate()
      const data = JSON.stringify({
        ID: id,
        Devicename: name,
        Device_Status: 'off',
        Mode: 'manual',
        Day_add: date,
        RoomID: roomID,
      })
      console.log(data)

      const config = {
        method: 'post',
        url: 'http://localhost:3000/light/create',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      }

      const respone = await axios(config)
      if (respone['mesage'] == 'id not exist or something wrong happened') {
        alert('Light code is existed')
      }
    }
    if (click === true) {
      if (id == '' || name == '') alert('please enter all infomation')
      else {
        createNewLigth()
        setClick(false)
      }
    }
  }, [click])
  return (
    <Form
      displayModal={props.displayModal}
      setDisplayModal={props.setDisplayModal}
    >
      <div className="window grow p-4 ">
        <InputBlue
          label="Light name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></InputBlue>
        <InputBlue
          label="Light code"
          value={id}
          onChange={(e) => setId(e.target.value)}
        ></InputBlue>
        {/* <Select
          option = {allRoom}
        ></Select> */}

        <select
          className="border-blue-gray-200 text-blue-gray-700 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 disabled:bg-blue-gray-50 peer h-full w-full rounded-[7px] border border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal outline outline-0 transition-all placeholder-shown:border empty:!bg-red-500 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0"
          value={roomID}
          onChange={(e) => setRoomID(e.target.value)}
        >
          {Array.isArray(allRoom) &&
            allRoom.map((option) => (
              <option
                value={option['ID']}
                onClick={() => {
                  setRoomID(option['ID'])
                  console.log(option['ID'])
                }}
              >
                {option['Roomname']}
              </option>
            ))}
          <label className="before:content[' '] after:content[' '] text-blue-gray-400 before:border-blue-gray-200 after:border-blue-gray-200 peer-placeholder-shown:text-blue-gray-500 peer-disabled:peer-placeholder-shown:text-blue-gray-500 pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent"></label>
        </select>

        <div className="Row">
          <RedButton
            onClick={() => {
              props.setDisplayModal(false)
              setId('')
              setName('')
              setRoomID('')
            }}
          >
            Close
          </RedButton>
          <BlueButton
            onClick={() => {
              props.setDisplayModal(false)
              setClick(true)
            }}
          >
            Add new Light
          </BlueButton>
        </div>
      </div>
    </Form>
  )
}
