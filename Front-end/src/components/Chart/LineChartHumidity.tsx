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
export default function HumidityChart(props: { dataHis: any }) {
  return (
    <div>
      <ResponsiveContainer width={'100%'} aspect={1.5}>
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
