import { productsDataColumns, usersDataColumn, doctorsDataColumns } from '@medicorp'
import React, { useState } from 'react'

const usePresentationDetailPanel = () => {
    const [value, setValue] = useState('1')

    const { productsColumn } = productsDataColumns()
    const { columns: doctorsCoumns } = doctorsDataColumns()

    const [producstsData, setProducstsData] = useState([
        {
            id: 1,
            name: 'product1',
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown ",
            mrp: 500,
            isActive: true,
            uploadImage: "https://cdn.pixabay.com/photo/2016/06/15/16/16/man-1459246_960_720.png"
        },
        {
            id: 1,
            name: 'product1',
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown ",
            mrp: 500,
            isActive: true,
            uploadImage: "https://cdn.pixabay.com/photo/2016/06/15/16/16/man-1459246_960_720.png"
        }
    ])



    const doctorsData = [
        {
            id: 1,
            firstName: "vikas",
            lastName: "pandya",
            gender: "male",
            email: "viks@gmail.com",
            phone: "98598569583",
            address: "89-98th avenue las vegas la",
            city: "Las Vegas",
            state: "LA",
        },
        {
            id: 2,
            firstName: "vikas",
            lastName: "pandya",
            gender: "male",
            email: "viks@gmail.com",
            phone: "98598569583",
            address: "89-98th avenue las vegas la",
            city: "Las Vegas",
            state: "LA",
        }
    ]


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