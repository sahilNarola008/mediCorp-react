import React from 'react'
import { useStyles } from '@medicorp'
import { Link } from '@mui/material'

const Footer = (props) => {
    const { mainClass } = props
    const classes = useStyles()
    return (
        <Link href="https://psoftcs.com/" target={"_blank"} sx={[mainClass, classes.footer]}>Copyright @2022 All Rights Reserved by Pragalbh Software</Link>
    )
}

export default Footer