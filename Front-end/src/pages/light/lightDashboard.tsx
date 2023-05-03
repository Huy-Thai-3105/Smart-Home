import React, { useState } from 'react'
import '../../style/light.css'

import Barchart_light from '../../components/Chart/barchart'
import Barchart from '../../components/Chart/barchart'
import { getCookie } from '../../utilities/GetRoleCookie'

export default function LightDashboard() {
  const [dataHis, setDataHis] = React.useState()
  const [houseID, setHouseID] = React.useState('')
  const [allHouse, setAllHouse] = React.useState([])

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
          `http://localhost:3000/device/history/all/light/${houseID}`
        )

        if (!resp.ok) {
          alert('Something wrong')
        }

        const json = await resp.json()
        if (json['result'] == 'success') {
          let histories = json['devices']
          histories.forEach((history) => {
            history.Turn_on_time = new Date(
              history.Turn_on_time
            ).toLocaleString('en-US')
            history.Turn_off_time = new Date(
              history.Turn_off_time
            ).toLocaleString('en-US')
            history.TimeUse = history.TimeUse / 1000
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
                  <a href="./light">Device</a>
                </li>
                <li className="items">
                  <a href="./lightHistory">History</a>
                </li>
                <li className="items">
                  <a href="./lightChart">Dashboard</a>
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
            {Array.isArray(allHouse) && allHouse.length > 0 ? (
              allHouse.map((option) => (
                <option key={option['ID']} value={option['ID']}>
                  {option['Housename']}
                </option>
              ))
            ) : (
              <option disabled>No data</option>
            )}
          </select>
        </div>
      </div>

      <div className="row3">
        <Barchart dataHis={dataHis}></Barchart>
      </div>
    </div>
  )
}
