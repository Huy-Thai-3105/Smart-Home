import { useNavigate } from 'react-router-dom'
import './Header.css'

export default function Header() {
  const navigate = useNavigate()

  const navigateToHome = () => {
    // 👇️ navigate to /contacts
    navigate('/room')
  }
  return (
    <div className="page">
      <div className="container_header">
        <div className="logo_contain  " onClick={navigateToHome}>
          <img className="img__1" src="./logo.png"></img>
          <h2>My Home</h2>
        </div>
        <div className="user_contain">
          <img className="img__1" src="./user.png"></img>
          <p>Trương Huy Thái</p>
        </div>
      </div>
    </div>
  )
}
