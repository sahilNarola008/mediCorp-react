import React from "react"
import { Route, useNavigate, Routes } from "react-router-dom"
import {
  useStartup,
  Security,
  Provider,
  AppShell,
  appSettings
} from "@medicorp"

const Startup = () => {
  const navigate = useNavigate()
  const { routeConfig } = appSettings
  return (
    <Provider>
      <Routes>
        <Route path="*" element={<AppShell />} />
      </Routes>
    </Provider>
  )
}
export default Startup
