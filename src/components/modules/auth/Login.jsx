import { useLogin, SmartContent } from '@medicorp'
import { Grid, Typography } from '@mui/material'
import React from 'react'

const Login = () => {
    const {
        formHeader,
        formContent,
        formActions,
        formResetKeys,
        formTaskRunning,
        freeAction
    } = useLogin()
    return (
        <>
            <Grid container spacing={2} sx={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "-webkit-fill-available"
            }}>
                <Grid item xs={4} sx={{ margin: "Auto", textAlign: "center" }}>

                </Grid>
                <Grid item xs={4} sx={{ margin: "Auto", textAlign: "center" }}>
                    <Typography variant="h4" sx={{ color: "#d67155" }} gutterBottom component="div">
                        MEDICORP
                    </Typography>
                    <SmartContent
                        formHeader={formHeader}
                        formContent={formContent}
                        formActions={formActions}
                        formResetKeys={formResetKeys}
                        formTaskRunning={formTaskRunning}
                        freeAction={freeAction}
                    />
                </Grid>
                <Grid item xs={4} sx={{ margin: "Auto" }}>

                </Grid>
            </Grid>

        </>
    )
}

export default Login