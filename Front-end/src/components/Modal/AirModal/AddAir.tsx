import React from 'react'
import Form from '../../Form/Form'
import BlueButton from '../../Button/BlueButton'
import InputBlue from '../../InputBox/InputBlue'
import RedButton from '../../Button/RedButton'
import axios from 'axios'

export default function ModalCreate(props: {
  displayModal: boolean
  setDisplayModal: any
  houseID: any
}) {
  const [id, setId] = React.useState('')
  const [name, setName] = React.useState('')
  const [roomID, setRoomID] = React.useState('')
  const [click, setClick] = React.useState(false)
  const [allRoom, setAllRoom] = React.useState([])

  React.useEffect(() => {
    if (props.houseID) {
      const getRoom = async () => {
        const resp = await fetch(
          `http://localhost:3000/room/all/${props.houseID}`
        )

        if (!resp.ok) {
          alert('Something wrong')
        }

        const json = await resp.json()
        if (json['result'] == 'success') setAllRoom(json['rooms'])
      }
      getRoom()
    }
  }, [props.houseID])

  React.useEffect(() => {
    const createNewAir = async () => {
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
        Temperature_D: '0',
        Humidity_D: '0',
      })

      console.log(data)

      const config = {
        method: 'post',
        url: 'http://localhost:3000/aircondition',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      }

      const respone = await axios(config)
      console.log(respone)
      if (respone['mesage'] == 'id not exist or something wrong happened') {
        alert('Air code is existed')
      }
    }
    if (click === true) {
      if (id == '' || name == '') alert('please enter all infomation')
      else {
        createNewAir()
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
          label="Air condition name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></InputBlue>
        <InputBlue
          label="Air condition code"
          value={id}
          onChange={(e) => setId(e.target.value)}
        ></InputBlue>
        <select
          className="border-blue-gray-200 text-blue-gray-700 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 disabled:bg-blue-gray-50 peer h-full w-full rounded-[7px] border border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal outline outline-0 transition-all placeholder-shown:border empty:!bg-red-500 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0"
          value={roomID}
          onChange={(e) => setRoomID(e.target.value)}
        >
          {Array.isArray(allRoom) &&
            allRoom.map((option) => (
              <option
                key={option['ID']}
                value={option['ID']}
                onClick={() => {
                  setRoomID(option['ID'])
                  console.log(option['ID'])
                }}
              >
                {option['Roomname']}
              </option>
            ))}
        </select>
        <div className="Row">
          <RedButton
            onClick={() => {
              props.setDisplayModal(false)
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
            Add Air Condition
          </BlueButton>
        </div>
      </div>
    </Form>
  )
}
