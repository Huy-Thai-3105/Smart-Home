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
import AirUpdateAuto from '../../components/Modal/AirModal/AirUpdateAuto'
import { getCookie } from '../../utilities/GetRoleCookie'
import { useNavigate } from 'react-router-dom'
import PumpUpdateAuto from '../../components/Modal/PumpModal/PumpUpdateAuto'

interface Pump {
  ID: any
  Devicename: string
  Device_Status: string
  Mode: string
  Day_add: string
  RoomID: any
  Temperature_D: any
  Humidity_D: any
  SensorID: any
  Temperature: any
  Humidity: any
}

export default function Pump() {
  const [pumpList, setPumpList] = React.useState<Pump[]>([])

  const [status, setStatus] = React.useState('')
  const [idStatus, setIdStatus] = React.useState('')
  const [IdMode, setIdMode] = React.useState('')
  const [mode, setMode] = React.useState('')

  const [displayModal, setDisplayModal] = React.useState(false)
  const [displayModelUpdate, setDisplayModalUpdate] = React.useState(false)

  const [updateEnvID, setUpdateEnvID] = React.useState('')
  const [temprature, setTemprature] = React.useState('')
  const [humidity, setHumidity] = React.useState('')
  const [houseID, setHouseID] = React.useState('')
  const [deleteId, setDeleteId] = React.useState('')

  const [allHouse, setAllHouse] = React.useState([])

  const [numPumpOn, setnumPumpOn] = React.useState(0)
  // get house

  const [role, setRole] = useState(getCookie('role'))
  const navi = useNavigate()
  if (role != 'CU') {
    navi('/login')
  }

  const [userID, setUserID] = React.useState(getCookie('userID'))
  React.useEffect(() => {
    if (userID) {
      const getHouse = async () => {
        const resp = await fetch(`http://localhost:3000/house/all/${userID}`)

        if (!resp.ok) {
          alert('Something wrong')
        }

        const json = await resp.json()
        setAllHouse(json['houses'])
        setHouseID(json['houses'][0].ID)
      }

      getHouse()
    }
  }, [])

  // // get device in house
  // React.useEffect(() => {
  //   if (houseID) {
  //     const getALlPump = async (houseID) => {
  //       const resp = await fetch(`http://localhost:3000/pump/all/${houseID}`)

  //       if (!resp.ok) {
  //         alert('Something wrong')
  //       }

  //       const json = await resp.json()
  //       if (json['result'] == 'success') setPumpList(json['pumps'])
  //     }
  //     getALlPump(houseID)
  //   }
  // }, [houseID])

  React.useEffect(() => {
    if (houseID) {
      const getPumpList = async (houseID) => {
        const resp = await fetch(
          `http://localhost:3000/pump/all/${houseID}`
        )

        if (!resp.ok) {
          alert('Something wrong')
        }

        const json = await resp.json()
        if (json['result'] == 'success') setPumpList(json['pumps'])
      //   setnumPumpOn(
      //     json['pumps'].filter((air: any) => air.Device_Status == 'on').length
      //   )
      }

      getPumpList(houseID)
    }
    const intervalId = setInterval(() => {
      if (houseID) {
        const getPumpList = async (houseID) => {
          const resp = await fetch(
            `http://localhost:3000/pump/all/${houseID}`
          )

          if (!resp.ok) {
            alert('Something wrong')
          }

          const json = await resp.json()
          if (json['result'] == 'success') setPumpList(json['pumps'])
          setnumPumpOn(
            json['pumps'].filter((light: any) => light.Device_Status == 'on')
              .length
          )
        }
        getPumpList(houseID)
      }
    }, 5000) // Call the function every 5 seconds

    return () => clearInterval(intervalId)
  }, [houseID])
  // turn on/off device
  React.useEffect(() => {
    if (idStatus) {
      console.log(status)
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
        if (response.status == 200) {
          const devices = [...pumpList]
          const deviceToUpdate = devices.find(
            (device) => device.ID === idStatus
          )

          if (deviceToUpdate) {
            deviceToUpdate.Device_Status = deviceToUpdate.Device_Status === 'off' ? 'on' : 'off'
            // console.log(devices)
            setPumpList(devices)
          } else {
            console.log('abcd')
          }
        }
      }
      updateStatus(idStatus)
    }
  }, [idStatus, status])

  // turn on/off auto mode
  React.useEffect(() => {
    if (IdMode) {
      const updateStatus = async (IdMode) => {
        const data = {
          Mode: mode,
        }
        console.log(data)
        const config = {
          method: 'patch',
          url: `http://localhost:3000/device/${IdMode}`,
          data: data,
        }
        const response = await axios(config)
        if (response.status == 200) {
          const devices = [...pumpList]
          const deviceToUpdate = devices.find((device) => device.ID === IdMode)
          if (deviceToUpdate) {
            deviceToUpdate.Mode =
              deviceToUpdate.Mode === 'manual' ? 'auto' : 'manual'
            setPumpList(devices)
          } else {
            console.log('abcd')
          }
        }
      }
      updateStatus(IdMode)
    }
  }, [IdMode,mode])

  React.useEffect(() => {
    if (deleteId) {
      async function deleteLight() {
        await fetch(`http://localhost:3000/pump/${deleteId}`, {
          method: 'DELETE',
        })
      }

      console.log('DELETE DEVICE')
      deleteLight()
    }
  }, [deleteId])
  return (
    <div className="contain">
      <div className="contain_content">
        {/* <AddAir displayModal={displayModal} setDisplayModal={setDisplayModal} /> */}
        <div className="row2">
          <div className="row2_1">
            <div>
              <nav>
                <ul className="list">
                  <li className="items">
                    <a href="./pump">Device</a>
                  </li>
                  <li className="items">
                    <a href="./pumpHistory">History</a>
                  </li>
                  <li className="items">
                    <a href="./pumpChart">Dashboard</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="line">Pump is running: {numPumpOn}</div>
          <div className="row2_1">
            <select
              className="border-blue-gray-200 text-blue-gray-700 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 disabled:bg-blue-gray-50 select_size peer h-full w-full rounded-[7px] border border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal shadow-md outline outline-0 transition-all placeholder-shown:border empty:!bg-red-500 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0"
              value={houseID}
              onChange={(e) => setHouseID(e.target.value)}
            >
              {Array.isArray(allHouse) && allHouse.length > 0 ? (
                allHouse.map((option) => (
                  <option
                    key={option['ID']}
                    value={option['ID']}
                    onClick={() => {
                      console.log(option['ID'])
                    }}
                  >
                    {option['Housename']}
                  </option>
                ))
              ) : (
                <option disabled>No data</option>
              )}
            </select>
            <Button>Pump List</Button>
            <Button>Pump On</Button>
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
                <th>Temperature</th>
                <th>Soil moisture </th>
                <th>Status</th>
                <th>Mode</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(pumpList) &&
                pumpList.map((info) => (
                  <tr key={info.ID}>
                    <td
                      className="color_blue"
                      onClick={() => {
                        setUpdateEnvID(info['ID'])
                        setTemprature(info['Temperature_D'])
                        setHumidity(info['Humidity_D'])
                        setDisplayModalUpdate(true)
                      }}
                    >
                      {info.Devicename}
                    </td>

                    <td>{info.ID}</td>
                    <td className="color_blue"> {info.Temperature}</td>
                    <td className="color_red"> {info.Humidity}</td>
                    <td
                      onClick={() => {
                        setIdStatus(info.ID)
                        if (info.Device_Status === 'on') setStatus('off')
                        else setStatus('on')
                      }}
                    >
                      <Toggle toggled={info.Device_Status} onClick={true} />
                    </td>
                    <td
                      onClick={() => {
                        setIdMode(info.ID)
                        if (info.Mode == 'auto') setMode('manual')
                        else setMode('auto')
                      }}
                    >
                      <Toggle toggled={info.Mode} onClick={true} />
                    </td>
                    <td
                      className="pointer"
                      onClick={() => {
                        setDeleteId(info.ID)
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <PumpUpdateAuto
            airId={updateEnvID}
            temperature={temprature}
            humidity={humidity}
            displayModal={displayModelUpdate}
            setDisplayModal={setDisplayModalUpdate}
          />
        </div>
      </div>
    </div>
  )
}
