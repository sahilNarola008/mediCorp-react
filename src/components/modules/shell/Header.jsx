import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Avatar, Box, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Popover, Toolbar, Tooltip, Typography } from "@mui/material";
import { Menu, AccountCircle, ExitToAppRounded } from "@mui/icons-material";
import { useStyles, useHeader, Strings, SmartDialog } from "@medicorp";

export default function Header(props) {

  const {
    anchorEl,
    setAnchorEl,
    handleClick,
    handleClose,
    logout,
    open,
    openDialog,
    handleModalClose,
    modalHeader,
    modalContent,
    modalActions,
    modalFormResetKeys,
    modalTaskRunning,
    handleActionClick
  } = useHeader()
  const classes = useStyles();
  const { mainClass, handleDrawerToggle } = props;

  return (
    <AppBar position="fixed" color="default" sx={mainClass}>
      <Toolbar variant="dense">
        <IconButton
          edge="start"
          onClick={() => handleDrawerToggle(true)}
          sx={classes.smUp}
        >
          <Menu />
        </IconButton>
        <Grid item xs sx={[classes.title, { textAlign: "center" }]}>
          <Link to="/" style={classes.menuLink}>
            {/* <Typography variant="h6" gutterBottom component="div" style={{ color: "#94121a", fontWeight: 'bold' }}>
                            MEDICORP
                        </Typography> */}
          </Link>
        </Grid>
        <Avatar aria-describedby={"userProfileAvatar"} variant="contained" onClick={handleClick}><AccountCircle /></Avatar>
        <Popover
          id={"userProfile"}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >

          <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <nav aria-label="main mailbox folders">
              <List
                subheader={
                  <ListSubheader component="div" id="nested-list-subheader">
                    {Strings.COLUMN_USER_NAME}
                  </ListSubheader>
                }
              >
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="Edit Profile" onClick={handleActionClick} />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="Change Password" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={logout}>
                    <ListItemIcon>
                      <Tooltip title={Strings.LOGOUT_TITLE}>
                        <IconButton color="secondary">
                          <ExitToAppRounded />
                        </IconButton>
                      </Tooltip>
                    </ListItemIcon>
                    <ListItemText primary="Sign Out" />
                  </ListItemButton>
                </ListItem>
              </List>
            </nav>
          </Box>
        </Popover>

        <SmartDialog
          open={openDialog}
          handleClose={handleModalClose}
          modalHeader={modalHeader}
          modalContent={modalContent}
          modalActions={modalActions}
          modalFormResetKeys={modalFormResetKeys}
          modalTaskRunning={modalTaskRunning}
        />

      </Toolbar>
    </AppBar>
  );
}
