import { appSettings, productsDataColumns, Strings, useTableIcons, validator, useAxios, format, Context } from '@medicorp'
import React, { useContext, useEffect, useState } from 'react'
import { useConfirm } from "material-ui-confirm"

const useProducts = () => {
    const { productsColumn } = productsDataColumns()
    const { tableIcons } = useTableIcons()
    const confirm = useConfirm()
    const { endpointConfig, fieldTypes, statusType } = appSettings
    const { logMessage } = useContext(Context)

    const [openDialog, setOpenDialog] = useState(false)
    const [modalHeader, setModalHeader] = useState({})
    const [modalContent, setModalContent] = useState({})
    const [modalActions, setModalActions] = useState([])
    const [modalFormResetKeys, setModalFormResetKeys] = useState([])
    const [modalTaskRunning, setModalTaskRunning] = useState(false)

    const [producstsData, setProducstsData] = useState([
        {
            id: 1,
            name: 'product1',
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown ",
            mrp: 500,
            isActive: true,
            uploadImage: "https://cdn.pixabay.com/photo/2016/06/15/16/16/man-1459246_960_720.png"
        },
        {
            id: 1,
            name: 'product1',
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown ",
            mrp: 500,
            isActive: true,
            uploadImage: "https://cdn.pixabay.com/photo/2016/06/15/16/16/man-1459246_960_720.png"
        }
    ])

    const [{ data: AllProducts, loading: allProductsLoading }, refetchAllProducts] = useAxios(endpointConfig.products.getAll)
    const [{ data: AllCategories, loading: allCategoriesLoading }, refetchAllCategories] = useAxios(endpointConfig.categories.getAll)
    const [{ }, refetchProductsById] = useAxios(endpointConfig.products.getCategoriesById, { manual: true })


    const [{ }, postProduct] = useAxios(
        {
            url: endpointConfig.products.addProducts,
            method: "POST"
        },
        { manual: true })
    const [{ }, updateProduct] = useAxios(
        {
            url: endpointConfig.products.updateProducts,
            method: "PUT"
        },
        { manual: true })

    const [{ }, deleteProduct] = useAxios(
        {
            url: endpointConfig.products.getProductsById,
            method: "DELETE"
        },
        { manual: true })


    const allProductsData = AllProducts?.data && AllProducts?.data.map(
        (data) => {
            var catName = null
            const categoryName = AllCategories?.data && AllCategories.data.filter((cat) => {
                if (cat.categoryId === data.categoryId) {
                    catName = cat.categoryName
                    // return cat.categoryName
                }
            })
            Object.assign(data, { categoryName: catName })
            return data
        })

    const actions = [
        {
            icon: tableIcons.Add,
            tooltip: 'Add Product',
            isFreeAction: true,
            onClick: (event) => handleActionClick(event, false, false)
        },
        {
            icon: tableIcons.Edit,
            tooltip: 'Edit Product',
            onClick: (event, rowData) => new Promise((resolve) => {
                console.log(rowData)
                setModalFormResetKeys([])
                refetchProductsById({ url: format(endpointConfig.products.getProductsById, rowData.productId) })
                    .then(res => {
                        if (res.status === 200) {
                            resolve(res.data)
                        }
                    }).catch(err => err)
            }).then(data => handleActionClick(event, true, false, data.data[0]))
        },
        {
            icon: tableIcons.Delete,
            tooltip: 'Delete Product',
            onClick: (event, rowData) => new Promise((resolve) => {
                confirm({ description: 'Are you sure you want to delete?' })
                    .then(() => {
                        setModalFormResetKeys([])
                        deleteProduct({ url: format(endpointConfig.products.deleteProductsById, rowData.productId) })
                            .then((res) => {
                                if (res.status === 200) {
                                    refetchAllProducts()
                                    resolve(res.data)
                                }
                            })
                            .catch(err => err)
                    })
            })
        }
    ]



    const handleModalClose = () => {
        setOpenDialog(false)
        setModalFormResetKeys(["image"])
    }

    const handleActionClick = (event, isEdit = false, isView = false, rowData = {}) => {
        console.log(rowData)
        console.log(rowData?.categoryId)
        setModalHeader({
            isForm: true,
            title: isEdit ? Strings.EDIT_PRODUCTS : Strings.ADD_PRODUCTS,
            header: isEdit ? Strings.EDIT_PRODUCTS : Strings.ADD_PRODUCTS,
            modalWidth: 'md'
        })
        setModalContent({
            categoryId: {
                label: "Category",
                type: fieldTypes.select.type,
                size: "small",
                variant: "outlined",
                col: 12,
                value: rowData?.categoryId ?? '',
                menuItems: AllCategories && AllCategories?.data.map(g => ({
                    text: g.categoryName,
                    val: Number(g.categoryId)
                })),
                validator: {
                    required: { value: true, message: "Please Select category" }
                }
            },
            productName: {
                label: "Product Name",
                size: "small",
                variant: "outlined",
                col: 12,
                type: fieldTypes.text.type,
                value: rowData?.productName ?? "",
                disabled: isView === true,
                validator: {
                    required: { value: true, message: "name is required" }
                }
            },
            productDescription: {
                label: "Description",
                size: "small",
                variant: "outlined",
                col: 12,
                type: fieldTypes.textArea.type,
                value: rowData?.productDescription ?? "",
                disabled: isView === true,
                validator: {
                    required: { value: true, message: "description is required" }
                }
            },
            mrp: {
                label: "MRP",
                size: "small",
                variant: "outlined",
                col: 12,
                type: fieldTypes.text.type,
                value: rowData?.mrp ?? "",
                disabled: isView === true,
                validator: validator.PriceValidator
            },
            isActive: {
                label: "Is Active",
                size: "small",
                variant: "outlined",
                col: 12,
                type: fieldTypes.checkbox.type,
                value: rowData?.isActive ?? false,
                disabled: isView === true,
            },
            image: {
                size: "small",
                variant: "outlined",
                col: 12,
                type: fieldTypes.image.type,
                value: rowData?.model?.connectionName ?? "",
                disabled: isView === true,
            }
        })
        setModalActions([
            {
                label: "Run",
                icon: "Run",
                isSubmit: true,
                action: (data) => handleSubmit(data, isEdit, rowData)
            }
        ])
        setOpenDialog(true)
    }

    const handleSubmit = (data, isEdit, rowData) => {
        console.log(data);
        setModalTaskRunning(true)
        const response = isEdit === true ? updateProduct({
            url: format(endpointConfig.products.updateProducts, rowData.productId),
            data: {
                productId: Number(rowData.productId),
                organizationId: 1,
                ...data
            }
        }) : postProduct({ data: { ...data, organizationId: 1 } })
        response.then((res) => {
            const { msg, errorMessage, message, title, isError, status, errors } = res.data
            console.log(res.data);
            if (res.status === 200 || res.status === 201) {
                handleModalClose()
                refetchAllProducts()
            }
            logMessage({
                severity:
                    errors === null ? statusType.success : statusType.error,
                msg: message ?? errors !== null ? "Error Occured While Adding Data" : isEdit === true ? "Product Edited Successfully" : "Product Added Successfully"
            })
        })
            .catch(err => err)
            .finally(() => setModalTaskRunning(false))
    }


    return {
        productsColumn,
        producstsData,
        actions,
        modalHeader,
        modalContent,
        modalActions,
        modalFormResetKeys,
        modalTaskRunning,
        handleModalClose,
        openDialog,
        AllProducts,
        allProductsLoading

    }
}

export default useProducts