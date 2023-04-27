import React from 'react'
import '../../style/account.css'
import ImageUser from '../../components/ImageUser/ImageUser'
import Input_nomal from '../../components/InputBox/input_nomal'
import { Button } from 'react-bootstrap'
import BlueButton from '../../components/Button/BlueButton'
import ChangePassword from '../../components/Modal/ChangePassword/ChangePassword'
export default function Account() {
  const [displayModal, setDisplayModal] = React.useState(false)
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [ssn, setSSN] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [district, setDistric] = React.useState('')
  const [city, setCity] = React.useState('')

  React.useEffect(() => {
    const getInfomation = async () => {
      const resp = await fetch(`http://localhost:3000/user/3`)

      if (!resp.ok) {
        alert('Something wrong')
      }

      const json = await resp.json()
      let info = json['user']
      setFirstName(info['FName'])
      setLastName(info['LName'])
      setSSN(info['SSN'])
      setCity(info['City'])
      setPhone(info['SSN'])
      setDistric(info['District'])
      setEmail(info['Email'])
    }
    getInfomation()
  }, [])

  return (
    <div className="contain">
      <ChangePassword
        displayModal={displayModal}
        setDisplayModal={setDisplayModal}
      />
      <div className="contain_account">
        <div className="col1">
          <ImageUser></ImageUser>
        </div>
        <div className="col2">
          <div className="flex gap-5">
            <div className="flex basis-1/2">
              <Input_nomal
                label="First name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              ></Input_nomal>
            </div>

            <Input_nomal
              label="Last name"
              type="text"
              value="Thái"
              onChange={(e) => setLastName(e.target.value)}
            ></Input_nomal>
          </div>
          <Input_nomal label="SSN" type="text" value="2012036"></Input_nomal>
          <Input_nomal
            label="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Input_nomal>
          <Input_nomal
            label="Contact number"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          ></Input_nomal>
          <div className="flex gap-5">
            <Input_nomal
              label="District"
              type="text"
              value={district}
              onChange={(e) => setDistric(e.target.value)}
            ></Input_nomal>
            <Input_nomal
              label="City"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            ></Input_nomal>
          </div>
          <br />
          <div className="flex justify-center gap-10">
            <BlueButton>Save</BlueButton>
            <BlueButton
              onClick={() => {
                setDisplayModal(true)
              }}
            >
              Change Password
            </BlueButton>
          </div>
        </div>
      </div>
    </div>
  )
}
