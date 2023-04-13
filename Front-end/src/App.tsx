import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header'
import SideBar from './components/navBar/SideBar'

export default function App() {
  return (
    <div>
      <div>
        <Header />
        <div className="display__flex">
          <SideBar />
          <Outlet />
        </div>
      </div>
    </div>
  )
}
