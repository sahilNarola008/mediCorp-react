import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useMenus } from '@waystone'

const useNavTabs = () => {
    const url = useLocation()
    const menuItems = useMenus()
    const location = url.pathname.toLowerCase()
    const base = location.split('/')[1]
    const tabItems = menuItems.find(item => item.id === base)?.children ?? []
    const selectedIndex = tabItems.length > 0 ?
        tabItems.findIndex(item => item.navigate.split('/').join('') === location.split('/').join('')) : -1
        
    const [value, setValue] = useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    useEffect(() => {
        if (selectedIndex >= 0 && selectedIndex !== value) {
            setValue(selectedIndex)
        }
    }, [selectedIndex])

    return {
        tabItems,
        value,
        handleChange
    }
}

export default useNavTabs
