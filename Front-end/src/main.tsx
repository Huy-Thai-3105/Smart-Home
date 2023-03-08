import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import "./index.css";
import Header from "./components/Header/Header" ; 
import ManageLight from "./pages/light/manageLight";
//import UserProvider, { UserContext } from "./context/UserContext";


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <UserProvider> */}
      <BrowserRouter>
        <Routes>
          <Route index path="/header" element={<Header />}></Route>
          <Route index path="/login" element={<Login />}></Route>
          <Route index path="/light" element={<ManageLight />}></Route>
        </Routes>
      </BrowserRouter>
    {/* </UserProvider> */}
  </React.StrictMode>
);
