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
//import UserProvider, { UserContext } from "./context/UserContext";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <UserProvider> */}

    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<App />}>
          <Route index path="/room" element={<Room/>}></Route>
          <Route path="/light" element={<ManageLight />}></Route>
          <Route path="/lightChart" element={<LightDashboard />}></Route>
          <Route path="/air" element={<AirConditonal />}></Route>
        </Route>
      </Routes>
      {/* </div> */}
    </BrowserRouter>
    {/* </UserProvider> */}
  </React.StrictMode>
)
