import { useState, useContext } from "react";
import {
  Context,
  useTableIcons,
  appSettings,
  useAxios,
  useConfirm,
  format,
  validator,
} from "@medicorp";
function useSpecialization() {
  const { logMessage } = useContext(Context);
  const { endpointConfig, fieldTypes, statusType } = appSettings;
  const { tableIcons } = useTableIcons();
  const confirm = useConfirm();

  const [openDialog, setOpenDialog] = useState(false);
  const [modalHeader, setModalHeader] = useState({});
  const [modalContent, setModalContent] = useState({});
  const [modalActions, setModalActions] = useState([]);
  const [modalFormResetKeys, setModalFormResetKeys] = useState([]);
  const [modalTaskRunning, setModalTaskRunning] = useState(false);

  const [
    { data: specialization, loading: specializationLoading },
    refetchSpecialization,
  ] = useAxios(endpointConfig.specialization.getAll);
  const [{}, refetchSpecializationById] = useAxios(
    endpointConfig.specialization.getSpecializationById,
    { manual: true }
  );
  const [{}, postSpecialization] = useAxios(
    {
      url: endpointConfig.specialization.postSpecialization,
      method: "POST",
    },
    { manual: true }
  );
  const [{}, updateSpecialization] = useAxios(
    {
      url: endpointConfig.specialization.updateSpecialization,
      method: "PUT",
    },
    { manual: true }
  );
  const [{}, deleteSpecialization] = useAxios(
    {
      url: endpointConfig.specialization.deleteSpecializationById,
      method: "DELETE",
    },
    { manual: true }
  );

  const actions = [
    {
      icon: tableIcons.Add,
      tooltip: "Add User",
      isFreeAction: true,
      onClick: (event, rowData) => handleActionClick(event, false, false, {}),
    },
    {
      icon: tableIcons.Edit,
      tooltip: "Edit Application",
      onClick: (event, rowData) =>
        new Promise((resolve) => {
          setModalFormResetKeys([]);
          refetchSpecializationById({
            url: format(
              endpointConfig.specialization.getSpecializationById,
              rowData.specialityId
            ),
          })
            .then((res) => {
              if (res.status === 200) {
                resolve(res.data);
              }
            })
            .catch((err) => err);
        }).then((data) => handleActionClick(event, true, false, data)),
    },
    {
      icon: tableIcons.Delete,
      tooltip: "Delete Specialization ",
      onClick: (event, rowData) =>
        new Promise((resolve) => {
          confirm({ description: "Are you sure you want to Delete" }).then(
            () => {
              setModalFormResetKeys([]);
              deleteSpecialization({
                url: format(
                  endpointConfig.specialization.deleteSpecializationById,
                  rowData.specialityId
                ),
              })
                .then((res) => {
                  const { msg, errorMessage, message, title } = res.data;
                  if (res.status === 200) {
                    refetchSpecialization();
                    resolve();
                  }
                  logMessage({
                    severity:
                      res.status === 200
                        ? statusType.success
                        : statusType.error,
                    msg: msg ?? errorMessage ?? message ?? title,
                  });
                })
                .catch((err) => err);
            }
          );
        }),
    },
  ];

  const handleActionClick = (
    event,
    isEdit = false,
    isView = false,
    rowData = {}
  ) => {
    setModalHeader({
      isForm: true,
      title: isEdit === true ? "Edit Specialization" : "Add Specialization",
      header:
        isEdit === true
          ? "Edit in existing Specialization"
          : "Create a new Specialization",
      modalWidth: "md",
    });
    setModalContent({
      title: {
        label: "Specialization",
        size: "small",
        variant: "outlined",
        col: 12,
        type: fieldTypes.text.type,
        value: rowData?.title ?? "",
        disabled: isView === true,
        validator: {
          required: { value: true, message: "Specialization required" },
        },
      },
      specialalityDescription: {
        label: "Description",
        size: "small",
        variant: "outlined",
        col: 12,
        type: fieldTypes.text.type,
        value: rowData?.specialalityDescription ?? "",
        disabled: isView === true,
        validator: {
          required: { value: true, message: "Description required" },
        },
      },
      isActive: {
        label: "Active",
        size: "small",
        variant: "outlined",
        col: 12,
        type: fieldTypes.checkbox.type,
        value: rowData?.isActive ?? true,
        disabled: isView === true,
      },
    });
    setModalActions(
      isView === true
        ? []
        : [
            {
              label: isEdit === true ? "Update" : "Save",
              icon: isEdit === true ? tableIcons.Edit : tableIcons.Save,
              isSubmit: true,
              action:
                isEdit === true
                  ? (data) => handleSubmit(data, true, rowData?.specialityId)
                  : (data) => handleSubmit(data, false),
            },
          ]
    );
    setOpenDialog(true);
  };
  const handleSubmit = (data, isEdit, id) => {
    setModalTaskRunning(true);
    const response =
      isEdit === true
        ? updateSpecialization({
            data: {
              specialityId: Number(id),
              organizationId: 1,
              ...data,
            },
          })
        : postSpecialization({
            data: {
              organizationId: 1,
              ...data,
            },
          });
    response
      .then((res) => {
        const { msg, errorMessage, message, title } = res.data;
        if (res.status === 200) {
          handleModalClose();
          refetchSpecialization();
        }
        logMessage({
          severity: res.status === 200 ? statusType.success : statusType.error,
          msg: msg ?? errorMessage ?? message ?? title,
        });
      })
      .catch((err) => err)
      .finally(() => setModalTaskRunning(false));
  };

  const handleModalClose = () => {
    setOpenDialog(false);
    setModalFormResetKeys([]);
  };
  return {
    specialization,
    actions,
    specializationLoading,
    openDialog,
    handleModalClose,
    handleActionClick,
    modalHeader,
    modalContent,
    modalActions,
    modalFormResetKeys,
    modalTaskRunning,
  };
}

export default useSpecialization;
