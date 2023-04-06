import React from 'react'
import Form from '../../Form/Form'
import BlueButton from '../../Button/BlueButton'
import InputBlue from '../../InputBox/InputBlue'
import RedButton from '../../Button/RedButton'

export default function ModalCreate(props: {
  displayModal: boolean
  setDisplayModal: any
}) {
  return (
    <Form
      displayModal={props.displayModal}
      setDisplayModal={props.setDisplayModal}
    >
      <div className="window grow p-4 ">
        <InputBlue label="Light name"></InputBlue>
        <InputBlue label="Light code"></InputBlue>
        <br></br>
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
            }}
          >
            Add new Light
          </BlueButton>
        </div>
      </div>
    </Form>
  )
}
