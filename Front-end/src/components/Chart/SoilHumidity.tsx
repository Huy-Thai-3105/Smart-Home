import React from 'react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'
export default function SoilHumidity(props: { dataHis: any }) {
  return (
    <div>
      <ResponsiveContainer width={'95%'} aspect={2.7}>
        <LineChart data={props.dataHis}>
          <Line type="monotone" dataKey={'Temperature'} stroke="blue" />
          <XAxis dataKey={'TimeDate'}></XAxis>
          <YAxis dataKey={'Temperature'} domain={[0, 100]}></YAxis>
          <CartesianGrid stroke="#eee" strokeDasharray="1 1" />
          <Tooltip></Tooltip>
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
