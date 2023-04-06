import React, { useState } from 'react'
import '../../style/light.css'
import Button from '../../components/Button/BlueButton'
import RedButton from '../../components/Button/RedButton'
import Table from '../../components/Table/Table'
import { Toggle } from '../../components/Button/ToggleButton'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import AddLightModal from '../../components/Modal/LightModal/AddLight'

export default function Light() {
  const [lightList, setLightList] = React.useState('')
  const [status, setStatus] = React.useState('')
  const [idStatus, setIdStatus] = React.useState('')
  const [displayModal, setDisplayModal] = React.useState(false)

  React.useEffect(() => {
    const getAllLight = async () => {
      const resp = await fetch(`http://localhost:3000/light/all`)

      if (!resp.ok) {
        alert('Something wrong')
      }

      const json = await resp.json()
      if (json['result'] == 'success') setLightList(json['lights'])
    }
    getAllLight()
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
        url: `http://localhost:3000/light/${idStatus}`,
        data: data,
      }
      const response = await axios(config)
    }
    updateStatus(idStatus)
  }, [idStatus])

  return (
    <div className="contain">
      <AddLightModal
        displayModal={displayModal}
        setDisplayModal={setDisplayModal}
      />
      <div className="contain_content">
        <div className="row2">
          <div className="row2_1">
            <div>
              <nav>
                <ul className="list">
                  <li className="items">Device</li>
                  <li className="items">History</li>
                  <li className="items">Dashboard</li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="row2_1">
            <p className="line"> Number light is on : </p>
          </div>
          <div className="row2_1">
            <Button>Light List</Button>
            <Button>Light On</Button>
            <RedButton
              onClick={() => {
                setDisplayModal(true)
              }}
            >
              Add Light
            </RedButton>
          </div>
        </div>
        <div className="row3">
          <Table>
            <thead>
              <tr>
                <th>Light Name</th>
                <th>Light Code</th>
                <th>User</th>
                <th>Day Add</th>
                <th>Status</th>
                <th>Mode</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(lightList) &&
                lightList.map((info) => (
                  <tr key={info.ID}>
                    <td className="color_blue">{info.Devicename}</td>

                    <td>{info.ID}</td>
                    <td>Thái</td>
                    <td>03-08-2023</td>
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
