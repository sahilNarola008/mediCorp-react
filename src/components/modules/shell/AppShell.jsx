import React, { useContext } from "react"
import { Navigate } from "react-router-dom"
import { Box, Snackbar, Slide, Alert } from "@mui/material"
import {
  useStyles,
  useMenuState,
  Header,
  Flyout,
  Main,
  appSettings,
  Context
} from "@medicorp"

const AppShell = () => {
  const { snak_open, setSnackOpen, snackContent } = useContext(Context)
  const { mobileOpen, handleDrawerToggle, open } = useMenuState()
  const classes = useStyles()
  const { routeConfig, defaultDuration, statusType } = appSettings
  return (
    <>
      {


        <Box component="div" sx={classes.root}>
          <Header handleDrawerToggle={handleDrawerToggle} />
          <Flyout menuObj={{ mobileOpen, handleDrawerToggle, open }} />
          <Box component="div" sx={[classes.mainRoot, classes.smUp]}>
            <Main mainClassName={classes.content} />
          </Box>
          <Box component="div" sx={[classes.mainRoot, classes.smDown]}>
            <Main mainClassName={open === true ? classes.content : classes.contentShift} />
          </Box>
        </Box>

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
