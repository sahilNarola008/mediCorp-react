import React, { useContext } from 'react'
import { Alert, CssBaseline, Slide, Snackbar } from '@mui/material'
import { BrowserRouter as Router } from 'react-router-dom'
import { Themeify, Startup, ConfirmProvider, Provider, } from '@medicorp'

const App = () => {



    return (
        <div>
            <ConfirmProvider>
                <Themeify>
                    <Router>
                        <Provider>
                            <Startup />
                        </Provider>
                    </Router>
                    <CssBaseline />
                </Themeify>
            </ConfirmProvider>
        </div>
    )
}

export default App
