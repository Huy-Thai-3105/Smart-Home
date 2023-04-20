import React, { useState } from 'react'
import '../../style/light.css'
import Button from '../../components/Button/BlueButton'
import RedButton from '../../components/Button/RedButton'
import Table from '../../components/Table/Table'
import { Toggle } from '../../components/Button/ToggleButton'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import AddAir from '../../components/Modal/AirModal/AddAir'

export default function AirConditional() {
  const [AirList, setAirList] = React.useState('')
  const [status, setStatus] = React.useState('')
  const [idStatus, setIdStatus] = React.useState('')
  const [displayModal, setDisplayModal] = React.useState(false)

  React.useEffect(() => {
    const getAirConditon = async () => {
      const resp = await fetch(`http://localhost:3000/airCondition/all`)

      if (!resp.ok) {
        alert('Something wrong')
      }

      const json = await resp.json()
      if (json['result'] == 'success') setAirList(json['air_conditions'])
    }
    getAirConditon()
  }, [])

  React.useEffect(() => {
    const updateStatus = async (idStatus) => {
      const data = {
        Devicename: '',
        Device_Status: status,
        RoomID: '',
      }
      const config = {
        method: 'patch',
        url: `http://localhost:3000/device/turn/${idStatus}`,
        data: data,
      }
      const response = await axios(config)
    }
    updateStatus(idStatus)
  }, [idStatus])

  return (
    <div className="contain">
      <div className="contain_content">
        <AddAir displayModal={displayModal} setDisplayModal={setDisplayModal} />
        <div className="row2">
          <div className="row2_1">
            <div>
            <nav>
                <ul className="list">
                  <li className="items">
                    <a href="./air">Device</a>
                  </li>
                  <li className="items">History</li>
                  <li className="items">
                    <a href="./airChart">Dashboard</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="line">Air conditon is running :</div>
          <div className="row2_1">
            <Button>Air condition List</Button>
            <Button>Air condition On</Button>
            <RedButton
              onClick={() => {
                setDisplayModal(true)
              }}
            >
              Add new
            </RedButton>
          </div>
        </div>

        <div className="row3">
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Code</th>
                <th>Temprature </th>
                <th>Humidity</th>
                <th>User</th>
                <th>Status</th>
                <th>Mode</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(AirList) &&
                AirList.map((info) => (
                  <tr key={info.ID}>
                    <td className="color_blue">{info.Devicename}</td>

                    <td>{info.ID}</td>
                    <td className="color_blue"> {info.Temperature_D}</td>
                    <td className="color_red"> {info.Humidity_D}</td>
                    <td>Thái</td>
                    <td
                      onClick={() => {
                        setIdStatus(info.ID)
                        if (info.Device_Status === 'on') setStatus('off')
                        else setStatus('on')
                      }}
                    >
                      <Toggle toggled={info.Device_Status} onClick={true} />
                    </td>
                    <td>{info.Mode}</td>
                    <td>
                      <FontAwesomeIcon icon={faTrash} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  )
}
