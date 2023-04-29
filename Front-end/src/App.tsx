import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header'
import SideBar from './components/navBar/SideBar'
// import { CredentialsInterface, UserContext } from "../src/context/UserContext";
// import { useNavigate } from "react-router-dom";

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
