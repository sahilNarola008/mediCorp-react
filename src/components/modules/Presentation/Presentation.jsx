import { Button, Card, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const Presentation = () => {
    return (
        <>
            <Card>
                <Box sx={{ textAlign: "center", backgroundColor: "#ff0000ad" }}>
                    <Typography variant="h3" component='h1'>Presentation</Typography>
                </Box>
            </Card>
            <Box mt={5} >
                <Typography variant='h5' component='h2'>Make Your Presentation</Typography>
            </Box>
            <Box>
                <Button>Create</Button>
            </Box>
        </>
    )
}

export default Presentation