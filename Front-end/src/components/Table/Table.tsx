import React from 'react'
import "./Table.css"
export default function Table({children}) {
  return (
    <div className="table_wrapper">
      <table className="innerTable">{children}</table>
    </div>
  )
}
