import React from 'react'
import { IconButton, Tooltip } from '@mui/material'
import { ExitToAppRounded } from '@mui/icons-material'
import { appSettings, Strings, useLocalStorage } from '@medicorp'
import { useNavigate } from 'react-router-dom'
export default function NavProfile() {
    const { routeConfig } = appSettings
    const { removeAppItem } = useLocalStorage()
    const navigate = useNavigate()
    const logout = async (e) => {
        removeAppItem("token")
        navigate(routeConfig.login)
    }
    return (
        <Tooltip title={Strings.LOGOUT_TITLE}>
            <IconButton onClick={logout} edge="end" color="secondary">
                <ExitToAppRounded />
            </IconButton>
        </Tooltip>
    )
}
