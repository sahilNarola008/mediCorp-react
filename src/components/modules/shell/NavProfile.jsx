import React from 'react'
import { IconButton, Tooltip } from '@mui/material'
import { ExitToAppRounded } from '@mui/icons-material'
import { Strings } from '@waystone'
export default function NavProfile() {
    // const { oktaAuth } = useOktaAuth()
    const logout = async (e) => {
        // Will redirect to Okta to end the session then redirect back to the configured `postLogoutRedirectUri`
        // await oktaAuth.signOut()
    }
    return (
        <Tooltip title={Strings.LOGOUT_TITLE}>
            <IconButton onClick={logout} edge="end" color="secondary">
                <ExitToAppRounded />
            </IconButton>
        </Tooltip>
    )
}
