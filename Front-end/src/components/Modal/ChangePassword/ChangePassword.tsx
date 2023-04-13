import React from 'react'
import Form from '../../Form/Form'
import InputBlue from '../../InputBox/InputBlue'
import BlueButton from '../../Button/BlueButton'
import RedButton from '../../Button/RedButton'

export default function ChangePassword(props: {
  displayModal: boolean
  setDisplayModal: any
}) {
  return (
    <Form
      displayModal={props.displayModal}
      setDisplayModal={props.setDisplayModal}
    >
      <div className="window grow p-4">
        <InputBlue label="Old pass" value=""></InputBlue>
        <InputBlue label="New password"></InputBlue>
        <InputBlue label="Confirm password"></InputBlue>
        <div className="Row">
          <RedButton
            onClick={() => {
              props.setDisplayModal(false)
            }}
          >
            Close
          </RedButton>
          <BlueButton>Change password</BlueButton>
        </div>
      </div>
    </Form>
  )
}
