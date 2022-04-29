import React, { useEffect } from "react"
import { Route, Routes, useNavigate, useLocation, matchPath } from "react-router-dom"
import { Box, Toolbar } from "@mui/material"
import {
  appSettings, NavTabs
} from "@waystone"

function Main({ mainClassName }) {
  const { dashboard, datasource, jobScheduling, settings, help } = appSettings.routeConfig
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const match = matchPath(
    { path: jobScheduling.jobDetails },
    pathname,
  )

  useEffect(() => {
    switch (pathname) {
      case "/":
      case dashboard.baseURL: navigate(dashboard.summary, { replace: true }); break;
      case datasource.baseURL: navigate(datasource.source, { replace: true }); break;
      case jobScheduling.baseURL: navigate(jobScheduling.jobs, { replace: true }); break;
      case settings.baseURL: navigate(settings.config, { replace: true }); break;
    }
  }, [pathname])

  return (
    <Box component="div" sx={mainClassName}>
      <Toolbar />
      {
        match ? <></> : <NavTabs />
      }
      <Routes>

      </Routes>
      <Toolbar />
    </Box>
  )
}
export default Main
