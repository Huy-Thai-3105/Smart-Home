import React from 'react'
import "../../style/light.css"
import Header from '../../components/Header/Header'
import Navbar from '../../components/navBar/Navbar'
import Button from '../../components/Button/BlueButton'
import RedButton from '../../components/Button/RedButton'
import Table from '../../components/Table/Table'
import { Toggle } from '../../components/Button/ToggleButton'
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Search from '../../components/SearchBar/SearchBar'

export default function Light() {
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
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='color_blue'>Light 1</td>
                                <td>HUFR48S</td>
                                <td>Thái</td>
                                <td>03-08-2023</td>
                                <td>
                                    <Toggle
                                    toggled={true}
                                    onClick={logState}/>
                                </td>
                                <td><FontAwesomeIcon icon={faTrash}/></td>
                            </tr>
                            <tr>
                                <td className='color_blue'>Light 2</td>
                                <td>HUFR486</td>
                                <td>Thái</td>
                                <td>03-08-2023</td>
                                <td>
                                    <Toggle
                                    toggled={false}
                                    onClick={logState}/>
                                </td>
                                <td>
                                <FontAwesomeIcon icon={faTrash}/>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    </div>
  )
}
