import React, {useState} from 'react'
import "../../style/light.css"
import Header from '../../components/Header/Header'
import Navbar from '../../components/navBar/Navbar'
import Button from '../../components/Button/BlueButton'
import RedButton from '../../components/Button/RedButton'
import Table from '../../components/Table/Table'
import { Toggle } from '../../components/Button/ToggleButton'
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'
import Search from '../../components/SearchBar/SearchBar'

export default function Light() {
    const [lightList , setLightList] = React.useState("") ; 
    const [toggleStatus, setToggleStatus] = React.useState("false")
    const [status, setStatus] = React.useState("") ; 
    const [idStatus, setIdStatus] = React.useState("") ; 
    React.useEffect(() => {
        const getAllLight = async () => {
            const resp = await fetch(`http://localhost:3000/light/all`);
            
            if (!resp.ok) {
                alert("Something wrong")
            }
            
            const json = await resp.json();
            if (json["result"] == "success") setLightList(json["lights"]) 
            console.log(lightList);
            }
        getAllLight();
        },[])
        

    React.useEffect(() => {
        const updateStatus = async (idStatus) => {
            const data = ({
                "Devicename": "",
                "Device_Status": status,
                "RoomID": ""
            });
            console.log(data)
            const config = {
                method: "patch",
                url: `http://localhost:3000/light/${idStatus}`,
                data: data,
            };
            const response = await axios(config);
                console.log(response);
            };           
            console.log(idStatus)
            updateStatus(idStatus);
        }, [idStatus]);
    const logState = state => {
        console.log("Toggled:", state)
    }
    return (
    <div className="contain">
        <Header/>
        <div className="row1">
            <div className='contain_nav'>
                <Navbar name = 'Room' src='./home.png'/>
                <Navbar name = 'Light' src='./light.png'/>
                <Navbar name = 'Air condition' src='./airCondition.png'/>
                <Navbar name = 'Door' src='./door.png'/>
                <Navbar name = 'Water tree' src='./pump.png' />
                <Navbar name = 'Account' src='./setting.png' />
                <Navbar name = 'Logout' src='./logout.png' />
                
            </div>
            <div className='contain_content'>
                <div className='row2'>
                    <div className='row2_1'>
                        <div>
                            <nav>
                                <ul className="list">
                                    <li className="items">Device</li>
                                    <li className="items">History</li>
                                    <li className="items">Dashboard</li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div className='row2_1'>
                        <Button>Light List</Button>
                        <Button>Light On</Button>
                        <RedButton>Add Light</RedButton>    
                    </div>    
                </div>
                <div className='row3'>
                    <Table>
                        <thead>
                            <tr>
                                <th>Light Name</th>
                                <th>Light Code</th>
                                <th>User</th>
                                <th>Day Add</th>
                                <th>Status</th>
                                <th>Mode</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(lightList)  && lightList.map((info) => (
    
                                <tr key={info.ID}>
                                    <td className='color_blue'>{info.Devicename}</td>
            
                                    <td>{info.ID}</td>
                                    <td>Thái</td>
                                    <td >03-08-2023</td>
                                    <td onClick = {() => {
                                        setIdStatus(info.ID);
                                        if (info.Device_Status === "on") setStatus("off")
                                        else setStatus("on")
                                    }}>
                                        {/* check = {()=> {
                                            if (info.Device_Status == "on") setToggleStatus("true")
                                            else setToggleStatus("false")
                                        }}
                                         */}
                                         <Toggle
                                        toggled= {true}
                                        onClick={logState}/>
                                        {info.Device_Status }
                                    </td>
                                    <td>{info.Mode}</td>
                                    <td><FontAwesomeIcon icon={faTrash}/></td>
                                </tr>
                        ))} 
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    </div>
  )
}
