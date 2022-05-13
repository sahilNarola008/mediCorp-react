import { appSettings, Context, useTableIcons, useAxios, useConfirm, format } from "@medicorp"
import { useContext, useState } from "react"

function useCategories() {
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

    const [{ data: AllCategories, loading: allCategoriesLoading, allCategoriesErrors }, refetchAllCategories] = useAxios(endpointConfig.categories.getAll)
    const [{ }, refetchCategoriesById] = useAxios(endpointConfig.categories.getCategoriesById, { manual: true })
    const [{ }, saveCategories] = useAxios(
        {
            url: endpointConfig.categories.addCategories,
            method: "POST"
        },
        { manual: true })
    const [{ }, updateCategories] = useAxios(
        {
            url: endpointConfig.categories.updateCategories,
            method: "PUT"
        },
        { manual: true })

    const [{ }, deleteCategories] = useAxios(
        {
            url: endpointConfig.categories.deleteCategoriesById,
            method: "DELETE"
        },
        { manual: true })

    const actions = [
        {
            icon: tableIcons.Add,
            tooltip: 'Add Category',
            isFreeAction: true,
            onClick: (event, rowData) => handleActionClick(event, false, false, {})
        },
        {
            icon: tableIcons.Edit,
            tooltip: 'Edit Application',
            onClick: (event, rowData) => handleActionClick(event, true, false, {})
        },
        {
            icon: tableIcons.Delete,
            tooltip: 'Delete Application',
            onClick: (event, rowData) => new Promise((resolve) => {
                // setIsLoading(true)
                confirm({ description: 'Are you sure you want to delete?' })
                    .then(() => {
                        setModalFormResetKeys([])
                        deleteCategories({ url: format(endpointConfig.categories.deleteCategoriesById, rowData.id) })
                            .then((res) => {
                                if (res.status === 200) {
                                    refetchAllCategories()
                                    resolve()
                                }
                            })
                            .catch(err => err)
                    })
            })
        }
    ]
    const category = [
        { id: "1", categoryName: "INJECTABLES" },
        { id: "2", categoryName: "ORALS" }
    ]
    const handleSubmit = (data, isEdit, id) => {
        const response = isEdit === true ? updateCategories({
            url: format(endpointConfig.categories.updateCategories, id),
            data: {
                id: Number(id),
                ...data
            }
        }) : saveCategories({ data })
        response.then((res) => {
            const { msg, errorMessage, message, title } = res.data
            if (res.status === 200 || res.status === 201) {
                handleModalClose()
                refetchAllCategories()
            }
            logMessage({
                severity: res.status === 200 ? statusType.success : statusType.error,
                msg: msg ?? errorMessage ?? message ?? title
            })
        })
            .catch(err => err)
            .finally(() => setModalTaskRunning(false))
    }



    const handleActionClick = (event, isEdit = false, isView = false, rowData = {}) => {
        console.log(rowData);
        setModalHeader({
            isForm: true,
            title: isEdit === true ? "Edit Category" : "Add Category",
            header: isEdit === true ? "Edit this existing Category" : "Create a new Category",
            modalWidth: 'md'
        })
        setModalContent({
            categoryName: {
                label: "Category Name",
                size: "small",
                variant: "outlined",
                col: 12,
                type: fieldTypes.text.type,
                value: rowData?.categoryName ?? "",
                disabled: isView === true,
                validator: {
                    required: { value: true, message: "Category name is required" }
                }
            },
            isActive: {
                label: "Is Active",
                size: "small",
                variant: "outlined",
                col: 12,
                type: fieldTypes.checkbox.type,
                value: rowData?.model?.connectionName ?? "",
                disabled: isView === true,
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

    const handleModalClose = () => {
        setOpenDialog(false)
        setModalFormResetKeys([])
    }

    return {
        openDialog,
        modalHeader,
        modalContent,
        modalActions,
        modalFormResetKeys,
        modalTaskRunning,
        actions,
        AllCategories,
        allCategoriesLoading,
        handleModalClose,
        category

    }


}

export default useCategories