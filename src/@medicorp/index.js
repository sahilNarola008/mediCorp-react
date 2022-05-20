//#region utils
export { ContextProvider as Provider, Context } from "utils/context";
export { Strings } from "utils/Strings";
export { default as config } from "utils/config";
export { appSettings } from "utils/appSettings";
export {
  getDefaultValueArray,
  validator,
  useMenus,
  groupBy,
  reorderWidget,
  copyWidget,
  weekDays,
  getRefactoredDates,
  getActualDates,
  enumerateDaysBetweenDates,
} from "utils/helper";
//#endregion

//#region Packages
export { default as PropTypes } from "prop-types";
export { styled } from "@mui/material/styles";
export {
  TreeView,
  TreeItem,
  TabList,
  TabPanel,
  TabContext,
  LocalizationProvider,
  TimePicker,
  LoadingButton,
  MobileDateRangePicker,
} from "@mui/lab";
export { default as AdapterMoment } from "@mui/lab/AdapterMoment";
export { treeItemClasses, useTreeItem } from "@mui/lab/TreeItem";
export { default as MaterialTable } from "@material-table/core";
export { default as useAxios, configure } from "axios-hooks";
export { default as axios } from "axios";
export { ConfirmProvider, useConfirm } from "material-ui-confirm";
export { format } from "react-string-format";
export { default as Counter } from "react-mui-counter";
export { default as moment } from "moment";
export { v4 as uuidv4 } from "uuid";
export { default as LRU } from "lru-cache";
export { default as MaskedInput } from "react-text-mask";

//#endregion

//#region Hooks
export { default as useStyles } from "hooks/useStyles";
export { default as useStartup } from "hooks/useStartup";
export { default as useLocalStorage } from "hooks/useLocalStorage";
export { default as useFlyoutMenus } from "hooks/modules/shell/useFlyoutMenus";
export { default as useMenuState } from "hooks/modules/shell/useMenuState";
export { default as useNavTabs } from "hooks/modules/shell/useNavTabs";
export { default as useDashboard } from "hooks/modules/Dashboard/useDashboard";
export { default as useCategories } from "hooks/modules/Categories/useCategories";
export { default as useProducts } from "hooks/modules/Products/useProducts";
export { default as useDoctors } from "hooks/modules/Doctors/useDoctors";
export { default as useSpecialization } from "hooks/modules/specialization/useSpecialization";
export { default as useUsers } from "hooks/modules/Users/useUsers";
export { default as usePresentation } from "hooks/modules/Presentation/usePresentation";
export { default as useTableIcons } from "hooks/useTableIcons";
export { SearchBar } from "components/SearchBar";
export { SearchBox } from "components/SearchBox";
export { default as useLogin } from "hooks/modules/auth/useLogin";
export { default as usePresentationDetailPanel } from "hooks/modules/Presentation/usePresentationDetailPanel";

//#endregion

//#region Components
export { default as Switch } from "components/Switch";
export { default as Themeify } from "components/Themeify";
export { StyledTreeItem } from "components/StyledTreeItem";
export { default as SmartDialog } from "components/SmartDialog";
export { default as SmartContent } from "components/SmartContent";
export { default as SmartToolbar } from "components/SmartToolbar";
export { default as SmartLayout } from "components/SmartLayout";
export { default as SearchBox2 } from "components/SearchBox2";
export { default as Column } from "components/Column";
export { default as Widget } from "components/Widget";
export { default as Startup } from "components/Startup";
export { default as AppShell } from "components/modules/shell/AppShell";
export { default as Header } from "components/modules/shell/Header";
export { default as NavProfile } from "components/modules/shell/NavProfile";
export { default as NavTabs } from "components/modules/shell/NavTabs";
export { default as Flyout } from "components/modules/shell/Flyout";
export { default as Main } from "components/modules/shell/Main";
export { default as Dashboard } from "components/modules/Dashboard/Dashboard";
export { default as Categories } from "components/modules/Categories/Categories";
export { default as Products } from "components/modules/Products/Products";
export { default as Doctors } from "components/modules/Doctors/Doctors";
export { default as Specialization } from "components/modules/specialization/Specialization";
export { default as Users } from "components/modules/Users/Users";
export { default as Presentation } from "components/modules/Presentation/Presentation";
export { default as Login } from "components/modules/auth/Login";
export { default as PresentationDetailPanel } from "components/modules/Presentation/PresentationDetailPanel";

//#endregion

//#region DataColumns
export { default as categoriesDataColumns } from "dataColumns/categoriesDataColumns";
export { default as productsDataColumns } from "dataColumns/productsDataColumns";
export { default as doctorsDataColumns } from "dataColumns/doctorsDataColumns";
export { default as specializationDataColumn } from "dataColumns/specializationDataColumn";
export { default as usersDataColumn } from "dataColumns/usersDataColumn";
export { default as presentationDataColumns } from "dataColumns/presentationDataColumns";

//#endregion
