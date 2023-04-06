import React, { useState } from 'react'
import '../../style/light.css'
import Button from '../../components/Button/BlueButton'
import RedButton from '../../components/Button/RedButton'
import Table from '../../components/Table/Table'
import axios from 'axios'
import Search from '../../components/SearchBar/SearchBar'
import Chart from '../../components/Chart/Chart'

export default function LightDashboard() {
  return (
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
      </div>

      <div className="row3">
        <Chart></Chart>
      </div>
    </div>
  )
}
