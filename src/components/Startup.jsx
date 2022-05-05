import React from "react"
import { Route, useNavigate, Routes } from "react-router-dom"
import {
  Login,
  Provider,
  AppShell,
  appSettings
} from "@medicorp"

const Startup = () => {
  const navigate = useNavigate()
  const { login } = appSettings.routeConfig
  return (
    <Provider>
      <Routes>
        <Route path={login} element={<Login />} />
        <Route path="*" element={<AppShell />} />
      </Routes>
    </Provider>
  )
}
export default Startup
