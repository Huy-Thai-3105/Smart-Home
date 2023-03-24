import React from 'react'
import { useNavigate } from 'react-router-dom'
import Form from '../../Form/Form'

export default function ModalCreate(props: {
  displayModal: boolean
  setDisplayModal: any
}) {
  return (
    <Form
      displayModal={props.displayModal}
      setDisplayModal={props.setDisplayModal}
    >
      <div className="window grow p-4">
        <button
          onClick={() => {
            //   if (result === "fail")
            props.setDisplayModal(false)
          }}
          type="button"
          className="basis-1/3 bg-black text-white"
        >
          Add new
        </button>
      </div>
    </Form>
  )
}
