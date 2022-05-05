import MaterialTable from '@material-table/core'
import { SmartDialog, Strings, useProducts, useStyles } from '@medicorp'
import React, { useState } from 'react'


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

    return (
        <>
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