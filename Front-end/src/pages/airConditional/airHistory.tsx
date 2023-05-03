import React from 'react'
import '../../style/light.css'
import Table from '../../components/Table/Table'
import { convertToMinutesAndSeconds } from '../../utilities/ConvertTime'
import { getCookie } from '../../utilities/GetRoleCookie'
export default function airHistory() {
  const [dataHis, setDataHis] = React.useState([])
  const [allHouse, setAllHouse] = React.useState([])
  const [houseID, setHouseID] = React.useState('')

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
      const getHistory = async (houseID) => {
        const resp = await fetch(
          `http://localhost:3000/device/history/all/Air_Condition/${houseID}`
        )

        if (!resp.ok) {
          alert('Something wrong')
        }

        const json = await resp.json()
        if (json['result'] == 'success') {
          let history = json['devices']
          let histories = json['devices']
          histories.forEach((history) => {
            history.Turn_on_time = new Date(
              history.Turn_on_time
            ).toLocaleString('en-US')
            history.Turn_off_time = new Date(
              history.Turn_off_time
            ).toLocaleString('en-US')
            history.TimeUse = convertToMinutesAndSeconds(history.TimeUse / 1000)
          })
          setDataHis(histories)
        }
      }
      getHistory(houseID)
    }
  }, [houseID])
  return (
    <div className="contain_content">
      <div className="row2">
        <div className="row2_1">
          <div>
            <nav>
              <ul className="list">
                <li className="items">
                  <a href="./air">Device</a>
                </li>
                <li className="items">
                  <a href="./airHistory">History</a>
                </li>
                <li className="items">
                  <a href="./airChart">Dashboard</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="row2_1">
          <p className="line"> Number light is on : </p>
        </div>
        <div className="flex w-full">
          <select
            className="border-blue-gray-200 text-blue-gray-700 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 disabled:bg-blue-gray-50 select_size peer h-full w-full rounded-[7px] border border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal shadow-md outline outline-0 transition-all placeholder-shown:border empty:!bg-red-500 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0"
            value={houseID}
            onChange={(e) => setHouseID(e.target.value)}
          >
            {Array.isArray(allHouse) &&
              allHouse.map((option) => (
                <option
                  value={option['ID']}
                  onClick={() => {
                    console.log(option['ID'])
                  }}
                >
                  {option['Housename']}
                </option>
              ))}
            <label className="before:content[' '] after:content[' '] text-blue-gray-400 before:border-blue-gray-200 after:border-blue-gray-200 peer-placeholder-shown:text-blue-gray-500 peer-disabled:peer-placeholder-shown:text-blue-gray-500 pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent"></label>
          </select>
        </div>
      </div>

      <div className="row3">
        <Table>
          <thead>
            <tr>
              <th>Light Code</th>
              <th>Light Name </th>
              <th>Room Name</th>
              <th>Time on</th>
              <th>Time off</th>
              <th>Time use</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(dataHis) &&
              dataHis.map((info: any) => (
                <tr key={info.ID}>
                  <td>{info.ID}</td>
                  <td>{info.Devicename}</td>
                  <td>{info.Roomname}</td>
                  <td className="color_blue">{info.Turn_on_time}</td>
                  <td className="color_red">{info.Turn_on_time}</td>
                  <td>{info.TimeUse}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
}
