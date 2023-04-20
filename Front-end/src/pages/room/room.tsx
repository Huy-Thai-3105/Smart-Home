import React from 'react'
import Room_component from '../../components/Room/Room_component'
import '../../style/room.css'
import RoomModal from '../../components/Modal/RoomModal/RoomModal'
import BlueButton from '../../components/Button/BlueButton'
export default function Room() {
  const [allRoom, setAllRoom] = React.useState([])
  const [device, setDevide] = React.useState([])
  const [roomId, setRoomID] = React.useState("")
  const [displayModal, setDisplayModal] = React.useState(false)

  React.useEffect(() => {
    const getRoom = async () => {
      const resp = await fetch(`http://localhost:3000/room/all`)

      if (!resp.ok) {
        alert('Something wrong')
      }

      const json = await resp.json()
      if (json.status == 200) setAllRoom(json['rooms'])
    }
    getRoom()
  }, [])

  React.useEffect(() => {
    if (roomId){
      const getAllDevice = async (roomId : any) => {
        const resp = await fetch(`http://localhost:3000/room/${roomId}`)
  
        if (!resp.ok) {
          alert('Something wrong')
        }
  
        const json = await resp.json()
        if (json.status == 200) setDevide(json['devices'])
      }
      getAllDevice(roomId)
    }
  }, [])

  return (
    <div className="contain__room">
      {Array.isArray(allRoom) && allRoom.map((room) => (
          <Room_component room_name="Living room" num_device="10" num_device_on="2" onClick={() => {setDisplayModal(true)}}></Room_component>
      ))}
      <Room_component room_name="Bed room" num_device="10" num_device_on="2"></Room_component>
      <Room_component room_name="Bed room" num_device="10" num_device_on="2"></Room_component>
      {/* <BlueButton onClick={() => {setDisplayModal(true)}}>abcd</BlueButton> */}
      <RoomModal
        displayModal={displayModal}
        setDisplayModal={setDisplayModal}
      ></RoomModal>
    </div>
  )
}
