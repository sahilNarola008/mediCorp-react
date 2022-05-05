import { useState, useContext } from 'react'
import { Context, useTableIcons, appSettings, useAxios, useConfirm, format, validator, doctorsDataColumns } from "@medicorp"

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

    const [{ data: doctors, loading: doctorsLoading }, refetchDoctors] = useAxios(endpointConfig.doctors.getAll)
    const [{ }, refetchDoctorsById] = useAxios(endpointConfig.doctors.getDoctorsById, { manual: true })
    const [{ }, saveUsers] = useAxios(
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
    const [{ }, deleteTag] = useAxios(
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
                col: 12,
                type: fieldTypes.text.type,
                value: rowData?.firstName ?? "",
                disabled: isView === true,
                validator: validator.nameValidator
            },
            lastName: {
                label: "Last Name",
                size: "small",
                variant: "outlined",
                col: 12,
                type: fieldTypes.text.type,
                value: rowData?.lastName ?? "",
                disabled: isView === true,
                validator: validator.nameValidator
            },
            gender: {
                label: "Gender",
                size: "small",
                variant: "outlined",
                col: 12,
                type: fieldTypes.radioGroup.type,
                value: rowData?.gender ?? "",
                options: [
                    { text: "Male", val: "male" },
                    { text: "Female", val: "female" }
                ],
                disabled: isView === true,
                validator: {
                    required: { value: true, message: "Doctors gender is required" }
                }
            },
            email: {
                label: "Email",
                size: "small",
                variant: "outlined",
                col: 12,
                type: fieldTypes.text.type,
                value: rowData?.email ?? "",
                disabled: isView === true,
                validator: validator.emailValidator
            },
            phone: {
                label: "Phone",
                size: "small",
                variant: "outlined",
                col: 12,
                type: fieldTypes.text.type,
                value: rowData?.phone ?? "",
                disabled: isView === true,
                validator: validator.phoneValidator
            },
            address: {
                label: "Address",
                size: "small",
                variant: "outlined",
                col: 12,
                type: fieldTypes.textArea.type,
                value: rowData?.address ?? "",
                disabled: isView === true,
                validator: validator.textAreaValidator
            },
            city: {
                label: "City",
                size: "small",
                variant: "outlined",
                col: 12,
                type: fieldTypes.text.type,
                value: rowData?.city ?? "",
                disabled: isView === true,
                validator: {
                    required: { value: true, message: "City is required" }
                }
            },
            state: {
                label: "State",
                size: "small",
                variant: "outlined",
                col: 12,
                type: fieldTypes.text.type,
                value: rowData?.state ?? "",
                disabled: isView === true,
                validator: {
                    required: { value: true, message: "State is required" }
                }
            }
        })
        setModalActions(isView === true ? [] : [
            {
                label: isEdit === true ? "Update" : "Save",
                icon: isEdit === true ? tableIcons.Edit : tableIcons.Save,
                isSubmit: true,
                action: isEdit === true ? (data) => handleSubmit(data, true, rowData?.id) : (data) => handleSubmit(data, false)
            }
        ])
        setOpenDialog(true)
    }
    const handleSubmit = (data, isEdit, id) => {
        setModalTaskRunning(true)
        const response = isEdit === true ? updateDoctors({
            data: {
                id: Number(id),
                ...data
            }
        }) : saveUsers({ data })
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

    }
}
