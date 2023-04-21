import React from 'react'
import { BarChart, Bar, CartesianGrid, XAxis, YAxis ,Tooltip} from 'recharts';
export default function Barchart_light() {
    const [dataHis, setDataHis] = React.useState()

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
    <div>
        <BarChart width={900} height={400} data={dataHis} margin={{top: 20, right: 20, bottom: 20, left: 50}} >
        <XAxis dataKey="ID" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="TimeUse" fill="#8884d8" />
        </BarChart>
    </div>
  )
}
