import { useState, useContext, useEffect } from 'react'
import { Context, useTableIcons, appSettings, useAxios, useConfirm, format, validator, doctorsDataColumns, getDefaultValueArray } from "@medicorp"

export default function useDoctors() {
    const { logMessage } = useContext(Context)
    const { endpointConfig, fieldTypes, statusType } = appSettings
    const { tableIcons } = useTableIcons()
    const confirm = useConfirm()

    const [openDialog, setOpenDialog] = useState(false)
    const [modalHeader, setModalHeader] = useState({})
    const [modalContent, setModalContent] = useState({})
    const [modalActions, setModalActions] = useState([])
    const [modalFormResetKeys, setModalFormResetKeys] = useState([])
    const [modalTaskRunning, setModalTaskRunning] = useState(false)

    const genderOptions = [
        { text: "Male", val: "Male" },
        { text: "Female", val: "Female" }
    ]


    const doctorsDummyData = [
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

    const [{ data: doctors, loading: doctorsLoading }, refetchDoctors] = useAxios(endpointConfig.doctors.getAll)
    const [{ data: cities, loading: citiesLoading }, refetchCities] = useAxios(endpointConfig.city.getAll)
    const [{ data: states, loading: stattesLoading }, refetchStates] = useAxios(endpointConfig.state.getAll)
    const [{ data: countries, loading: countriesLoading }, refetchCountries] = useAxios(endpointConfig.country.getAll)

    doctors?.data && doctors?.data.map(
        async (data) => {
            var cityName = null
            var stateName = null
            await cities?.data && cities.data.filter((city) => {
                if (city.cityId === data.cityId) {
                    cityName = city.cityName
                }
            })
            await states?.data && states.data.filter((state) => {
                if (state.stateId === data.stateId) {
                    stateName = state.stateName
                }
            })
            Object.assign(data, { city: cityName }, { state: stateName })
            return data
        })

    const [{ }, refetchDoctorsById] = useAxios(endpointConfig.doctors.getDoctorsById, { manual: true })
    const [{ }, saveDoctors] = useAxios(
        {
            url: endpointConfig.doctors.postDoctors,
            method: "POST"
        },
        { manual: true })
    const [{ }, updateDoctors] = useAxios(
        {
            url: endpointConfig.doctors.updateDoctors,
            method: "PUT"
        },
        { manual: true })
    const [{ }, deleteDoctors] = useAxios(
        {
            url: endpointConfig.doctors.deleteDoctorsById,
            method: "DELETE"
        },
        { manual: true })

    const actions = [
        {
            icon: tableIcons.Add,
            tooltip: "Add Doctor",
            isFreeAction: true,
            onClick: (event, rowData) => handleActionClick(event, false, false, {})
        },
        {
            icon: tableIcons.Edit,
            tooltip: "Edit Application",
            onClick: (event, rowData) => new Promise((resolve) => {
                setModalFormResetKeys([])
                refetchDoctorsById({ url: format(endpointConfig.doctors.getDoctorsById, rowData.doctorId) }).then(res => {
                    if (res.status === 200) {
                        resolve(res.data.data[0])
                    }
                }).catch(err => err)
            }).then(data => handleActionClick(event, true, false, data))
        },
        {
            icon: tableIcons.Delete,
            tooltip: "Delete Application",
            onClick: (event, rowData) => new Promise((resolve) => {
                confirm({ description: "Are You Sure You Want To Delete" })
                    .then(() => { })
            })
        }
    ]

    const handleActionClick = (event, isEdit = false, isView = false, rowData = {}) => {
        console.log(countries?.data && countries?.data.map(g => ({
            label: g.countryName,
            val: g.countryId
        })).sort((a, b) => (a.text ?? "").localeCompare(b.text ?? "")))
        setModalHeader({
            isForm: true,
            title: isEdit === true ? "Edit Doctors" : "Add Doctor",
            header: isEdit === true ? "Edit in existing Doctors" : "Create a new Doctors",
            modalWidth: 'md'
        })
        setModalContent({
            firstName: {
                label: "First Name",
                size: "small",
                variant: "outlined",
                col: 6,
                type: fieldTypes.text.type,
                value: rowData?.firstName ?? "",
                disabled: isView === true,
                validator: validator.nameValidator
            },
            lastName: {
                label: "Last Name",
                size: "small",
                variant: "outlined",
                col: 6,
                type: fieldTypes.text.type,
                value: rowData?.lastName ?? "",
                disabled: isView === true,
                validator: validator.nameValidator
            },
            gender: {
                label: "Gender",
                col: 12,
                type: fieldTypes.radioGroup.type,
                value: rowData?.gender ?? "male",
                options: genderOptions,
                disabled: isView === true,
                row: true,
                isContainer: true,
                alignItems: 'center',
                flexDirection: 'column',
                validator: {
                    required: { value: true, message: "Doctors gender is required" }
                }
            },
            email: {
                label: "Email",
                size: "small",
                variant: "outlined",
                col: 6,
                type: fieldTypes.text.type,
                value: rowData?.email ?? "",
                disabled: isView === true,
                validator: validator.emailValidator
            },
            phone: {
                label: "Phone",
                size: "small",
                variant: "outlined",
                col: 6,
                type: fieldTypes.text.type,
                value: rowData?.mobileNumber ?? "",
                disabled: isView === true,
                validator: validator.phoneValidator
            },
            address: {
                label: "Address",
                size: "small",
                variant: "outlined",
                col: 12,
                type: fieldTypes.textArea.type,
                value: rowData?.addresses ?? "",
                disabled: isView === true,
                validator: validator.textAreaValidator
            },
            country: {
                label: "Country",
                type: fieldTypes.autoComplete.type,
                size: "small",
                variant: "outlined",
                col: 12,
                titleProp: "country",
                value: getDefaultValueArray(countries?.data, rowData?.countryId ?? []),
                menuItems: countries?.data && countries?.data.map(g => ({
                    label: g.countryName,
                    id: g.countryId
                })).sort((a, b) => (a.text ?? "").localeCompare(b.text ?? "")),
                equalityComparer: (option, value) => option.id === value,
            },
            city: {
                label: "City",
                type: fieldTypes.autoComplete.type,
                size: "small",
                variant: "outlined",
                col: 6,
                titleProp: "City",
                value: getDefaultValueArray(cities?.data, rowData?.cityId ?? []),
                menuItems: cities?.data && cities?.data.map(g => ({
                    label: g.cityName,
                    id: g.cityId
                })).sort((a, b) => (a.text ?? "").localeCompare(b.text ?? "")),
                equalityComparer: (option, value) => option.id === value,
            },
            State: {
                label: "State",
                type: fieldTypes.autoComplete.type,
                size: "small",
                variant: "outlined",
                col: 6,
                titleProp: "State",
                value: getDefaultValueArray(states?.data, rowData?.stateId ?? []),
                menuItems: states?.data && states?.data.map(g => ({
                    label: g.stateName,
                    id: g.stateId
                })).sort((a, b) => (a.text ?? "").localeCompare(b.text ?? "")),
                equalityComparer: (option, value) => option.id === value,
            },


        })
        setModalActions(isView === true ? [] : [
            {
                label: isEdit === true ? "Update" : "Save",
                icon: isEdit === true ? tableIcons.Edit : tableIcons.Save,
                isSubmit: true,
                action: isEdit === true ? (data) => handleSubmit(data, true, rowData?.doctorId) : (data) => handleSubmit(data, false)
            }
        ])
        setOpenDialog(true)
    }
    const handleSubmit = (data, isEdit, id) => {
        setModalTaskRunning(true)
        debugger
        const response = isEdit === true ? updateDoctors({
            data: {
                doctorId: Number(id),
                organizationId: 1,
                ...data
            }
        }) : saveDoctors({ data })
        response.then((res) => {
            const { msg, errorMessage, message, title } = res.data
            if (res.status === 200) {
                handleModalClose()
                refetchDoctors()
            }
            logMessage({
                severity: res.status === 200 ? statusType.success : statusType.error,
                msg: msg ?? errorMessage ?? message ?? title
            })
        })
            .catch(err => err)
            .finally(() => setModalTaskRunning(false))
    }

    const handleModalClose = () => {
        setOpenDialog(false)
        setModalFormResetKeys([])
    }
    const { columns } = doctorsDataColumns()

    return {
        columns,
        doctors, actions, doctorsLoading,
        openDialog,
        handleModalClose,
        handleActionClick,
        modalHeader,
        modalContent,
        modalActions,
        modalFormResetKeys,
        modalTaskRunning,
        doctorsDummyData

    }
}
