import React from "react"
import { Link } from "react-router-dom"
import { AppBar, Grid, IconButton, Toolbar } from "@mui/material"
import { Menu } from "@mui/icons-material"
import { useStyles, NavProfile,appSettings } from '@waystone'

export default function Header(props) {
    const classes = useStyles()
    const { handleDrawerToggle } = props
    return (
        <AppBar position="fixed" color="default" sx={classes.appBar}>
            <Toolbar variant="dense">
                <IconButton edge="start" onClick={() => handleDrawerToggle(true)} sx={classes.smUp}>
                    <Menu />
                </IconButton>
                <IconButton edge="start" onClick={() => handleDrawerToggle(false)} sx={classes.smDown}>
                    <Menu />
                </IconButton>
                <Grid item xs sx={classes.title}>
                    <Link to="/">
                        <img src={appSettings.appLogo} alt="Waystone" style={{ height: '1.5rem' }} />
                    </Link>
                </Grid>
                <NavProfile />
            </Toolbar>
        </AppBar>
    )
}