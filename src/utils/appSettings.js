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
    products: {
      baseURL: "/products",
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
    register: {
      register: "/ApiAccount/Register",
    },
    authentication: {
      authentication: "/ApiAccount/Authenticate",
    },
    sources: {
      getAll: "/Source",
      postSource: "/Source",
      updateSource: "/Source",
      getSourceById: "/Source/{0}",
      deleteSourceById: "/Source/{0}",
    },
    categories: {
      getAll: "/ApiProductCategory/GetProductCategory",
      postCategories: "/ApiProductCategory/CreateCategory",
      updateCategories: "/ApiProductCategory/UpdateCategory",
      getCategoriesById: "/ApiProductCategory/GetProductCategoryById?id={0}",
      deleteCategoriesById: "/ApiProductCategory/DeleteCategory?id={0}",
    },
    products: {
      getAll: "/ApiProductMaster/GetProduct",
      addProducts: "/ApiProductMaster/CreateProduct",
      updateProducts: "/ApiProductMaster/UpdateProduct",
      getProductsById: "/ApiProductMaster/GetProductById?id={0}",
      deleteProductsById: "/ApiProductMaster/DeleteProduct?id={0}",
    },
    doctors: {
      getAll: "/ApiDoctorMaster/GetDoctor",
      postDoctors: "/ApiDoctorMaster/CreateDoctor",
      updateDoctors: "/ApiDoctorMaster/UpdateDoctor",
      getDoctorsById: "/ApiDoctorMaster/GetDoctorById?id={0}",
      deleteDoctorsById: "/ApiDoctorMaster/DeleteDoctor?id={0}",
    },
    specialization: {
      getAll: "ApiSpecialityMaster/GetSpeciality",
      postSpecialization: "/ApiSpecialityMaster/CreateSpeciality",
      updateSpecialization: "/ApiSpecialityMaster/UpdateSpeciality",
      getSpecializationById: "/ApiSpecialityMaster/GetSpecialityById?id={0}",
      deleteSpecializationById: "/ApiSpecialityMaster/DeleteSpeciality",
    },
    users: {
      getAll: "/UserMaster/GetUser",
      postUsers: "/UserMaster/InsertUser",
      updateUsers: "/UserMaster/UpdateUser",
      getUsersById: "/UserMaster/GetUser/{0}",
      deleteUsersById: "/UserMaster/DeleteUser/{0}",
    },
    city: {
      getAll: "/ApiCityMaster/GetCity",
      getCityById: "/ApiCityMaster/GetCityById?id={0}",
      postCity: "/ApiCityMaster/CreateCity",
    },
    country: {
      getAll: "/ApiCountryMaster/GetCountry",
      getCountryById: "/ApiCountryMaster/GetCountryById?id={0}",
    },
    roles: {
      getAll: "/Roles/GetRoles",
    },
    state: {
      getAll: "/ApiStateMaster/GetState",
      getStateById: "/ApiStateMaster/GetStateById?id={0}",
      createState: "/ApiStateMaster/CreateState",
    },
    userRoles: {
      getAll: "/UserRoles/GetUserRoles",
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
    search: { type: "search" },
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
