import React from 'react'
import Room_component from '../../components/Room/Room_component'
import '../../style/room.css'
import RoomModal from '../../components/Modal/RoomModal/RoomModal'
import BlueButton from '../../components/Button/BlueButton'
import AddRoom from '../../components/Modal/RoomModal/AddRoomModal'
export default function Room() {
  const [allRoom, setAllRoom] = React.useState([])
  const [allHouse, setAllHouse] = React.useState([])

  const [device, setDevide] = React.useState([])
  const [roomId, setRoomID] = React.useState("")
  const [displayModal, setDisplayModal] = React.useState(false)
  const [displayModalAdd, setDisplayModalAdd] = React.useState(false)

  const [houseID, setHouseID] = React.useState('')

  React.useEffect(() => {
      const getHouse = async () => {
        const resp = await fetch(`http://localhost:3000/house/all`)

        if (!resp.ok) {
          alert('Something wrong')
        }

        const json = await resp.json()
        setAllHouse(json['houses'])
      }

      getHouse()

  }, [])

  React.useEffect(() => {
    if (houseID){
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
    <div className='contain__allRoom'>
        <div className='row_contain'>
      <select
          className="shadow-md border-blue-gray-200 text-blue-gray-700 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 disabled:bg-blue-gray-50 peer h-full w-full rounded-[7px] border border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal outline outline-0 transition-all placeholder-shown:border empty:!bg-red-500 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 select_size"
          value={houseID}
          onChange={(e) => setHouseID(e.target.value)}
        >
          {Array.isArray(allHouse) &&
            allHouse.map((option) => (
              <option
                value={option['ID']}
                onClick={() => {
                  setRoomID(option['ID'])
                  console.log(option['ID'])
                }}
              >
                {option['Housename']}
              </option>
            ))}
          <label className="before:content[' '] after:content[' '] text-blue-gray-400 before:border-blue-gray-200 after:border-blue-gray-200 peer-placeholder-shown:text-blue-gray-500 peer-disabled:peer-placeholder-shown:text-blue-gray-500 pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent"></label>
        </select>
        <BlueButton onClick = {() =>{setDisplayModalAdd(true)}}>Add new room</BlueButton>
      </div>
      <div className="contain__room">
        {Array.isArray(allRoom) && allRoom.map((room) => (
          <div key={room['ID']} onClick={() => setDisplayModal(true)}>
            <Room_component room_name={room["Roomname"]} num_device={room["Total"]} num_device_on={room["Device_ON"]} onClick={() => {setDisplayModal(true)}}></Room_component>
          </div>
        ))}

        <RoomModal
          displayModal={displayModal}
          setDisplayModal={setDisplayModal}
          roomId = {roomId}
        />
        <AddRoom
            displayModal = {displayModalAdd}
            setDisplayModal = {setDisplayModalAdd}
            houseID = {houseID}
        />
      </div>
    </div>

  )
}
