import { appSettings, useTableIcons, useAxios, useLocalStorage } from '@medicorp'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const useLogin = () => {

    const { fieldTypes, endpointConfig } = appSettings
    const { setAppItem, getAppItem } = useLocalStorage()
    const { tableIcons } = useTableIcons()
    const navigate = useNavigate()
    const [formHeader, setFormHeader] = useState({})
    const [formContent, setFormContent] = useState({})
    const [formActions, setFormActions] = useState([])
    const [formResetKeys, setFormResetKeys] = useState([])
    const [formTaskRunning, setFormTaskRunning] = useState(false)
    const [freeAction, setFreeAction] = useState(null)

    const [token, setToken] = useState(getAppItem("token") || null)

    const [{ }, authData] = useAxios(
        {
            url: endpointConfig.authentication.authentication,
            method: "POST"
        },
        { manual: true })

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
            action: (data) => { handleSubmit(data) },
            sx: { margin: "10px auto", width: "100%", borderRadius: "23px" },
            cnt_sx: { width: "100%" }
        }]);



    }

    const handleSubmit = (data) => {
        authData({
            data: {
                "email": data.email,
                "password": data.password
            }
        }).then((res) => {
            console.log(res.data.result.token);
            setAppItem("token", res.data.result.token)
            navigate(`/`)
        }).catch((error) => {
            console.log('====================================');
            console.log(error);
            console.log('====================================');
        })
    }

    return {
        formHeader,
        formContent,
        formActions,
        formResetKeys,
        formTaskRunning,
        freeAction,
        token
    }
}

export default useLogin