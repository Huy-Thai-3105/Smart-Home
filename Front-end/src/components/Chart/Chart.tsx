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
export default function Chart() {
  const data = [
    {
      time: '8:0',
      temperature: '26.7892',
    },
    {
      time: '8:5',
      temperature: '28.7519',
    },
    {
      time: '8:10',
      temperature: '27.3138',
    },
    {
      time: '8:15',
      temperature: '30.0732',
    },
    {
      time: '8:20',
      temperature: '31.6082',
    },
    {
      time: '8:25',
      temperature: '29.1165',
    },
    {
      time: '8:30',
      temperature: '26.2074',
    },
    {
      time: '8:35',
      temperature: '29.1782',
    },
    {
      time: '8:40',
      temperature: '26.0462',
    },
    {
      time: '8:45',
      temperature: '26.4011',
    },
    {
      time: '8:50',
      temperature: '30.1206',
    },
    {
      time: '8:55',
      temperature: '31.5826',
    },
  ]
  return (
    <div>
      <ResponsiveContainer width={'90%'} aspect={2.5}>
        <LineChart data={data}>
          <Line type="monotone" dataKey={'temperature'} stroke="red" />
          <XAxis dataKey={'time'}></XAxis>
          <YAxis dataKey={'temperature'}></YAxis>
          <CartesianGrid stroke="#eee" strokeDasharray="1 1" />

          <Tooltip></Tooltip>
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
