import { productsDataColumns, usersDataColumn, doctorsDataColumns, appSettings, useAxios } from '@medicorp'
import React, { useState } from 'react'

const usePresentationDetailPanel = () => {
    const [value, setValue] = useState('1')
    const { endpointConfig, fieldTypes, statusType } = appSettings
    const { productsColumn } = productsDataColumns()
    const { columns: doctorsCoumns } = doctorsDataColumns()

    const [{ data: producstsData, loading: producstsDataLoading }, refetchProducstsData] = useAxios(endpointConfig.products.getAll)
    const [{ data: doctorsData, loading: doctorsDataLoading }, refetchdoctorsData] = useAxios(endpointConfig.doctors.getAll)


    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    return {
        value,
        handleChange,
        productsColumn,
        doctorsCoumns,
        producstsData,
        doctorsData

    }
}

export default usePresentationDetailPanel