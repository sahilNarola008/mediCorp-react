import { indigo, red, amber, lightBlue } from "@mui/material/colors";
const appSettings = {
  appLogo: `${process.env.PUBLIC_URL}/img/logo.svg`,
  oktaConfig: {
    clientId: `${process.env.REACT_APP_CLIENT_ID}`,
    issuer: `https://${process.env.REACT_APP_OKTA_DOMAIN}/oauth2/default`,
    redirectUri: `${process.env.REACT_APP_BASE_URL}/login/callback`, // this makes it so redirects to login if not logged in for secure routes
    scopes: ["openid", "profile", "email"],
    pkce: JSON.parse(`${process.env.REACT_APP_OKTA_ENABLE_PKCE}`),
    disableHttpsCheck: JSON.parse(
      `${process.env.REACT_APP_OKTA_DISABLE_HTTPS_CHECK}`
    ),
  },
  axiosConfig: {
    baseURL: `${process.env.REACT_APP_API_BASE_URL}/api`,
    validateStatus: false,
  },
  routeConfig: {
    login: "/login",
    loginCallback: "/login/callback",
    dashboard: {
      baseURL: "/dashboard",
    },
    categories: {
      baseURL: "/categories",
    },
    routeConfig: {
      login: "/login",
      dashboard: {
        baseURL: "/dashboard",
      },
      categories: {
        baseURL: "/categories",
      },
      users: {
        baseURL: "/users",
      },
      products: {
        baseURL: "/products",
      },
      presentation: {
        baseURL: "/presentation",
      },
    },
    doctors: {
      baseURL: "/doctors",
    },
    specialization: {
      baseURL: "/specialization",
    },
    users: {
      baseURL: "/users",
    },
    presentation: {
      baseURL: "/presentation",
    },
  },
  endpointConfig: {
    sources: {
      getAll: "/Source",
      postSource: "/Source",
      updateSource: "/Source",
      getSourceById: "/Source/{0}",
      deleteSourceById: "/Source/{0}",
    },
    categories: {
      getAll: "/Categories",
      postCategories: "/Categories",
      updateCategories: "/Categories",
      getCategoriesById: "/Categories/{0}",
      deleteCategoriesById: "/Categories/{0}",
    },
    products: {
      getAll: "/Products",
      addProducts: "/Products",
      updateProducts: "/Products/{0}",
      getProductsById: "/Products/{0}",
      deleteProductsById: "/Products/{0}",
    },
    doctors: {
      getAll: "/Doctors",
      postDoctors: "/Doctors",
      updateDoctors: "/Doctors",
      getDoctorsById: "/Doctors/{0}",
      deleteDoctorsById: "/Doctors/{0}",
    },
    specialization: {
      getAll: "/Specialization",
      postSpecialization: "/Specialization",
      updateSpecialization: "/Specialization",
      getSpecializationById: "/Specialization/{0}",
      deleteSpecializationById: "/Specialization/{0}",
    },
    users: {
      getAll: "/Users",
      postUsers: "/Users",
      updateUsers: "/Users",
      getUsersById: "/Users/{0}",
      deleteUsersById: "/Users/{0}",
    },
  },
  fieldGroupTypes: {
    array: "array",
    nullable: "nullable",
    boolean: "boolean",
  },
  fieldTypes: {
    component: { type: "component" },
    table: { type: "table" },
    select: { type: "select" },
    multiSelect: { type: "select-multiple", group: "array" },
    text: { type: "text" },
    password: { type: "password" },
    email: { type: "email" },
    numeric: { type: "numeric", group: "nullable" },
    switch: { type: "switch", group: "boolean" },
    checkbox: { type: "checkbox", group: "boolean" },
    radio: { type: "radio" },
    radioGroup: { type: "radioGroup" },
    textArea: { type: "textarea" },
    autoComplete: { type: "autocomplete" },
    autoCompleteMultiple: { type: "autocomplete-multiple", group: "array" },
    date: { type: "date", group: "nullable" },
    time: { type: "time", group: "nullable" },
    dateTime: { type: "datetime", group: "nullable" },
    image: { type: "image", group: "array" },
    dateRange: { type: "dateRange", group: "array" },
    label: { type: "label" },
    counter: { type: "counter", group: "nullable" },
    aceEditor: { type: "aceEditor" },
  },
  statusType: {
    error: "error",
    info: "info",
    success: "success",
    warning: "warning",
    default: "info",
  },
  defaultDuration: 6000,
  defaultSnackContent: {
    severity: "info",
    msg: "",
  },
  documentsURL: `${process.env.REACT_APP_BASE_URL}/documents/`,
  calendarConfig: {
    colors: {
      Selected: indigo[500],
      Executed: red[500],
      Holiday: amber[500],
      Weekend: lightBlue[500],
    },
    type: {
      daily: { id: 0, title: "Daily" },
      weekly: { id: 1, title: "Weekly" },
      monthly: { id: 2, title: "Monthly" },
    },
  },
};
export { appSettings };
