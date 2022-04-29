import React from "react"
import { Link } from "react-router-dom"
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material"
import { Menu } from "@mui/icons-material"
import { useStyles, NavProfile, appSettings } from '@medicorp'

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
                    <Typography variant="h6" gutterBottom component="div" style={{ color: "#94121a", fontWeight: 'bold' }}>
                        MEDICORP
                    </Typography>
                </Grid>
                <NavProfile />
            </Toolbar>
        </AppBar>
    )
}