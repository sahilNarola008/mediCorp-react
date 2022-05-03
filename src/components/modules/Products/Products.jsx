import MaterialTable from '@material-table/core'
import { SmartDialog, Strings, useProducts, useStyles } from '@medicorp'
import React, { useState } from 'react'

// import { Upload, Modal } from 'antd'
// import { PlusOutlined } from '@ant-design/icons'

const Products = () => {
    const {
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

    } = useProducts()
    const { materialTableStyle: tableStyle } = useStyles()

    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewImage, setPreviewImage] = useState("")
    const [previewTitle, setPreviewTitle] = useState("")
    const [fileList, setFileList] = useState([
        // {
        //     uid: '-1',
        //     name: 'image.png',
        //     status: 'done',
        //     url: 'https://cdn.pixabay.com/photo/2016/06/15/16/16/man-1459246_960_720.png',
        // },
        // {
        //     uid: '-2',
        //     name: 'image.png',
        //     status: 'done',
        //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // },
    ])

    // const getBase64 = (file) => {
    //     return new Promise((resolve, reject) => {
    //         const reader = new FileReader()
    //         reader.readAsDataURL(file)
    //         reader.onload = () => resolve(reader.result)
    //         reader.onerror = error => reject(error)
    //     })
    // }

    // const handleCancel = () => setPreviewVisible(false)
    // const handlePreview = async file => {
    //     if (!file.url && !file.preview) {
    //         file.preview = await getBase64(file.originFileObj);
    //     }


    //     setPreviewImage(file.url || file.preview)
    //     setPreviewVisible(true)
    //     setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))

    // }

    // const handleChange = ({ fileList }) => {
    //     setFileList(fileList)
    // }
    // const uploadButton = (
    //     <div>
    //         <PlusOutlined />
    //         <div style={{ marginTop: 8 }}>Upload</div>
    //     </div>
    // );
    return (
        <>

            {/* <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
            >
                {fileList.length >= 8 ? null : uploadButton}
            </Upload> */}

            {/* <Modal
                visible={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
            >
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal> */}

            <MaterialTable
                columns={productsColumn}
                data={producstsData}
                title={Strings.MENU_PRODUCTS_TITLE}
                actions={actions}
                options={{
                    ...tableStyle,
                    selection: false
                }}
                isLoading={false}
            />

            <SmartDialog open={openDialog}
                handleClose={handleModalClose}
                modalHeader={modalHeader}
                modalContent={modalContent}
                modalActions={modalActions}
                modalFormResetKeys={modalFormResetKeys}
                modalTaskRunning={modalTaskRunning}
            />
        </>
    )
}

export default Products