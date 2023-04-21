import React from 'react'
import '../../style/light.css'
import Table from '../../components/Table/Table'

export default function LightHistory() {
  const [dataHis, setDataHis] = React.useState([])

    React.useEffect(() => {
        const getHistory = async () => {
          const resp = await fetch(`http://localhost:3000/device/history/all/light`)
    
          if (!resp.ok) {
            alert('Something wrong')
          }
    
          const json = await resp.json()
          if (json['result'] == 'success') setDataHis(json['devices'])
        }
        getHistory()
      }, [])
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
      <Table>
            <thead>
              <tr>
                <th>Light Code</th>
                {/* <th>Light </th> */}
                <th>Time on</th>
                <th>Time off</th>
                <th>Time use</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(dataHis) && dataHis.map((info: any) => (
                  <tr key={info.ID}>
                    <td>{info.ID}</td>
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
