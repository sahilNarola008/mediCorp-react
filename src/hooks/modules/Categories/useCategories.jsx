import { appSettings, Context, useTableIcons, useAxios, useConfirm, format } from "@medicorp"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
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


    const [{ data: AllCategories, loading: allCategoriesLoading }, refetchAllCategories] = useAxios(endpointConfig.categories.getAll)
    const [{ }, refetchCategoriesById] = useAxios(endpointConfig.categories.getCategoriesById, { manual: true })

    const [{ }, postCategories] = useAxios(
        {
            url: endpointConfig.categories.postCategories,
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
        // {
        //     icon: tableIcons.Edit,
        //     tooltip: 'Edit Category',
        //     onClick: (event, rowData) => new Promise((resolve) => {
        //         setModalFormResetKeys([])
        //         refetchCategoriesById({ url: format(endpointConfig.categories.getCategoriesById, rowData.categoryId) })
        //             .then(res => {
        //                 if (res.status === 200) {
        //                     resolve(res.data)
        //                 }
        //             }).catch(err => err)
        //     }).then(data => handleActionClick(event, true, false, data.data[0]))
        // },
        // {
        //     icon: tableIcons.Delete,
        //     tooltip: 'Delete Category',
        //     onClick: (event, rowData) => new Promise((resolve) => {
        //         confirm({ description: 'Are you sure you want to delete?' })
        //             .then(() => {
        //                 setModalFormResetKeys([])
        //                 deleteCategories({ url: format(endpointConfig.categories.deleteCategoriesById, rowData.categoryId) })
        //                     .then((res) => {
        //                         if (res.status === 200) {
        //                             refetchAllCategories()
        //                             resolve(res.data)
        //                         }
        //                     })
        //                     .catch(err => err)
        //             })
        //     })
        // }
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
                    deleteCategories({ url: format(endpointConfig.categories.deleteCategoriesById, oldData.categoryId) })
                        .then((res) => {
                            if (res.status === 200) {
                                refetchAllCategories()
                                resolve(res.data)
                            }
                        })
                        .catch(err => {
                            console.log(err)
                            logMessage({
                                severity:
                                    statusType.error,
                                msg: "Error Deleting Categories!"
                            })
                        })
                }, 1000)
            }),
    }




    const category = [
        { id: "1", categoryName: "INJECTABLES" },
        { id: "2", categoryName: "ORALS" }
    ]
    const handleSubmit = (data, isEdit) => {
        console.log(data);
        setModalTaskRunning(true)
        const response = isEdit === true ? updateCategories({
            url: format(endpointConfig.categories.updateCategories),
            data: {
                organizationId: 1,
                isDelete: false,
                ...data
            }
        }) : postCategories({ data: { ...data, organizationId: 1, isDelete: false } })
        response.then((res) => {
            const { msg, errorMessage, message, title, isError } = res.data
            if (res.status === 200 || res.status === 201) {
                handleModalClose()
                refetchAllCategories()
            }
            logMessage({
                severity:
                    !isError ? statusType.success : statusType.error,
                msg: msg ?? errorMessage ?? message ?? title ?? "Category Added Successfully"
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
                value: rowData?.isActive ?? true,
                disabled: isView === true,
            },
        })
        setModalActions(isView === true ? [] : [
            {
                label: isEdit === true ? "Update" : "Save",
                icon: isEdit === true ? tableIcons.Edit : tableIcons.Save,
                isSubmit: true,
                action: isEdit === true ? (data) => handleSubmit(data, true, rowData?.categoryId) : (data) => handleSubmit(data, false, rowData?.id)
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
        category,
        editable

    }


}

export default useCategories