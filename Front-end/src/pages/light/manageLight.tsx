import React from 'react'
import "../../style/light.css"
import Header from '../../components/Header/Header'
import Navbar from '../../components/navBar/Navbar'
import Button from '../../components/Button/BlueButton'
import RedButton from '../../components/Button/RedButton'

export default function 
() {
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
                        abcd
                    </div>
                    <div className='row2_1'>
                        <Button>Light List</Button>
                        <Button>Light On</Button>
                        <RedButton>Add Light</RedButton>    
                    </div>    
                </div>
                <div className='row3'>
                    {/* <Navbar>
                        abcd
                    </Navbar> */}
                </div>
            </div>
        </div>
    </div>
  )
}
