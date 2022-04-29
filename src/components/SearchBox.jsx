import React, { useEffect, useState } from 'react'
import { Autocomplete, Checkbox, TextField } from '@mui/material'
import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material'
import { PropTypes, Strings } from "@waystone"


function SearchBox(props) {
    const { name, defaultValue, fullWidth, variant, label, type, isSelect, menuItems, isMaskedInput, onChange, size, isDisable, minDate, titleProp } = props
    const [value, setValue] = useState(defaultValue ?? '')
    const [selectedOption, setselectedOption] = useState(defaultValue)
    useEffect(() => {
        if (menuItems && menuItems.length <= 1)
            setselectedOption(defaultValue)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [menuItems])

    useEffect(() => {
        setValue(defaultValue)
    }, [defaultValue])

    const handleOnChange = (event, data) => {
        const { value } = event.target
        setselectedOption(value)
        onChange(name, data)
    }
    return (
        <>

            <Autocomplete
                name={name}
                multiple
                fullWidth
                freeSolo
                value={value}
                options={[]}
                renderOption={(props, option, { selected }) => (
                    <li {...props}>
                        <Checkbox
                            icon={<CheckBoxOutlineBlank fontSize="small" />}
                            checkedIcon={<CheckBox fontSize="small" />}
                            style={{ marginRight: 8 }}
                            checked={selected}
                        />
                        {option}
                    </li>
                )}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        fullWidth
                        inputProps={{
                            ...params.inputProps,
                            autoComplete: "disabled"
                        }}

                        variant="outlined"
                        label="Search"
                    />
                )}
                disabled={isDisable}
                onChange={(e, data) => handleOnChange(e, data)}
            />
        </>
    )
}

SearchBox.defaultProps = {
    name: "",
    defaultValue: '',
    size: 'small',
    fullWidth: true,
    variant: "outlined",
    label: Strings.SEARCH,
    menuItems: [],
    type: "",
    isSelect: false,
    isDisable: false,
    isMaskedInput: false,
    minDate: null,
    onChange: function () { },
    titleProp: ""
}
SearchBox.propTypes = {
    name: PropTypes.string,
    defaultValue: PropTypes.any,
    fullWidth: PropTypes.bool,
    variant: PropTypes.oneOf(["standard", "outlined", "filled"]),
    label: PropTypes.string,
    menuItems: PropTypes.array,
    type: PropTypes.oneOf(['']),
    isSelect: PropTypes.bool,
    isDisable: PropTypes.bool,
    isMaskedInput: PropTypes.bool,
    minDate: PropTypes.any,
    onChange: PropTypes.func,
}

export { SearchBox }