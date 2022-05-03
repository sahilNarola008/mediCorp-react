import { appSettings, useTableIcons } from '@medicorp'
import React, { useEffect, useState } from 'react'

const useLogin = () => {

    const { fieldTypes } = appSettings
    const { tableIcons } = useTableIcons()

    const [formHeader, setFormHeader] = useState({})
    const [formContent, setFormContent] = useState({})
    const [formActions, setFormActions] = useState([])
    const [formResetKeys, setFormResetKeys] = useState([])
    const [formTaskRunning, setFormTaskRunning] = useState(false)
    const [freeAction, setFreeAction] = useState(null)

    useEffect(() => {
        setLoginFormContent()
    }, [])
    const setLoginFormContent = () => {
        setFormContent({
            email: {
                label: "Email",
                type: fieldTypes.text.type,
                size: "small",
                variant: "outlined",
                col: 12,
                validator: {
                    required: { value: true, message: "Please Enter Email Address" }
                },
            },
            password: {
                label: "Password",
                type: fieldTypes.password.type,
                size: "small",
                variant: "outlined",
                col: 12,
                validator: {
                    required: { value: true, message: "Please Enter Password" }
                }
            }
        });
        setFormActions([{
            label: "Login",
            endIcon: tableIcons.Login,
            loadingPosition: "end",
            isSubmit: true,
            color: 'primary',
            action: handleSubmit(),
            sx: { margin: "10px auto", width: "100%", borderRadius: "23px" },
            cnt_sx: { width: "100%" }
        }]);



    }

    const handleSubmit = () => {

    }

    return {
        formHeader,
        formContent,
        formActions,
        formResetKeys,
        formTaskRunning,
        freeAction
    }
}

export default useLogin