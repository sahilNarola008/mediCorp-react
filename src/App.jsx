import React from 'react'
import { CssBaseline } from '@mui/material'
import { BrowserRouter as Router } from 'react-router-dom'
import { Themeify, Startup, ConfirmProvider } from '@medicorp'

const App = () => (
    <div>
        <ConfirmProvider>
            <Themeify>
                <Router>
                    <Startup />
                </Router>
                <CssBaseline />
            </Themeify>
        </ConfirmProvider>
    </div>
)

export default App
