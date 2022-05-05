import { appSettings, productsDataColumns, Strings, useTableIcons, validator } from '@medicorp'
import React, { useState } from 'react'
import { useConfirm } from "material-ui-confirm"

const useProducts = () => {
    const { productsColumn } = productsDataColumns()
    const { tableIcons } = useTableIcons()
    const confirm = useConfirm()
    const { endpointConfig, fieldTypes } = appSettings


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


    const actions = [
        {
            icon: tableIcons.Add,
            tooltip: 'Add Application',
            isFreeAction: true,
            onClick: () => handleActionClick()
        },
        {
            icon: tableIcons.Edit,
            tooltip: 'Edit Application',
            onClick: () => handleActionClick()
        },
        {
            icon: tableIcons.Delete,
            tooltip: 'Delete Application',
            onClick: () => {
                confirm({ description: 'Are you sure you want to delete?' })
                    .then(() => { })
            }
        }
    ]



    const handleModalClose = () => {
        setOpenDialog(false)
        setModalFormResetKeys([])
    }

    const handleActionClick = (event, isEdit = false, isView = false, rowData = {}) => {
        setModalHeader({
            isForm: true,
            title: isEdit ? Strings.EDIT_PRODUCTS : Strings.ADD_PRODUCTS,
            header: isEdit ? Strings.EDIT_PRODUCTS : Strings.ADD_PRODUCTS,
            modalWidth: 'md'
        })
        setModalContent({
            name: {
                label: "Name",
                size: "small",
                variant: "outlined",
                col: 12,
                type: fieldTypes.text.type,
                value: rowData?.model?.connectionName ?? "",
                disabled: isView === true,
                validator: {
                    required: { value: true, message: "name is required" }
                }
            },
            description: {
                label: "Description",
                size: "small",
                variant: "outlined",
                col: 12,
                type: fieldTypes.textArea.type,
                value: rowData?.model?.connectionName ?? "",
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
                value: rowData?.model?.connectionName ?? "",
                disabled: isView === true,
                validator: validator.PriceValidator
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
            image: {
                // label: 'Upload Images',
                size: "small",
                variant: "outlined",
                col: 12,
                type: fieldTypes.image.type,
                value: rowData?.model?.connectionName ?? "",
                disabled: isView === true,
                // validator: {
                //     required: { value: true, message: "image is required" }
                // }
            }
        })
        setModalActions([
            {
                label: "Run",
                icon: "Run",
                isSubmit: true,
                action: (data) => handleSubmit(data, rowData)
            }
        ])
        setOpenDialog(true)
    }

    const handleSubmit = () => {

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
        openDialog

    }
}

export default useProducts