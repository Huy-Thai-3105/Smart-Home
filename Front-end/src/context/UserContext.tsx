import React from 'react'
import { CookiesProvider, useCookies } from 'react-cookie'

export type UserRole = 'role' | 'CU | AD'

export interface CredentialsInterface {
  id: number
  name: string
  phone: string
  userRole: UserRole
  accessToken: string
  refreshToken: string
  setUserId(id: number): void
  setUsername(name: string): void
  setPhone(phone: string): void
  setUserRole(role: UserRole): void
  setAccessToken(key: string): void
  setRefreshToken(key: string): void
}

export const UserContext = React.createContext<CredentialsInterface>({
  id: -1,
  name: '',
  phone: '',
  userRole: 'role',
  accessToken: '',
  refreshToken: '',
  setUserId: () => {},
  setUsername: () => {},
  setPhone: () => {},
  setUserRole: () => {},
  setAccessToken: () => {},
  setRefreshToken: () => {},
})

export default function UserProvider(props: { children: any }) {
  const [userCookies, setUserCookies, removeUserCookies] = useCookies([
    'access',
    'refresh',
    'role',
    'userID',
  ])
  const [userID, setUserId] = React.useState(
    userCookies && userCookies?.userID ? userCookies.userID : ''
  )
  const [userRole, setUserRole] = React.useState<UserRole>(
    userCookies && userCookies?.role ? userCookies.role : 'guest'
  )
  const [accessToken, setAccessToken] = React.useState(
    userCookies && userCookies?.access ? userCookies.access : ''
  )
  const [refreshToken, setRefreshToken] = React.useState(
    userCookies && userCookies?.refresh ? userCookies.refresh : ''
  )
  const [name, setUsername] = React.useState('')
  const [phone, setPhone] = React.useState('')

  React.useEffect(() => {
    if (accessToken !== '' && refreshToken !== '' && userRole !== 'role') {
      let time = 3 * 3600
      setUserCookies('access', accessToken, { path: '/', maxAge: time })
      setUserCookies('refresh', refreshToken, { path: '/', maxAge: time })
      setUserCookies('role', userRole, { path: '/', maxAge: time })
      setUserCookies('userID', userID, { path: '/', maxAge: time })
    } else {
      removeUserCookies('access')
      removeUserCookies('refresh')
      removeUserCookies('role')
      removeUserCookies('userID')
    }
  }, [accessToken, refreshToken])

  return (
    <CookiesProvider>
      <UserContext.Provider
        value={{
          id: userID,
          name,
          phone,
          userRole,
          accessToken,
          refreshToken,
          setUserId,
          setUsername,
          setPhone,
          setUserRole,
          setAccessToken,
          setRefreshToken,
        }}
      >
        {props.children}
      </UserContext.Provider>
    </CookiesProvider>
  )
}
