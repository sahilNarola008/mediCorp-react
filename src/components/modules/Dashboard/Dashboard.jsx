import { Box, Card, Typography } from '@mui/material'
import React from 'react'
import { useDashboard } from "@medicorp"
const Dashboard = () => {
    const {

    } = useDashboard()
    return (
        <Card>
            <Box sx={{ backgroundColor: "#ff0000ad" }}>
                <Typography variant="h3" component='h1' sx={{ marginLeft: "20px" }}>Medicorp Pharmachuticals</Typography>
            </Box>
        </Card>
    )
}

export default Dashboard