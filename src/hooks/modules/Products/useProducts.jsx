import {
  appSettings,
  productsDataColumns,
  Strings,
  useTableIcons,
  validator,
  useAxios,
  format,
  Context,
  getBase64,
} from "@medicorp";
import React, { useContext, useEffect, useState } from "react";
import { useConfirm } from "material-ui-confirm";

const useProducts = () => {
  const { productsColumn } = productsDataColumns();
  const { tableIcons } = useTableIcons();
  const confirm = useConfirm();
  const { endpointConfig, fieldTypes, statusType } = appSettings;
  const { logMessage, setIsLoading } = useContext(Context);

  const [openDialog, setOpenDialog] = useState(false);
  const [modalHeader, setModalHeader] = useState({});
  const [modalContent, setModalContent] = useState({});
  const [modalActions, setModalActions] = useState([]);
  const [modalFormResetKeys, setModalFormResetKeys] = useState([]);
  const [modalTaskRunning, setModalTaskRunning] = useState(false);
  let productImages = ""
  const [
    { data: AllProducts, loading: allProductsLoading },
    refetchAllProducts,
  ] = useAxios(endpointConfig.products.getAll);
  const [
    { data: AllCategories, loading: allCategoriesLoading },
    refetchAllCategories,
  ] = useAxios(endpointConfig.categories.getAll);
  const [{ }, refetchProductsById] = useAxios(
    endpointConfig.products.getCategoriesById,
    { manual: true }
  );

  const [{ }, postProduct] = useAxios(
    {
      url: endpointConfig.products.addProducts,
      method: "POST",
    },
    { manual: true }
  );
  const [{ }, updateProduct] = useAxios(
    {
      url: endpointConfig.products.updateProducts,
      method: "PUT",
    },
    { manual: true }
  );

  const [{ }, deleteProduct] = useAxios(
    {
      url: endpointConfig.products.getProductsById,
      method: "DELETE",
    },
    { manual: true }
  );

  const allProductsData =
    AllProducts?.data &&
    AllProducts?.data.map((data) => {
      var catName = null;
      const categoryName =
        AllCategories?.data &&
        AllCategories.data.filter((cat) => {
          if (cat.categoryId === data.categoryId) {
            catName = cat.categoryName;
            // return cat.categoryName
          }
        });
      Object.assign(data, { categoryName: catName });
      return data;
    });

  const actions = [
    {
      icon: tableIcons.Add,
      tooltip: "Add Product",
      isFreeAction: true,
      onClick: (event) => handleActionClick(event, false, false),
    },
    {
      icon: tableIcons.Edit,
      tooltip: "Edit Product",
      onClick: (event, rowData) =>
        new Promise((resolve) => {
          console.log(rowData);
          setIsLoading(true)
          setModalFormResetKeys([]);
          refetchProductsById({
            url: format(
              endpointConfig.products.getProductsById,
              rowData.productId
            ),
          })
            .then((res) => {
              if (res.status === 200) {
                resolve(res.data);
              }
            })
            .catch((err) => {
              setIsLoading(false)
              console.log(err)
            });
        }).then((data) => handleActionClick(event, true, false, data.data)),
    },
    {
      icon: tableIcons.Delete,
      tooltip: "Delete Product",
      onClick: (event, rowData) =>
        new Promise((resolve) => {
          confirm({ description: Strings.DELETE_CONFIRM }).then(
            () => {
              setModalFormResetKeys([]);
              deleteProduct({
                url: format(
                  endpointConfig.products.deleteProductsById,
                  rowData.productId
                ),
              })
                .then((res) => {
                  if (res.status === 200) {
                    refetchAllProducts();
                    resolve(res.data);
                  }
                })
                .catch((err) => err);
            }
          );
        }),
    },
  ];

  const handleModalClose = () => {
    setOpenDialog(false);
    setModalFormResetKeys(["image"]);
  };

  const handleActionClick = (
    event,
    isEdit = false,
    isView = false,
    rowData = {}
  ) => {
    setIsLoading(false)
    setModalHeader({
      isForm: true,
      title: isEdit ? Strings.EDIT_PRODUCTS : Strings.ADD_PRODUCTS,
      header: isEdit ? Strings.EDIT_PRODUCTS : Strings.ADD_PRODUCTS,
      modalWidth: "md",
    });
    setModalContent({
      categoryId: {
        label: Strings.TITLE_CATEGORY,
        type: fieldTypes.select.type,
        size: "small",
        variant: "outlined",
        col: 12,
        value: rowData?.categoryId ?? "",
        menuItems:
          AllCategories &&
          AllCategories?.data.map((g) => ({
            text: g.categoryName,
            val: Number(g.categoryId),
          })),
        validator: validator.requiredValidator(Strings.TITLE_CATEGORY)
      },
      productName: {
        label: Strings.COLUMN_PRODUCTS_NAME,
        size: "small",
        variant: "outlined",
        col: 12,
        type: fieldTypes.text.type,
        value: rowData?.productName ?? "",
        disabled: isView === true,
        validator: validator.requiredValidator(Strings.NAME),
      },
      productDescription: {
        label: Strings.COLUMN_DESCRIPTION,
        size: "small",
        variant: "outlined",
        col: 12,
        type: fieldTypes.textArea.type,
        value: rowData?.productDescription ?? "",
        disabled: isView === true,
        validator: validator.requiredValidator(Strings.COLUMN_DESCRIPTION)
      },
      mrp: {
        label: Strings.COLUMN_MRP,
        size: "small",
        variant: "outlined",
        col: 12,
        type: fieldTypes.text.type,
        value: rowData?.mrp ?? "",
        disabled: isView === true,
        validator: validator.PriceValidator,
      },
      isActive: {
        label: Strings.COLUMN_ACTIVE,
        size: "small",
        variant: "outlined",
        col: 12,
        type: fieldTypes.checkbox.type,
        value: rowData?.isActive ?? false,
        disabled: isView === true,
      },
      imageMasterViewModel: {
        size: "small",
        col: 12,
        type: fieldTypes.imageDropzone.type,
        value: rowData?.images ?? [],
        handleSave: (e, data) => {
          debugger
          getBase64(e[0])
            .then(result => {
              productImages = result
            })
            .catch(err => {
              console.log(err);
            });

          console.log(data)
        },
        validator: validator.imageValidator,
        filesLimit: 1,
        maxFileSize: 10000000,
      },
    });
    setModalActions([
      {
        label: isEdit === true ? Strings.UPDATE : Strings.SAVE,
        icon: isEdit === true ? tableIcons.Edit : tableIcons.Save,
        isSubmit: true,
        action: (data) => handleSubmit(data, isEdit, rowData),
      },
    ]);
    setOpenDialog(true);
  };

  const handleSubmit = (data, isEdit, rowData) => {
    console.log(data);
    console.log(productImages);
    debugger
    setModalTaskRunning(true);
    setModalFormResetKeys([]);
    const response =
      isEdit === true
        ? updateProduct({
          url: format(
            endpointConfig.products.updateProducts,
            rowData.productId
          ),
          data: {
            productId: Number(rowData.productId),
            organizationId: 1,
            ...data,
          },
        })
        : postProduct({
          data: {
            ...data,
            isDelete: false,
            organizationId: 1,
            imageMasterViewModel: [
              {
                organizationId: 1,
                imageUrl: productImages,
                isActive: true,
                isDelete: false
              }
            ]
          }
        });
    response
      .then((res) => {
        const { msg, errorMessage, message, title, isError, status, errors } =
          res.data;
        console.log(res.data);
        if (res.status === 200 || res.status === 201) {
          handleModalClose();
          refetchAllProducts();
        }
        logMessage({
          severity: errors === null ? statusType.success : statusType.error,
          msg:
            message ?? errors !== null
              ? Strings.ERROR_OCCURED_WHILE_ADDING_DATA
              : isEdit === true
                ? Strings.PRODUCT_EDITED_SUCCESSFULLY
                : Strings.DATA_ADDED_SUCCESSFULLY,
        });
      })
      .catch((err) => err)
      .finally(() => setModalTaskRunning(false));
  };

  return {
    productsColumn,
    actions,
    modalHeader,
    modalContent,
    modalActions,
    modalFormResetKeys,
    modalTaskRunning,
    handleModalClose,
    openDialog,
    AllProducts,
    allProductsLoading,
  };
};

export default useProducts;
