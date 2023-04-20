import React, { useState } from 'react'
import '../../style/light.css'

import Chart from '../../components/Chart/Chart'

export default function AirDashboard() {
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
                <li className="items">History</li>
                <li className="items">
                  <a href="./airChart">Dashboard</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="row2_1">
          <p className="line"> Number Airconditon is on : </p>
        </div>
      </div>

      <div className="row3">
        <Chart></Chart>
      </div>
    </div>
  )
}
