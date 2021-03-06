import React from "react"
import { AuthUserProvider } from "../contexts/AuthContext"
import {Navigation } from './'
export const App = ({ children, location }) => {
  return (
    <AuthUserProvider>
      <div
        className=""
        style={{
          overflow:'scroll',
          minHeight: "100vh",
        }}
      >
        <Navigation/>
        {children}
      </div>
    </AuthUserProvider>
  )
}
