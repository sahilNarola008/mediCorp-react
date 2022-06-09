import React from "react";
import {
  categoriesDataColumns,
  SmartDialog,
  Strings,
  useCategories,
  MaterialTable,
  useStyles,
} from "@medicorp";
const Categories = () => {
  const { columns } = categoriesDataColumns();

  const {
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
  } = useCategories();
  const { materialTableStyle: tableStyle } = useStyles();
  return (
    <>
      <MaterialTable
        columns={columns}
        data={AllCategories?.data}
        title={Strings.MENU_CATEGORIESS_TITLE}
        actions={actions}
        options={{
          ...tableStyle,
          selection: false,
         
        }}
        isLoading={allCategoriesLoading}
      />

      <SmartDialog
        open={openDialog}
        handleClose={handleModalClose}
        modalHeader={modalHeader}
        modalContent={modalContent}
        modalActions={modalActions}
        modalFormResetKeys={modalFormResetKeys}
        modalTaskRunning={modalTaskRunning}
      />
    </>
  );
};

export default Categories;
