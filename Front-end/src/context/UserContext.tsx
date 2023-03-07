import React from "react";
// import { CookiesProvider, useCookies } from "react-cookie";

// export type UserRole = "user" | "admin" | "guest";

// export interface CredentialsInterface {
//   id: number;
//   name: string;
//   phone: string;
//   userEmail: string;
//   userRole: UserRole;
//   accessToken: string;
//   refreshToken: string;
//   rememberMe: boolean;
//   setUserId(id: number): void;
//   setUsername(name: string): void;
//   setPhone(phone: string): void;
//   setUserEmail(email: string): void;
//   setUserRole(role: UserRole): void;
//   setAccessToken(key: string): void;
//   setRefreshToken(key: string): void;
//   setRememberMe(remember: boolean): void;
// }

// export const UserContext = React.createContext<CredentialsInterface>({
//   id: -1,
//   name: "",
//   phone: "",
//   userEmail: "",
//   userRole: "guest",
//   accessToken: "",
//   refreshToken: "",
//   rememberMe: false,
//   setUserId: () => {},
//   setUsername: () => {},
//   setPhone: () => {},
//   setUserEmail: () => {},
//   setUserRole: () => {},
//   setAccessToken: () => {},
//   setRefreshToken: () => {},
//   setRememberMe: () => {},
// });

// export default function UserProvider(props: { children: any }) {
//   const [userCookies, setUserCookies, removeUserCookies] = useCookies([
//     "access",
//     "refresh",
//     "role",
//     "email",
//     "rememberMe",
//   ]);
//   const [userEmail, setUserEmail] = React.useState(
//     userCookies && userCookies?.email ? userCookies.email : ""
//   );
//   const [userRole, setUserRole] = React.useState<UserRole>(
//     userCookies && userCookies?.role ? userCookies.role : "guest"
//   );
//   const [accessToken, setAccessToken] = React.useState(
//     userCookies && userCookies?.access ? userCookies.access : ""
//   );
//   const [refreshToken, setRefreshToken] = React.useState(
//     userCookies && userCookies?.refresh ? userCookies.refresh : ""
//   );
//   const [rememberMe, setRememberMe] = React.useState(
//     userCookies && userCookies?.rememberMe ? userCookies.rememberMe : false
//   );
//   const [userId, setUserId] = React.useState(-1);
//   const [name, setUsername] = React.useState("");
//   const [phone, setPhone] = React.useState("");

//   React.useEffect(() => {
//     if (
//       accessToken !== "" &&
//       refreshToken !== "" &&
//       userRole !== "guest" &&
//       userEmail !== ""
//     ) {
//       let time = 3 * 3600;
//       setUserCookies("access", accessToken, { path: "/", maxAge: time });
//       setUserCookies("refresh", refreshToken, { path: "/", maxAge: time });
//       setUserCookies("role", userRole, { path: "/", maxAge: time });
//       setUserCookies("email", userEmail, { path: "/", maxAge: time });
//       setUserCookies("rememberMe", rememberMe, { path: "/", maxAge: time });
//     } else {
//       removeUserCookies("access");
//       removeUserCookies("refresh");
//       removeUserCookies("role");
//       removeUserCookies("email");
//       removeUserCookies("rememberMe");
//     }
//   }, [accessToken, refreshToken]);

//   return (
//     <CookiesProvider>
//       <UserContext.Provider
//         value={{
//           id: userId,
//           name,
//           phone,
//           userEmail,
//           userRole,
//           accessToken,
//           refreshToken,
//           rememberMe,
//           setUserId,
//           setUsername,
//           setPhone,
//           setUserEmail,
//           setUserRole,
//           setAccessToken,
//           setRefreshToken,
//           setRememberMe,
//         }}
//       >
//         {props.children}
//       </UserContext.Provider>
//     </CookiesProvider>
//   );
// }
