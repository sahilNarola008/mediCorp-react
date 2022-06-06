import React, { useContext, useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { Box, Snackbar, Slide, Alert } from "@mui/material"
import {
  useStyles,
  useMenuState,
  Header,
  Flyout,
  Main,
  appSettings,
  Context,
  useLocalStorage,
  useMainMenuItems,
  getAppMenus,
  mainMenuItems
} from "@medicorp"

const AppShell = () => {
  const { getAppItem } = useLocalStorage()
  const { snak_open, setSnackOpen, snackContent, setMenus } = useContext(Context)
  const { mobileOpen, handleDrawerToggle, open } = useMenuState()
  const classes = useStyles()
  const { routeConfig, defaultDuration, statusType } = appSettings
  const [token, setToken] = useState(getAppItem("token") || null)

  useEffect(() => {
    if (token)
      setMenus(getAppMenus(mainMenuItems))

  }, [])
  return (
    <>
      {

        token !== null ?
          <Box component="div" sx={classes.root}>
            <Header handleDrawerToggle={handleDrawerToggle} mainClass={open === true ? classes.appBar : classes.appBarShift} />
            <Flyout menuObj={{ mobileOpen, handleDrawerToggle, open }} />
            {window.innerWidth <= 600 &&
              <Box component="div" sx={[classes.mainRoot, classes.smUp]}>
                <Main mainClassName={classes.content} />
              </Box>
            }
            {window.innerWidth > 600 &&
              <Box component="div" sx={[classes.mainRoot, classes.smDown]}>
                <Main mainClassName={open === true ? classes.content : classes.contentShift} />
              </Box>}
          </Box>

          : <Navigate to={routeConfig.login} replace />

      }
      <Snackbar
        open={snak_open}
        autoHideDuration={defaultDuration}
        onClose={() => setSnackOpen(false)}
        TransitionComponent={(props) => (
          <Slide {...props} direction="right" />
        )}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert severity={snackContent.severity ?? statusType.default} variant="filled">
          {snackContent.msg}
        </Alert>
      </Snackbar>
    </>
  )
}
export default AppShell
