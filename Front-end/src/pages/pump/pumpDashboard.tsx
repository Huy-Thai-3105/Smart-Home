import React, { useState } from 'react'
import '../../style/light.css'

import LineChartTemp from '../../components/Chart/LineChartTemp'
import BlueButton from '../../components/Button/BlueButton'
import RedButton from '../../components/Button/RedButton'
import HumidityChart from '../../components/Chart/LineChartHumidity'
import { getCookie } from '../../utilities/GetRoleCookie'

export default function PumpChart() {
  const [dataHis, setDataHis] = React.useState()
  const [allRoom, setAllRoom] = React.useState([])
  const [houseID, setHouseID] = React.useState('')
  const [roomID, setRoomID] = React.useState('')
  const [allHouse, setAllHouse] = React.useState([])

  const [choseType, setChoseType] = React.useState(true)
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
      const getRoom = async (houseID) => {
        const resp = await fetch(`http://localhost:3000/room/all/${houseID}`)

        if (!resp.ok) {
          alert('Something wrong')
        }

        const json = await resp.json()
        setAllRoom(json['rooms'])
        console.log(allRoom)
      }

      getRoom(houseID)
    }
  }, [houseID])

  React.useEffect(() => {
    if (roomID) {
      const getHistory = async (roomID) => {
        const resp = await fetch(
          `http://localhost:3000/record/temperature/all/${roomID}`
        )

        if (!resp.ok) {
          alert('Something wrong')
        }

        const json = await resp.json()
        setDataHis(json['records'])
      }

      getHistory(roomID)
    }
  }, [roomID])

  return (
    <div className="contain_content">
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
        <div className="flex w-full gap-10">
          <select
            className="border-blue-gray-200 text-blue-gray-700 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 disabled:bg-blue-gray-50 select_size peer h-full w-full rounded-[7px] border border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal shadow-md outline outline-0 transition-all placeholder-shown:border empty:!bg-red-500 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0"
            value={houseID}
            onChange={(e) => setHouseID(e.target.value)}
          >
            {Array.isArray(allHouse) && allHouse.length > 0 ? (
              allHouse.map((option) => (
                <option value={option['ID']}>{option['Housename']}</option>
              ))
            ) : (
              <option disabled>No data</option>
            )}
          </select>
          <select
            className="border-blue-gray-200 text-blue-gray-700 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 disabled:bg-blue-gray-50 select_size peer h-full w-full rounded-[7px] border border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal shadow-md outline outline-0 transition-all placeholder-shown:border empty:!bg-red-500 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0"
            value={roomID}
            onChange={(e) => setRoomID(e.target.value)}
          >
            {Array.isArray(allRoom) && allRoom.length > 0 ? (
              allRoom.map((option) => (
                <option value={option['ID']}>{option['Roomname']}</option>
              ))
            ) : (
              <option disabled>No data</option>
            )}
          </select>
        </div>
      </div>

      <div className="row3">
        <div className="contain_chart">
          <div className="chart_1">
            <LineChartTemp dataHis={dataHis}></LineChartTemp>
            <div className="flex flex-row items-center justify-center">
              <p className="p_temperature">Temperature record</p>
            </div>
          </div>
          <div className="chart_1">
            <HumidityChart dataHis={dataHis}></HumidityChart>
            <div className="flex flex-row items-center justify-center">
              <p className="p_humidity">Humidity record</p>
            </div>
          </div>
        </div>{' '}
      </div>
    </div>
  )
}
