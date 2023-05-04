import React, { useState } from 'react'
import Form from '../../Form/Form'
import BlueButton from '../../Button/BlueButton'
import InputBlue from '../../InputBox/InputBlue'
import RedButton from '../../Button/RedButton'
import axios from 'axios'
import Swal from 'sweetalert2'
export default function AddUserModal(props: {
  displayModal: boolean
  setDisplayModal: any
}) {
  const [id, setId] = React.useState('')
  const [name, setName] = React.useState('')
  const [roomID, setRoomID] = React.useState('')
  const [click, setClick] = React.useState(false)

  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [ssn, setSSN] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [district, setDistric] = React.useState('')
  const [city, setCity] = React.useState('')
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [role, setRole] = React.useState('AD')

  React.useEffect(() => {
    const createNewUser = async () => {
      const data = JSON.stringify({
        SSN: ssn,
        Email: email,
        Phone: phone,
        Fname: firstName,
        Lname: lastName,
        Username: username,
        Pass: password,
        District: district,
        City: city,
        Role: role,
      })

      const config = {
        method: 'post',
        url: 'http://localhost:3000/user/create',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      }
      console.log(data)
      const respone = await axios(config)
      if (respone.status == 200) {
        Swal.fire(
          'success'
        )
      }
    }
    if (click === true) {
      if ( username == '' || password == ''){
        Swal.fire(
          'please enter all infomation'
        )
      } 
      else {
        createNewUser()
        setClick(false)
      }
    }
  }, [click])
  console.log(role)
  return (
    <Form
      displayModal={props.displayModal}
      setDisplayModal={props.setDisplayModal}
    >
      <div className="window grow p-4 ">
        <div className="flex basis-1/2 gap-10">
          <InputBlue
            label="First name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          ></InputBlue>
          <InputBlue
            label="Last name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          ></InputBlue>
        </div>
        <select
              className="border-blue-gray-200 text-blue-gray-700 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 disabled:bg-blue-gray-50 select_size peer h-full w-full rounded-[7px] border border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal shadow-md outline outline-0 transition-all placeholder-shown:border empty:!bg-red-500 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
                  <option
                    value={"AD"}
                  >Admin</option>
                  <option
                    value={"CU"}
                  >Customer</option>
            </select>
        <InputBlue 
          label="SSN"
          type="text"
          value={ssn}
          onChange={(e) => setSSN(e.target.value)}
        ></InputBlue>
        <InputBlue
          label="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></InputBlue>
        <InputBlue
          label="Contact number"
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        ></InputBlue>
        <div className="flex gap-5">
          <InputBlue
            label="District"
            type="text"
            value={district}
            onChange={(e) => setDistric(e.target.value)}
          ></InputBlue>
          <InputBlue
            label="City"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></InputBlue>
        </div>
        <div className="flex gap-5">
          <InputBlue
            label="User name"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></InputBlue>
          <InputBlue
            label="Password"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></InputBlue>
        </div>

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
            Add
          </BlueButton>
        </div>
      </div>
    </Form>
  )
}
