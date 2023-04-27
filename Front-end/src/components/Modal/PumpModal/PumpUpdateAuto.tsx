import React from 'react'
import Form from '../../Form/Form'
import InputBlue from '../../InputBox/InputBlue'
import RedButton from '../../Button/RedButton'
import BlueButton from '../../Button/BlueButton'
import axios from 'axios'

export default function PumpUpdateAuto(props: {
  airId: any
  temperature: any
  humidity: any
  displayModal: boolean
  setDisplayModal: any
}) {
  const [Temperature, setTemprature] = React.useState('')
  const [Humidity, setHumidity] = React.useState('')
  const [data, setData] = React.useState([])
  const [click, setClick] = React.useState(false)
  React.useEffect(() => {
    setTemprature(props.temperature)
    setHumidity(props.humidity)
  }, [props.temperature, props.humidity])

  React.useEffect(() => {
    if (click == true) {
      const updateValue = async () => {
        const data = {
          Temperature_D: Temperature,
          Humidity_D: Humidity,
        }
        const config = {
          method: 'patch',
          url: `http://localhost:3000/pump/${props.airId}`,
          data: data,
        }
        console.log(data)
        const response = await axios(config)
      }
      updateValue()
    }
  }, [click])

  return (
    <Form
      displayModal={props.displayModal}
      setDisplayModal={props.setDisplayModal}
    >
      <div className="window grow p-4 ">
        <InputBlue
          label="Temperature"
          value={Temperature}
          onChange={(e: any) => {
            setTemprature(e.target.value)
          }}
        ></InputBlue>
        <InputBlue
          label="Humidity"
          value={Humidity}
          onChange={(e: any) => {
            setHumidity(e.target.value)
          }}
        ></InputBlue>
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
              setClick(true)
              props.setDisplayModal(false)
            }}
          >
            Update
          </BlueButton>
        </div>
      </div>
    </Form>
  )
}
