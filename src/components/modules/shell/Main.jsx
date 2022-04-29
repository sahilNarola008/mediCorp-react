import React, { useEffect } from "react"
import { Route, Routes, useNavigate, useLocation, matchPath } from "react-router-dom"
import { Box, Toolbar } from "@mui/material"
import {
  appSettings, NavTabs, Dashboard, Categories, Users, Presentation, Products
} from "@medicorp"

function Main({ mainClassName }) {
  const { dashboard, categories, users, products, presentation } = appSettings.routeConfig
  const { pathname } = useLocation()
  const navigate = useNavigate()
  // const match = matchPath(
  //   { path: jobScheduling.jobDetails },
  //   pathname,
  // )

  useEffect(() => {
    switch (pathname) {
      case "/":
      case dashboard.baseURL: navigate(dashboard.baseURL, { replace: true }); break;

    }
  }, [pathname])

  return (
    <Box component="div" sx={mainClassName}>
      <Toolbar />
      {/* {
        match ? <></> : <NavTabs />
      } */}
      <Routes>
        <Route path={dashboard.baseURL} element={<Dashboard />} />
        <Route path={categories.baseURL} element={<Categories />} />
        <Route path={users.baseURL} element={<Users />} />
        <Route path={products.baseURL} element={<Products />} />
        <Route path={presentation.baseURL} element={<Presentation />} />
      </Routes>
      <Toolbar />
    </Box>
  )
}
export default Main
