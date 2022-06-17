import { appSettings, Context, Strings, useAxios, useLocalStorage, useStyles, useTableIcons, validator } from "@medicorp";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const useHeader = () => {
    const { logMessage } = useContext(Context)
    const [anchorEl, setAnchorEl] = useState(null);

    const [openDialog, setOpenDialog] = useState(false)
    const [modalHeader, setModalHeader] = useState({})
    const [modalContent, setModalContent] = useState({})
    const [modalActions, setModalActions] = useState([])
    const [modalFormResetKeys, setModalFormResetKeys] = useState([])
    const [modalTaskRunning, setModalTaskRunning] = useState(false)

    const classes = useStyles();
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const { tableIcons } = useTableIcons()
    const { routeConfig, endpointConfig, fieldTypes, statusType } = appSettings;
    const { removeAppItem } = useLocalStorage();
    const navigate = useNavigate();
    const [{ }, signOut] = useAxios(
        {
            url: endpointConfig.SignOut.SignOut,
            method: "POST",
        },
        { manual: true }
    );
    const logout = async (e) => {
        removeAppItem("token")
        signOut()
        navigate(routeConfig.login)
    };

    const [{ }, updateUsers] = useAxios(
        {
            url: endpointConfig.users.updateUsers,
            method: "PUT"
        },
        { manual: true })

    const handleActionClick = (event, isView = false, rowData = {}) => {
        setModalHeader({
            isForm: true,
            title: Strings.EDIT_PROFILE,
            header: Strings.EDIT_THIS_PROFILE,
            modalWidth: 'md'
        })
        setModalContent({
            firstName: {
                label:Strings.COLUMN_FIRST_NAME,
                size: "small",
                variant: "outlined",
                col: 6,
                type: fieldTypes.text.type,
                value: rowData?.firstName ?? "",
                disabled: isView === true,
                validator: validator.nameValidator
            },
            lastName: {
                label: Strings.COLUMN_LAST_NAME,
                size: "small",
                variant: "outlined",
                col: 6,
                type: fieldTypes.text.type,
                value: rowData?.lastName ?? "",
                disabled: isView === true,
                validator: validator.nameValidator
            },
            gender: {
                label: Strings.COLUMN_GENDER,
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
                validator: validator.requiredValidator(Strings.USERS_GENDER)
            },
            email: {
                label: Strings.COLUMN_EMAIL,
                size: "small",
                variant: "outlined",
                col: 6,
                type: fieldTypes.text.type,
                value: rowData?.email ?? "",
                disabled: isView === true,
                validator: validator.emailValidator
            },
            phone: {
                label: Strings.COLUMN_PHONE,
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
                label: Strings.UPDATE,
                icon: tableIcons.Edit,
                isSubmit: true,
                action: (data) => handleSubmit(data, rowData?.id)
            }
        ])
        setOpenDialog(true)
    }
    const handleSubmit = (data, id) => {
        setModalTaskRunning(true)
        const response = updateUsers({
            data: {
                // id: Number(id),
                organizationId: 1,
                ...data
            }
        })
        response.then((res) => {
            const { msg, errorMessage, message, title } = res.data
            if (res.status === 200) {
                handleModalClose()
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
        anchorEl,
        setAnchorEl,
        handleClick,
        handleClose,
        logout,
        open,
        openDialog,
        handleModalClose,
        modalHeader,
        modalContent,
        modalActions,
        modalFormResetKeys,
        modalTaskRunning,
        handleActionClick,

    }
}

export default useHeader