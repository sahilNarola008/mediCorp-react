import React from 'react'
import { SmartDialog, Strings, MaterialTable, useStyles, specializationDataColumn, useSpecialization } from "@medicorp"
function Specialization() {
    const { columns } = specializationDataColumn()
    const {

        openDialog,
        modalHeader,
        modalContent,
        modalActions,
        modalFormResetKeys,
        modalTaskRunning,
        actions,
        specialization, specializationLoading,
        handleModalClose
    } = useSpecialization()
    const { materialTableStyle: tableStyle } = useStyles()
    return (
        <>
            {/* <MaterialTable
                columns={columns}
                data={specialization}
                title={Strings.MENU_DOCTORS_SPECIALIZATION_TITLE}
                actions={actions}
                options={{
                    ...tableStyle,
                    selection: false
                }}
                isLoading={specializationLoading}
            />

            <SmartDialog open={openDialog}
                handleClose={handleModalClose}
                modalHeader={modalHeader}
                modalContent={modalContent}
                modalActions={modalActions}
                modalFormResetKeys={modalFormResetKeys}
                modalTaskRunning={modalTaskRunning}
            /> */}
        </>
    )
}

export default Specialization

