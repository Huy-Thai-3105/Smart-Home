import React from 'react'
import '../../style/light.css'
import Button from '../../components/Button/BlueButton'
import RedButton from '../../components/Button/RedButton'
import Table from '../../components/Table/Table'
import { Toggle } from '../../components/Button/ToggleButton'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import AddLightModal from '../../components/Modal/LightModal/AddLight'

export default function Door() {
  const [doorList, setDoorList] = React.useState('')
  const [status, setStatus] = React.useState('')
  const [idStatus, setIdStatus] = React.useState('')
  const [IdMode, setIdMode] = React.useState('')
  const [mode, setMode] = React.useState('')

  const [displayModal, setDisplayModal] = React.useState(false)
  const [clickListOn, setClickListOn] = React.useState(false)
  const [displayModelUpdate, setDisplayModalUpdate] = React.useState(false)

  const [updateEnvID, setUpdateEnvID] = React.useState('')
  const [temprature, setTemprature] = React.useState('')
  const [humidity, setHumidity] = React.useState('')
  const [houseID, setHouseID] = React.useState('')
  const [deleteId, setDeleteId] = React.useState('')

  const [allHouse, setAllHouse] = React.useState([])

  const [numDoorOpen, setNumDoorOpen] = React.useState(0)
  // get house
  React.useEffect(() => {
    const getHouse = async () => {
      const resp = await fetch(`http://localhost:3000/house/all`)

      if (!resp.ok) {
        alert('Something wrong')
      }

      const json = await resp.json()
      setAllHouse(json['houses'])
      setHouseID(json['houses'][0].ID)
    }

    getHouse()
  }, [])

  // get device in house
  React.useEffect(() => {
    if (houseID) {
      const getDoorList = async (houseID) => {
        const resp = await fetch(`http://localhost:3000/door/all/${houseID}`)

        if (!resp.ok) {
          alert('Something wrong')
        }

        const json = await resp.json()
        if (json['result'] == 'success') setDoorList(json['doors'])
      }
      getDoorList(houseID)
    }
  }, [houseID])

  // turn on/off device
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
      }
      updateStatus(idStatus)
    }
  }, [idStatus])

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
      }
      updateStatus(IdMode)
    }
  }, [IdMode])

  // delete aircondition
  // React.useEffect(() => {
  //   if (deleteId) {
  //     async function deleteLight() {
  //       await fetch(`http://localhost:3000/pump/${deleteId}`, {
  //         method: 'DELETE',
  //       })
  //     }

  //     console.log('DELETE DEVICE')
  //     deleteLight()
  //   }
  // }, [deleteId])
  return (
    <div className="contain">
      {/* <AddLightModal
        displayModal={displayModal}
        setDisplayModal={setDisplayModal}
      /> */}
      <div className="contain_content">
        <div className="row2">
          <div className="row2_1">
            <div>
              <nav>
                <ul className="list">
                  <li className="items">
                    <a href="./door">Device</a>
                  </li>
                  <li className="items">
                    <a href="./doorHistory">History</a>
                  </li>
                  <li className="items">
                    <a href="./doorChart">Dashboard</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="row2_1">
            <p className="line"> Number door is openning : {numDoorOpen} </p>
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
            <Button>Door List</Button>
            <Button>Door Openning</Button>
            <RedButton
              onClick={() => {
                setDisplayModal(true)
              }}
            >
              Add Door
            </RedButton>
          </div>
        </div>
        <div className="row3">
          <Table>
            <thead>
              <tr>
                <th>Door Name</th>
                <th>Door Code</th>
                <th>Room name</th>
                <th>Day Add</th>
                <th>Status</th>
                <th>Auto Mode</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {}
              {Array.isArray(doorList) &&
                doorList.map((info) => (
                  <tr key={info.ID}>
                    <td className="color_blue">{info.Devicename}</td>

                    <td>{info.ID}</td>
                    <td>{info.Roomname}</td>
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
        </div>
      </div>
    </div>
  )
}
