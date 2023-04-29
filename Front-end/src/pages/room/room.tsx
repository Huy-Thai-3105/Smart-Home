import React from 'react'
import Room_component from '../../components/Room/Room_component'
import '../../style/room.css'
import RoomModal from '../../components/Modal/RoomModal/RoomModal'
import BlueButton from '../../components/Button/BlueButton'
import AddRoom from '../../components/Modal/RoomModal/AddRoomModal'
import { CredentialsInterface, UserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { getCookie } from '../../utilities/GetRoleCookie'

export default function Room() {
  const [allRoom, setAllRoom] = React.useState([])
  const [allHouse, setAllHouse] = React.useState([])

  const [device, setDevide] = React.useState([])
  const [roomId, setRoomID] = React.useState('')
  const [displayModal, setDisplayModal] = React.useState(false)
  const [displayModalAdd, setDisplayModalAdd] = React.useState(false)

  const [houseID, setHouseID] = React.useState('')

  const [role, setRole] = React.useState(getCookie('role'))
  const navi = useNavigate()
  if (role != 'CU') {
    navi('/login')
  }

  React.useEffect(() => {
    const getHouse = async () => {
      const resp = await fetch(`http://localhost:3000/house/all`)

      if (!resp.ok) {
        alert('Something wrong')
      }

      const json = await resp.json()
      setAllHouse(json['houses'])
      setHouseID(json['houses'][0].ID)
    }

    getHouse()
  }, [])

  React.useEffect(() => {
    if (houseID) {
      const getRoom = async (houseID) => {
        const resp = await fetch(`http://localhost:3000/room/all/${houseID}`)

        if (!resp.ok) {
          alert('Something wrong')
        }

        const json = await resp.json()
        setAllRoom(json['rooms'])
      }

      getRoom(houseID)
    }
  }, [houseID])

  return (
    <div className="contain__allRoom">
      <div className="row_contain">
        <select
          className="border-blue-gray-200 text-blue-gray-700 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 disabled:bg-blue-gray-50 select_size peer h-full w-full rounded-[7px] border border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal shadow-md outline outline-0 transition-all placeholder-shown:border empty:!bg-red-500 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0"
          value={houseID}
          onChange={(e) => setHouseID(e.target.value)}
        >
          {Array.isArray(allHouse) &&
            allHouse.map((option) => (
              <option
                value={option['ID']}
                onClick={() => {
                  console.log(option['ID'])
                }}
              >
                {option['Housename']}
              </option>
            ))}
        </select>
        <BlueButton
          onClick={() => {
            setDisplayModalAdd(true)
          }}
        >
          Add new room
        </BlueButton>
      </div>
      <div className="contain__room">
        {Array.isArray(allRoom) &&
          allRoom.map((room) => (
            <div
              key={room['ID']}
              onClick={() => {
                setDisplayModal(true)
                setRoomID(room['ID'])
              }}
            >
              <Room_component
                room_name={room['Roomname']}
                num_device={room['Total']}
                num_device_on={room['Device_ON']}
                onClick={() => {
                  setDisplayModal(true)
                }}
              ></Room_component>
            </div>
          ))}

        <RoomModal
          displayModal={displayModal}
          setDisplayModal={setDisplayModal}
          roomId={roomId}
        />
        <AddRoom
          displayModal={displayModalAdd}
          setDisplayModal={setDisplayModalAdd}
          houseID={houseID}
        />
      </div>
    </div>
  )
}
