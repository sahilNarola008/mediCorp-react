import React from "react";
import { IconButton, Tooltip, Typography } from "@mui/material";
import { ExitToAppRounded } from "@mui/icons-material";
import { appSettings, Strings, useLocalStorage, useStyles } from "@medicorp";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function NavProfile() {
  const classes = useStyles();
  const { routeConfig } = appSettings;
  const { removeAppItem } = useLocalStorage();
  const navigate = useNavigate();
  const logout = async (e) => {
    removeAppItem("token");
    navigate(routeConfig.login);
  };
  return (
    <>
      {/* <Link to="/" style={classes.menuLink} edge="start">
        <Typography
          variant="h6"
          gutterBottom
          component="div"
          style={{ color: "#94121a", fontWeight: "bold" }}
        >
          MEDICORP
        </Typography>
      </Link> */}
      <Tooltip title={Strings.LOGOUT_TITLE}>
        <IconButton onClick={logout} edge="end" color="secondary">
          <ExitToAppRounded />
        </IconButton>
      </Tooltip>
    </>
  );
}
