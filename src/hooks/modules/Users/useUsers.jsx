import { useState, useContext } from 'react'
import { Context, useTableIcons, appSettings, useAxios, useConfirm, format, validator, usersDataColumn } from "@medicorp"
const useUsers = () => {
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



    const [{ data: users, loading: usersLoading }, refetchUsers] = useAxios(endpointConfig.users.getAll)
    const [{ }, refetchUsersById] = useAxios(endpointConfig.users.getUsersById, { manual: true })
    const [{ }, saveUsers] = useAxios(
        {
            url: endpointConfig.users.postUsers,
            method: "POST"
        },
        { manual: true })
    const [{ }, updateUsers] = useAxios(
        {
            url: endpointConfig.users.updateUsers,
            method: "PUT"
        },
        { manual: true })
    const [{ }, deleteUser] = useAxios(
        {
            url: endpointConfig.users.deleteUsersById,
            method: "DELETE"
        },
        { manual: true })

    const actions = [
        {
            icon: tableIcons.Add,
            tooltip: "Add User",
            isFreeAction: true,
            onClick: (event, rowData) => handleActionClick(event, false, false, {})
        }
    ]

    const editable = {
        onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    handleSubmit(newData, true)
                    resolve();
                }, 1000)
            }),
        onRowDelete: oldData =>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    deleteUser({ url: format(endpointConfig.users.deleteUsersById, oldData.id) })
                        .then((res) => {
                            if (res.status === 200) {
                                refetchUsers()
                                resolve(res.data)
                            }
                        })
                        .catch(err => {
                            console.log(err)
                            logMessage({
                                severity:
                                    statusType.error,
                                msg: "Error Deleting User!"
                            })
                        })
                }, 1000)
            }),
    }


    const user = [
        { id: "1", firstName: "vishal", lastName: "makavana", gender: "male", email: "vishal@gmail.com", phone: "9033179395" },
        { id: "2", firstName: "makavana", lastName: "makavana", gender: "male", email: "makavana@gmail.com", phone: "9033179395" },
    ]

    const handleActionClick = (event, isEdit = false, isView = false, rowData = {}) => {
        setModalHeader({
            isForm: true,
            title: isEdit === true ? "Edit Users" : "Add Users",
            header: isEdit === true ? "Edit in existing Users" : "Create a new Users",
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
                size: "small",
                variant: "outlined",
                col: 12,
                type: fieldTypes.radioGroup.type,
                value: rowData?.gender ?? "",
                options: [
                    { text: "Male", val: "male" },
                    { text: "Female", val: "female" }
                ],
                alignItems: 'center',
                flexDirection: 'column',
                row: true,
                disabled: isView === true,
                validator: {
                    required: { value: true, message: "Users gender is required" }
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
                value: rowData?.phone ?? "",
                disabled: isView === true,
                validator: validator.phoneValidator
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
        const response = isEdit === true ? updateUsers({
            data: {
                // id: Number(id),
                organizationId: 1,
                ...data
            }
        }) : saveUsers({ data })
        response.then((res) => {
            const { msg, errorMessage, message, title } = res.data
            if (res.status === 200) {
                handleModalClose()
                refetchUsers()
            }
            logMessage({
                severity: res.status === 200 ? statusType.success : statusType.error,
                msg: msg ?? errorMessage ?? message ?? title
            })
        })
            .catch(err => err)
            .finally(() => setModalTaskRunning(false))
    }

    const { columns } = usersDataColumn()

    const handleModalClose = () => {
        setOpenDialog(false)
        setModalFormResetKeys([])
    }
    return {
        user, users, actions, usersLoading,
        openDialog,
        handleModalClose,
        handleActionClick,
        modalHeader,
        modalContent,
        modalActions,
        modalFormResetKeys,
        modalTaskRunning,
        columns,
        editable

    }
}
export default useUsers