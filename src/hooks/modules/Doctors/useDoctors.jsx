import { useState, useContext, useEffect } from 'react'
import { Context, useTableIcons, appSettings, useAxios, useConfirm, format, validator, doctorsDataColumns, getDefaultValueArray, Strings } from "@medicorp"

export default function useDoctors() {
    const { logMessage } = useContext(Context);
    const { endpointConfig, fieldTypes, statusType } = appSettings;
    const { tableIcons } = useTableIcons();
    const confirm = useConfirm();

    const [openDialog, setOpenDialog] = useState(false)
    const [modalHeader, setModalHeader] = useState({})
    const [modalContent, setModalContent] = useState({})
    const [modalActions, setModalActions] = useState([])
    const [modalFormResetKeys, setModalFormResetKeys] = useState([])
    const [modalTaskRunning, setModalTaskRunning] = useState(false)
    const [stateData, setStateData] = useState([])
    const [cityData, setCityData] = useState([])

    const genderOptions = [
        { text: "Male", val: "Male" },
        { text: "Female", val: "Female" }
    ]

    const [{ data: doctors, loading: doctorsLoading }, refetchDoctors] = useAxios(endpointConfig.doctors.getAll)
    const [{ data: countries, loading: countriesLoading }, refetchCountries] = useAxios(endpointConfig.country.getAll)
    const [{ data: cities, loading: citiesLoading }, refetchCities] = useAxios(endpointConfig.city.getAll)
    const [{ data: states, loading: stattesLoading }, refetchStates] = useAxios(endpointConfig.state.getAll)
    const [{ data: speciality, loading: specialityLoading }, refetchSpeciality] = useAxios(endpointConfig.specialization.getAll)

    const [{ }, stateByCountryId] = useAxios(format(endpointConfig.state.getStateByCountryId), { manual: true })
    const [{ }, cityByStateId] = useAxios(endpointConfig.city.getCityByStateId, { manual: true })


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

    doctors?.data && doctors?.data.map(
        async (data) => {
            Object.assign(data, { fullName: `${data.firstName} ${data.lastName}` })
            return data
        })

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
                        resolve(res.data.data)
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
        setModalFormResetKeys([])
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
                value: rowData?.gender ?? "Male",
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
                col: 4,
                type: fieldTypes.text.type,
                value: rowData?.email ?? "",
                disabled: isView === true,
                validator: validator.emailValidator
            },
            mobileNumber: {
                label: "Phone",
                size: "small",
                variant: "outlined",
                col: 4,
                type: fieldTypes.text.type,
                value: rowData?.mobileNumber ?? "",
                disabled: isView === true,
                validator: validator.phoneValidator
            },
            specialityId: {
                label: "Speciality",
                type: fieldTypes.autoComplete.type,
                size: "small",
                variant: "outlined",
                col: 4,
                titleProp: "country",
                validator: validator.requiredValidator("Speciality"),
                value: rowData?.specialityId && { label: rowData.specialityTitle, id: rowData.specialityId },
                menuItems: speciality?.data && speciality?.data.map(g => ({
                    label: g.title,
                    id: g.specialityId
                })).sort((a, b) => (a.text ?? "").localeCompare(b.text ?? "")),
                equalityComparer: (option, value) => option.countryId === value,
            },
            addresses: {
                label: "Address",
                size: "small",
                variant: "outlined",
                col: 12,
                type: fieldTypes.textArea.type,
                value: rowData?.addresses ?? "",
                disabled: isView === true,
                validator: validator.textAreaValidator
            },
            // countryId: {
            //     label: "Country",
            //     type: fieldTypes.autoComplete.type,
            //     size: "small",
            //     variant: "outlined",
            //     col: 4,
            //     titleProp: "country",
            //     validator: validator.requiredValidator("Country"),
            //     value: rowData?.countryId && { label: rowData.countryName, id: rowData.countryId },
            //     menuItems: countries?.data && countries?.data.map(g => ({
            //         label: g.countryName,
            //         id: g.countryId
            //     })).sort((a, b) => (a.text ?? "").localeCompare(b.text ?? "")),
            //     equalityComparer: (option, value) => option.countryId === value,
            //     onSelectionChange: (id) => { handleSelectionChange(id, "country") }
            // },
            // stateId: {
            //     label: "State",
            //     type: fieldTypes.autoComplete.type,
            //     size: "small",
            //     variant: "outlined",
            //     col: 4,
            //     titleProp: "State",
            //     validator: validator.requiredValidator("State"),
            //     value: rowData?.stateId && { label: rowData.stateName, id: rowData.stateId },
            //     menuItems: stateData && stateData.map(g => ({
            //         label: g.stateName,
            //         id: g.stateId
            //     })).sort((a, b) => (a.text ?? "").localeCompare(b.text ?? "")),
            //     equalityComparer: (option, value) => option.stateId === value,
            //     onSelectionChange: (id) => { handleSelectionChange(id, "state") }
            // },
            // cityId: {
            //     label: "City",
            //     type: fieldTypes.autoComplete.type,
            //     size: "small",
            //     variant: "outlined",
            //     col: 4,
            //     titleProp: "City",
            //     validator: validator.requiredValidator("City"),
            //     value: rowData.cityId && { label: rowData.cityName, id: rowData.cityId },
            //     menuItems: cityData && cityData.map(g => ({
            //         label: g.cityName,
            //         id: g.cityId
            //     })).sort((a, b) => (a.text ?? "").localeCompare(b.text ?? "")),
            //     equalityComparer: (option, value) => option.cityId === value,
            // },
        })
        setModalActions(isView === true ? [] : [
            {
                label: isEdit === true ? "Update" : "Save",
                icon: isEdit === true ? tableIcons.Edit : tableIcons.Save,
                isSubmit: true,
                action: isEdit === true ? (data) => handleSubmit(data, true, rowData?.doctorId, rowData?.organizationName, rowData?.organizationId) :
                    (data) => {
                        handleSubmit(data, false, null, doctors[0]?.organizationName, doctors[0]?.organizationId)
                    }
            }
        ])
        setOpenDialog(true)
    }


    const handleSelectionChange = (data, dataType) => {
        const { id } = data
        if (dataType === "country") {
            new Promise((resolve, reject) => {
                stateByCountryId({ url: format(endpointConfig.state.getStateByCountryId, id) })
                    .then((res) => {
                        resolve(res)
                    }).catch((error) => {
                        reject(error)
                        logMessage({
                            severity: statusType.error,
                            msg: "Error Getting Data!"
                        })
                    })
            }).then((data) => {
                // modalContentDispatch("COUNTRY", data?.data?.data)
                setStateData(data?.data?.data)
            })
        } else if (dataType === "state") {
            new Promise((resolve, reject) => {
                cityByStateId({ url: format(endpointConfig.city.getCityByStateId, id) })
                    .then((res) => {
                        resolve(res)
                    }).catch((error) => {
                        reject(error)
                        logMessage({
                            severity: statusType.error,
                            msg: "Error Getting Data!"
                        })
                    })
            }).then((data) => {
                // modalContentDispatch("STATE", data?.data?.data)
                setCityData(data?.data?.data)
            })
        }
    }


    const handleSubmit = (data, isEdit, id, organizationName, organizationId) => {
        setModalFormResetKeys([])
        setModalTaskRunning(true)
        const response = isEdit === true ? updateDoctors({
            data: {
                ...data,
                doctorId: Number(id),
                organizationId: 1,
                specialityId: data.specialityId.id,
                isActive: true,
                isDelete: false,
                stateId: data.stateId.id,
                cityId: data.cityId.id,
                countryId: data.countryId.id
            }
        }) : saveDoctors({
            data: {
                ...data,
                // doctorId: 0,
                organizationId: 1,
                specialityId: data.specialityId.id,
                isActive: true,
                isDelete: false,
                stateId: data.stateId.id,
                cityId: data.cityId.id,
                countryId: data.countryId.id
            }
        })
        response.then((res) => {
            const { msg, errorMessage, message, title, isError, errorTitle, status } = res.data
            if (res.status === 200) {
                handleModalClose()
                refetchDoctors()
            }
            logMessage({
                severity: !isError && status != 400 ? statusType.success : statusType.error,
                msg: msg ?? message ?? errorTitle ?? title ?? errorMessage ?? "Data Added Successfully."
            })
        })
            .catch(err => err)
            .finally(() => setModalTaskRunning(false))
    }

    const handleModalClose = () => {
        setModalFormResetKeys([])
        setStateData([])
        setCityData([])
        setOpenDialog(false)
    }
    const { columns } = doctorsDataColumns()


    useEffect(() => {
        setModalFormResetKeys(["stateId"])
        setModalContent(prevContent => ({
            ...prevContent,
            stateId: {
                ...prevContent["stateId"], menuItems: stateData && stateData.map(g => ({
                    label: g.stateName,
                    id: g.stateId
                })).sort((a, b) => (a.text ?? "").localeCompare(b.text ?? ""))
            }
        }))
    }, [stateData])
    useEffect(() => {
        setModalFormResetKeys(["cityId"])
        setModalContent(prevContent => ({
            ...prevContent,
            cityId: {
                ...prevContent["cityId"], menuItems: cityData && cityData.map(g => ({
                    label: g.cityName,
                    id: g.cityId
                })).sort((a, b) => (a.text ?? "").localeCompare(b.text ?? ""))
            }
        }))
    }, [cityData])



    return {
        columns,
        doctors,
        actions,
        doctorsLoading,
        openDialog,
        handleModalClose,
        handleActionClick,
        modalHeader,
        modalContent,
        modalActions,
        modalFormResetKeys,
        modalTaskRunning,
    };
}
