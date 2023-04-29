import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
//import Login from './pages/login/login'
import './index.css'
import ManageLight from './pages/light/light'
import AirConditonal from './pages/airConditional/airConditional'
import App from './App'
import Login from './pages/login/login'
import LightDashboard from './pages/light/lightDashboard'
import Room from './pages/room/room'
import Door from './pages/door/door'
import Pump from './pages/pump/pump'
import Account from './pages/account/account'
import AirDashboard from './pages/airConditional/airDashboard'
import LightHistory from './pages/light/lightHistory'
import AirHistory from './pages/airConditional/airHistory'
import PumpHistory from './pages/pump/pumpHistory'
import PumpChart from './pages/pump/pumpDashboard'
import UserProvider, { UserContext } from "./context/UserContext";

// import AitHistory from './pages/airConditional/'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <UserProvider>

    <BrowserRouter>
      <Routes>
        <Route index path="/login" element={<Login />}></Route>
        <Route path="/" element={<App />}>
          <Route path="/room" element={<Room />}></Route>
          <Route path="/light" element={<ManageLight />}></Route>
          <Route path="/lightChart" element={<LightDashboard />}></Route>
          <Route path="/lightHistory" element={<LightHistory />}></Route>
          <Route path="/air" element={<AirConditonal />}></Route>
          <Route path="/airHistory" element={<AirHistory />}></Route>
          <Route path="/airChart" element={<AirDashboard />}></Route>
          <Route path="/door" element={<Door />}></Route>
          <Route path="/pump" element={<Pump />}></Route>
          <Route path="/pumpHistory" element={<PumpHistory />}></Route>
          <Route path="/pumpChart" element={<PumpChart />}></Route>

          <Route path="/account" element={<Account />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
)
