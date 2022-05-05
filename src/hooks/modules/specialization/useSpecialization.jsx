import { useState, useContext } from 'react'
import { Context, useTableIcons, appSettings, useAxios, useConfirm, format, validator } from "@medicorp"
function useSpecialization() {
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



    const [{ data: specialization, loading: specializationLoading }, refetchSpecialization] = useAxios(endpointConfig.specialization.getAll)
    const [{ }, refetchSpecializationById] = useAxios(endpointConfig.specialization.getSpecializationById, { manual: true })
    const [{ }, saveUsers] = useAxios(
        {
            url: endpointConfig.specialization.postSpecialization,
            method: "POST"
        },
        { manual: true })
    const [{ }, updateUsers] = useAxios(
        {
            url: endpointConfig.specialization.updateSpecialization,
            method: "PUT"
        },
        { manual: true })
    const [{ }, deleteTag] = useAxios(
        {
            url: endpointConfig.specialization.deleteSpecializationById,
            method: "DELETE"
        },
        { manual: true })

    const actions = [
        {
            icon: tableIcons.Add,
            tooltip: "Add User",
            isFreeAction: true,
            onClick: (event, rowData) => handleActionClick(event, false, false, {})
        },
        {
            icon: tableIcons.Edit,
            tooltip: "Edit Application",
            onClick: (event, rowData) => new Promise((resolve) => {
                setModalFormResetKeys([])
                refetchSpecializationById({ url: format(endpointConfig.specialization.getSpecializationById, rowData.id) })
                    .then(res => {
                        if (res.status === 200) {
                            resolve(res.data)
                        }
                    }).catch(err => err)
            }).then(data => handleActionClick(event, true, false, data))
        },
        {
            icon: tableIcons.Delete,
            tooltip: "Delete Application",
            onClick: (event, rowData) => new Promise((resolve) => {
                confirm({ description: "Are you sure you want to Delete" })
                    .then(() => {
                        setModalFormResetKeys([])
                        deleteTag({ url: format(endpointConfig.users.deleteSpecializationById, rowData.id) })
                            .then((res) => {
                                const { msg, errorMessage, message, title } = res.data
                                if (res.status === 200) {
                                    refetchSpecialization()
                                    resolve()
                                }
                                logMessage({
                                    severity: res.status === 200 ? statusType.success : statusType.error,
                                    msg: msg ?? errorMessage ?? message ?? title
                                })
                            })
                            .catch(err => err)
                    })
            })
        }
    ]



    const handleActionClick = (event, isEdit = false, isView = false, rowData = {}) => {
        setModalHeader({
            isForm: true,
            title: isEdit === true ? "Edit Users" : "Add Users",
            header: isEdit === true ? "Edit in existing Users" : "Create a new Users",
            modalWidth: 'md'
        })
        setModalContent({
            specialization: {
                label: "Specialization",
                size: "small",
                variant: "outlined",
                col: 12,
                type: fieldTypes.text.type,
                value: rowData?.specialization ?? "",
                disabled: isView === true,
                validator: {
                    required: { value: true, message: "Specialization required" }
                }
            },
            description: {
                label: "Description",
                size: "small",
                variant: "outlined",
                col: 12,
                type: fieldTypes.text.type,
                value: rowData?.description ?? "",
                disabled: isView === true,
                validator: {
                    required: { value: true, message: "Description required" }
                }
            },

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
        const response = isEdit === true ? updateUsers({
            data: {
                id: Number(id),
                ...data
            }
        }) : saveUsers({ data })
        response.then((res) => {
            const { msg, errorMessage, message, title } = res.data
            if (res.status === 200) {
                handleModalClose()
                refetchSpecialization()
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
    return {
        specialization, actions, specializationLoading,
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

export default useSpecialization
