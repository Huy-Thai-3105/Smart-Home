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
import { CredentialsInterface, UserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { getCookie } from '../../utilities/GetRoleCookie'
import Swal from 'sweetalert2'

interface Light {
  ID: any
  Devicename: string
  Device_Status: string
  Mode: string
  Day_add: string
  RoomID: any
  Roomname: any
}

export default function Light() {
  const [lightList, setLightList] = React.useState<Light[]>([])
  const [lishtListOn, setLightListOn] = React.useState('')
  const [displayModal, setDisplayModal] = React.useState(false)
  const [clickListOn, setClickListOn] = React.useState(false)

  const [deleteId, setDeleteId] = React.useState('')
  const [numLightOn, setNumLightOn] = React.useState(0)

  const [status, setStatus] = React.useState('')
  const [idStatus, setIdStatus] = React.useState('')
  const [IdMode, setIdMode] = React.useState('')
  const [mode, setMode] = React.useState('')

  const [houseID, setHouseID] = React.useState('')

  const [allHouse, setAllHouse] = React.useState([])
  const { id, accessToken, userRole } =
    React.useContext<CredentialsInterface>(UserContext)

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

 

  React.useEffect(() => {
    if (houseID) {
      const getAllLight = async (houseID) => {
        const resp = await fetch(
          `http://localhost:3000/light/all/${houseID}`
        )

        if (!resp.ok) {
          alert('Something wrong')
        }

        const json = await resp.json()
        if (json['result'] == 'success') setLightList(json['lights'])
        setNumLightOn(
          json['lights'].filter((light: any) => light.Device_Status == 'on')
            .length
        )
        setLightListOn(
          json['lights'].filter((device) => device.Device_Status === 'on')
        )
      }

      getAllLight(houseID)
    }
    const intervalId = setInterval(() => {
      if (houseID) {
        const getAllLight = async (houseID) => {
          const resp = await fetch(
            `http://localhost:3000/light/all/${houseID}`
          )

          if (!resp.ok) {
            alert('Something wrong')
          }

          const json = await resp.json()
          if (json['result'] == 'success') setLightList(json['lights'])
          setNumLightOn(
            json['lights'].filter((light: any) => light.Device_Status == 'on')
              .length
          )
          setLightListOn(
            json['lights'].filter((device) => device.Device_Status === 'on')
          )
        }

        getAllLight(houseID)
        // console.log(AirList)
      }
    }, 5000) // Call the function every 5 seconds

    return () => clearInterval(intervalId)
  }, [houseID])

  React.useEffect(() => {
    if (idStatus) {
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
          const devices = [...lightList]
          const deviceToUpdate = devices.find(
            (device) => device.ID === idStatus
          )

          if (deviceToUpdate) {
            deviceToUpdate.Device_Status =
              deviceToUpdate.Device_Status === 'off' ? 'on' : 'off'
            // console.log(devices)
            setLightList(devices)
            console.log(lightList)
          } else {
            console.log('abcd')
          }
        }
      }
      updateStatus(idStatus)
    }
  }, [idStatus, status])

  // React.useEffect(() => {
  //   if (IdMode) {
  //     const updateStatus = async (IdMode: any) => {
  //       const data = {
  //         Mode: mode,
  //       }
  //       // console.log(data)
  //       // alert(IdMode)
  //       const config = {
  //         method: 'patch',
  //         url: `http://localhost:3000/device/${IdMode}`,
  //         data: data,
  //       }
  //       const response = await axios(config)
  //       if (response.status == 200) {
  //         const devices = [...lightList]
  //         const deviceToUpdate = devices.find((device) => device.ID === IdMode)
  //         if (deviceToUpdate) {
  //           deviceToUpdate.Mode =
  //             deviceToUpdate.Mode === 'manual' ? 'auto' : 'manual'
  //           setLightList(devices)
  //         } else {
  //           console.log('abcd')
  //         }
  //       }
  //     }
  //     updateStatus(IdMode)
  //   }
  // }, [IdMode, mode])

  React.useEffect(() => {
    if (deleteId) {
      async function deleteLight() {
        await fetch(`http://localhost:3000/light/${deleteId}`, {
          method: 'DELETE',
        })
      }
      const devices = [...lightList]

      setLightList(devices.filter((device) => device.ID !== deleteId))
      Swal.fire(
        'Delete success'
      )
      deleteLight()
    }
  }, [deleteId])
  return (
    <div className="contain">
      <AddLightModal
        displayModal={displayModal}
        setDisplayModal={setDisplayModal}
        houseID={houseID}
        lightList={lightList}
        setLightList={setLightList}
      />
      <div className="contain_content">
        <div className="row2">
          <div className="row2_1">
            <div>
              <nav>
                <ul className="list">
                  <li className="items">
                    <a href="./light">Device</a>
                  </li>
                  <li className="items">
                    <a href="lightHistory">History</a>
                  </li>
                  <li className="items">
                    <a href="./lightChart">Dashboard</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="row2_1">
            <p className="line"> Number light is on : {numLightOn} </p>
          </div>
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
            <Button
              onClick={() => {
                setClickListOn(false)
              }}
            >
              Light List
            </Button>
            <Button
              onClick={() => {
                setClickListOn(true)
              }}
            >
              Light On
            </Button>
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
                <th>Room name</th>
                <th>Day Add</th>
                <th>Status</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(lightList) &&
                lightList.map((info) => (
                  <tr key={info.ID}>
                    <td className="color_blue">{info.Devicename}</td>
                    <td>{info.ID}</td>
                    <td>{info.Roomname}</td>
                    <td>{new Date(Date.parse(info.Day_add)).toLocaleString('en-US')}</td>
                    <td
                      // onClick={() => {
                      //   setIdStatus(info.ID)
                      //   if (info.Device_Status === 'on') setStatus('off')
                      //   else setStatus('on')
                      // }}
                    >
                      <Toggle toggled={info.Device_Status} onClick={true} />
                    </td>
                    {/* <td
                      onClick={() => {
                        setIdMode(info.ID)
                        if (info.Mode == 'auto') setMode('manual')
                        else setMode('auto')
                      }}
                    >
                      <Toggle toggled={info.Mode} onClick={true} />
                    </td> */}
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
        </div>
      </div>
    </div>
  )
}
