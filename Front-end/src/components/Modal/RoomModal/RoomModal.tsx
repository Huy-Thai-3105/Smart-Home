import React, { useState } from 'react'
import Form from '../../Form/Form'
import BlueButton from '../../Button/BlueButton'
import InputBlue from '../../InputBox/InputBlue'
import RedButton from '../../Button/RedButton'
import axios from 'axios'

export default function RoomModal(props: {
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
      const resp = await fetch(`http://localhost:3000/room/all`)

      if (!resp.ok) {
        alert('Something wrong')
      }

      const json = await resp.json()
      if (json['result'] == 'success') setAllRoom(json['rooms'])
    }
    getRoom()
  }, [])


  return (
    <Form
      displayModal={props.displayModal}
      setDisplayModal={props.setDisplayModal}
    >
      abcd
    </Form>
  )
}
