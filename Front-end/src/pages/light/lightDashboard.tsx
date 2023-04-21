import React, { useState } from 'react'
import '../../style/light.css'

import Barchart_light from '../../components/Chart/barchart'

export default function LightDashboard() {
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
                <li className="items">History</li>
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
      </div>

      <div className="row3">
        <Barchart_light></Barchart_light>
      </div>
    </div>
  )
}
