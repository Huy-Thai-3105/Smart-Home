import React from 'react'
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'
export default function Barchart(props: { dataHis: any }) {
  return (
    <div>
      {props.dataHis && props.dataHis.length === 0 ? (
        <p className="flex justify-center ">No data</p>
      ) : (
        <BarChart
          width={1000}
          height={380}
          data={props.dataHis}
          margin={{ top: 20, right: 20, bottom: 20, left: 50 }}
        >
          <XAxis dataKey="Devicename" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="TimeUse" fill="#8884d8" />
        </BarChart>
      )}
    </div>
  )
}
