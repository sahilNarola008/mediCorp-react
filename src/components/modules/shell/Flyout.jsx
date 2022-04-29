import React, { useState } from 'react'
import { Drawer, Toolbar, SwipeableDrawer, Paper, Grid, Box } from "@mui/material"
import { ArrowDropDown, ArrowRight } from '@mui/icons-material'
import { useStyles, PropTypes, useFlyoutMenus, TreeView, appSettings } from '@medicorp'
const Flyout = (props) => {
    const classes = useStyles()
    const { window, menuObj } = props
    const { mobileOpen, handleDrawerToggle, open } = menuObj
    const container = window !== undefined ? () => window().document.body : undefined
    const { menus } = useFlyoutMenus()
    const [miniMenuState, setMiniMenuState] = useState(false)

    const handleMouseOver = () => {
        if (!open) {
            setMiniMenuState(!miniMenuState)
        }
    }
    const drawerClass = open ? classes.drawerOpen : miniMenuState ? classes.drawerOpen : classes.drawerClose
    return (
        <Box
            component="nav"
            sx={classes.drawer}>
            <SwipeableDrawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={() => handleDrawerToggle(true)}
                onOpen={() => handleDrawerToggle(true)}
                sx={[classes.smUp, classes.drawerPaper]}
                ModalProps={{
                    keepMounted: false,
                }}>
                <Paper sx={classes.paddedMenuMobile} square elevation={1}>
                    <Grid item sx={classes.title}>
                        <img src={appSettings.appLogo} alt="Waystone" style={{ height: '1.5rem' }} />
                    </Grid>
                </Paper>
                <Box component="div" sx={classes.drawerContainer} >
                    <TreeView
                        defaultCollapseIcon={<ArrowDropDown />}
                        defaultExpandIcon={<ArrowRight />}>
                        {menus}
                    </TreeView>
                </Box>
            </SwipeableDrawer>
            <Drawer
                sx={[classes.smDown, drawerClass]}
                variant="permanent"
                onMouseEnter={handleMouseOver}
                onMouseLeave={handleMouseOver}>
                <Toolbar />
                <Box component="div" sx={classes.drawerContainer}>
                    <TreeView
                        defaultCollapseIcon={<ArrowDropDown />}
                        defaultExpandIcon={<ArrowRight />}
                    >
                        {menus}
                    </TreeView>
                </Box>
            </Drawer>
        </Box>
    )
}
Flyout.propTypes = {
    window: PropTypes.func,
}
export default Flyout
