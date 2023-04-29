import React from 'react'
import HeaderAdmin from '../../components/Header/HeaderAdmin'
import Table from '../../components/Table/Table'
import '../../style/adminPage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import BlueButton from '../../components/Button/BlueButton'
import AddUserModal from '../../components/Modal/AddUserModal/AddUserModal'
interface user {
  ID: any
  SSN: any
  Email: any
  Phone: any
  FName: any
  LName: any
  Avatar: any
  City: any
  District: any
  Username: any
  Pass: any
  refreshToken: any
  Role: any
}
export default function Admin() {
  const [users, setUsers] = React.useState<user[]>([])
  const [displayModal, setDisplayModal] = React.useState(false)
  const [deleteId, setDeleteId] = React.useState('')

  React.useEffect(() => {
    const getUser = async () => {
      const resp = await fetch(`http://localhost:3000/user/all`)

      if (!resp.ok) {
        alert('Something wrong')
      }

      const json = await resp.json()
      setUsers(json['users'])
    }

    getUser()
  }, [])

  React.useEffect(() => {
    if (deleteId) {
      async function deleteLight() {
        await fetch(`http://localhost:3000/user/${deleteId}`, {
          method: 'DELETE',
        })
      }
      const devices = [...users]

      setUsers(devices.filter((device) => device.ID !== deleteId))
      console.log('DELETE User')
      deleteLight()
    }
  }, [deleteId])
  return (
    <div>
      <HeaderAdmin></HeaderAdmin>
      <div className="contain_admin_page">
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>SSN</th>
              <th>Fisrt name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>District</th>
              <th>City</th>
              <th>Username</th>
              <th>Password</th>
              <th>Role</th>

              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) &&
              users.map((user) => (
                <tr key={user.ID}>
                  <td className="color_blue">{user.ID}</td>
                  <td>{user.SSN}</td>
                  <td>{user.FName}</td>
                  <td>{user.LName}</td>
                  <td>{user.Email}</td>
                  <td>{user.Phone}</td>
                  <td>{user.District}</td>
                  <td>{user.City}</td>
                  <td>{user.Username}</td>
                  <td>{user.Pass}</td>
                  <td>{user.Role}</td>
                  <td
                    className="pointer"
                    onClick={() => {
                      setDeleteId(user.ID)
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <div className="flex flex-row justify-end">
          <BlueButton onClick={() => setDisplayModal(true)}>
            Add new User
          </BlueButton>
        </div>
      </div>
      <AddUserModal
        displayModal={displayModal}
        setDisplayModal={setDisplayModal}
      ></AddUserModal>
    </div>
  )
}
