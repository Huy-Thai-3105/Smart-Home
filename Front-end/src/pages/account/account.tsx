import React from 'react'
import '../../style/account.css'
import ImageUser from '../../components/ImageUser/ImageUser'
import Input_nomal from '../../components/InputBox/input_nomal'
import { Button } from 'react-bootstrap'
import BlueButton from '../../components/Button/BlueButton'
import ChangePassword from '../../components/Modal/ChangePassword/ChangePassword'
export default function Account() {
  const [displayModal, setDisplayModal] = React.useState(false)
  const [firstName, setFirstName] = React.useState('Trương Huy')

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
            ></Input_nomal>
          </div>
          <Input_nomal label="SSN" type="text" value="2012036"></Input_nomal>
          <Input_nomal
            label="Email"
            type="text"
            value="huythai31052002@gmai.com"
          ></Input_nomal>
          <Input_nomal
            label="Contact number"
            type="text"
            value="0348273185"
          ></Input_nomal>
          <div className="flex gap-5">
            <Input_nomal
              label="District"
              type="text"
              value="Go Vap"
            ></Input_nomal>
            <Input_nomal
              label="City"
              type="text"
              value="HCM city"
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
