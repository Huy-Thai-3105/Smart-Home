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
  houseID : any 
}) {

    const[name, setName] = React.useState("")
    const [houseId, setHouseId] = React.useState("")
    const [click,setClick] = React.useState(false)
    React.useEffect(() => {
        setHouseId(props.houseID);
      }, [props.houseID]);
      
    React.useEffect(() => {
        if (name){
            const createNewRoom = async () => {
              const data = JSON.stringify({
                Roomname : name,
                HouseID : houseId
              })
              console.log(data)
        
              const config = {
                method: 'post',
                url: 'http://localhost:3000/room/create',
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
              if (name == '') alert('please enter all infomation')
              else {
                createNewRoom()
                setClick(false)
              }
            }
        }
    }, [click])
  return (
    <Form
      displayModal={props.displayModal}
      setDisplayModal={props.setDisplayModal}
    >
      <div className="window grow p-6">
      <InputBlue
          label="Room name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></InputBlue>
    

        <div className="Row">
          <RedButton
            onClick={() => {
              props.setDisplayModal(false)
              setName('')
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
            Add new Room
          </BlueButton>
        </div>
      </div>
    </Form>
  )
}
