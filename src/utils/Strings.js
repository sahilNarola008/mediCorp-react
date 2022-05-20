import React from "react";

const Strings = {
  LOGOUT_TITLE: "Logout",
  MENU_DASHBOARD_TITLE: "Dashboard",
  MENU_PRODUCTS_TITLE: "Products",
  MENU_CATEGORIESS_TITLE: "Categories",
  MENU_USERS_TITLE: "Users",
  MENU_PRESENTATIONSS_TITLE: "Presentations",
  COLUMN_DATA_SOURCE_TITLE: "Source",
  COLUMN_NAME: "Name",
  COLUMN_SOURCE: "Source",
  COLUMN_ADDRESS: "Address",
  COLUMN_CONNECTION_TYPE: "Type",
  COLUMN_EMAIL: "Email",
  COLUMN_PHONE: "Phone",
  COLUMN_PROTOCOL: "Protocol",
  COLUMN_HOST: "Host",
  COLUMN_MRP: "MRP",
  COLUMN_USER_NAME: "User Name",
  COLUMN_PASSWORD: "Password",
  COLUMN_UPLOAD_IMAGES: "Upload Images",
  COLUMN_PORT: "Port",
  COLUMN_DATA_CONNECTION_TITLE: "Connection",
  COLUMN_DATA_CONNECTION_SOURCE: "Source",
  COLUMN_JOB_STATUS: "Job Status",
  COLUMN_JOB_TYPE: "Job Type",
  COLUMN_JOB_NAME: "Job Name",
  COLUMN_JOBS_SOURCE: "Source",
  COLUMN_JOB_TAGS: "Tags",
  COLUMN_JOB_RISKCORE_IMPORT: "Riskcore Import Template",
  COLUMN_JOB_SCHEDULING_TITLE: "Jobs",
  COLUMN_APPLICATION_NAME: "Name",
  COLUMN_APPLICATION_DESCRIPTION: "Description",
  COLUMN_APPLICATION_TITLE: "Application",
  COLUMN_TAG_TYPE: "Tag Name",
  COLUMN_TAG_TITLE: "Tags",
  COLUMN_ROLES_ROLE_NAME: "Role Name",
  COLUMN_ROLES_ROLE_DESCRIPTION: "Role Description",
  COLUMN_ROLES_USERS: "Users",
  COLUMN_ROLES_PERMISSION: "Permissions",
  COLUMN_ROLES_TITLE: "Roles",
  COLUMN_USERS_USER_NAME: "User Name",
  COLUMN_USERS_FIRST_NAME: "First Name",
  COLUMN_USERS_LAST_NAME: "Last Name",
  COLUMN_USERS_EMAIL: "Email",
  COLUMN_USERS_DEPARTMENT: "Department",
  COLUMN_USERS_USER_ROLE: "User Role",
  COLUMN_USERS_TITLE: "Users",
  COLUMN_USERS_IS_ACTIVE: "Is Active",
  COLUMN_PRODUCT_IS_ACTIVE: "Is Active",
  COLUMN_CALENDAR_NAME: "Calendar Name",
  COLUMN_CALENDAR_YEAR: "Calendar Year",
  COLUMN_CALENDAR_FREQUENCY_TAG: "Frequency Tsg",
  COLUMN_CALENDAR_TITLE: "Calendar",
  COLUMN_APPLICATION_TEMPLATE_TEMP_NAME: "Application Template Name",
  COLUMN_APPLICATION_TEMPLATE_NAME: "Application Name",
  COLUMN_APPLICATION_TEMPLATE_FEILD_MAPPING_COUNT: "Feild Mapping Count",
  COLUMN_APPLICATION_TEMPLATE_TITLE: "Application Template",
  COLUMN_INSIGHTS_ID: "ID",
  COLUMN_INSIGHTS_JOB_NAME: "Job Name",
  COLUMN_INSIGHTS_SOURCE: "Source",
  COLUMN_INSIGHTS_TAGS: "Tags",
  COLUMN_INSIGHTS_FILE_EXPECTED_RCV_DATE: "File Expected Received Date",
  COLUMN_INSIGHTS_FILE_EXPECTED_FREQ_TYPE: "File Expected Frequency Type",
  COLUMN_INSIGHTS_REPORT_EFFECTIVE_DATE_AS_AT:
    "Report(Expected) Effective Date As At",
  COLUMN_INSIGHTS_REPORT_EFFECTIVE_DATE_FROM:
    "Report(Expected) Effective Date From",
  COLUMN_INSIGHTS_REPORT_EFFECTIVE_DATE_TO:
    "Report(Expected) Effective Date To",
  COLUMN_INSIGHTS_PMS_STATUS_TYPE: "PMS Status Type",
  COLUMN_INSIGHTS_PMS_STATUS_DATE: "PMS Status Date",
  COLUMN_INSIGHTS_FILE_DELIVERY_STATUS: "File Delivery Status",
  COLUMN_INSIGHTS_DATA_LOAD_STATUS: "Data Load Status",
  COLUMN_INSIGHTS_DATA_LOAD_DATE: "Data Load Date",
  COLUMN_INSIGHTS_NOTE: "Note",
  COLUMN_INSIGHTS_MANUAL_RUN: "Manual Run",
  COLUMN_INSIGHTS_TITLE: "Insights",
  COLUMN_REMEDIAL_ACTION_JOB_ID: "Job Id",
  COLUMN_REMEDIAL_ACTION_JOB_NAME: "Job Name",
  COLUMN_REMEDIAL_ACTION_SOURCE: "Source",
  COLUMN_REMEDIAL_ACTION_TAGS: "Tags",
  COLUMN_REMEDIAL_ACTION_RISKCORE_IMP_TEMPLATE: "RiskCore Import Template",
  COLUMN_REMEDIAL_ACTION_RECEIVED_DATE: "Received Date",
  COLUMN_REMEDIAL_ACTION_EF_REPORT_DATE: "EF Report Date",
  COLUMN_REMEDIAL_ACTION_STATUS_DATE: "Status Date",
  COLUMN_REMEDIAL_ACTION_STATUS: "Status",
  COLUMN_REMEDIAL_ACTION_RUN: "Run",
  COLUMN_REMEDIAL_ACTION_TITLE: "Remedial Action",
  SCHEDULER_SETTINGS_TITLE: "SCHEDULAR SETTINGS",
  EMAI_SETTING_TITLE: "EMAIL SETTING",
  COLUMN_FIELD_NAME: "Field Name",
  IMPORT: "IMPORT",
  EXPORT: "EXPORT",
  HELP_ABOUT:
    "The PPM (Pre-Processing Module) is a Data Retrieval & Data ETL (Extract, Transform, Load) platform, the main goal of the platform is to retrieve files from different SDP's(data providers), transform those files in-flight as per the business requirement and then pushes the data from those files downstream to Risk and Reporting applications.",
  HELP_RELEASE_NOTES: "Release Notes",
  HELP_TITLE: "Help",
  HELP_RESOURCES: "Resources",
  HELP_WHERE_TO_NEXT: "Where to next?",
  JOB_SCHEDULING_TITLE: "Job Scheduling: ",
  COLUMN_JOBROLE_BASEDON: "Based On",
  COLUMN_JOBROLE_CHECK_IN: "Check In",
  COLUMN_JOBROLE_CELL_OR_HEADER: "Cell Or Header",
  COLUMN_JOBROLE_CELL_OR_HEADER_VALUE: "Cell Or Header Value",
  COLUMN_JOBROLE_OPERATION: "Operation",
  COLUMN_JOBROLE_SEARCH_VALUE: "Search Value",
  COLUMN_JOBROLE_READ_FROM_NEXT_COLCELL: "Read From Next ColCell",
  COLUMN_JOBROLE_SHEET_NAME: "Sheet Name",
  JOBS_FILE_EXPECTED_RECEIVE_DATE: "File Expected Receive Date",
  JOBS_FOR_INSTANCE_INFO: (
    <>
      <u>
        <b>For Instance:</b>
      </u>
      <p>
        If <b>File Expected Effective (Report) Date</b> is <b>22/04/2017</b>{" "}
        <br /> and <b>AsAt(delta)</b> is <b>+3</b>,<br /> then{" "}
        <b>Expected Receive Date</b> will be <b>25/04/2018</b>.<br />
      </p>
    </>
  ),
  JOBS_FOR_EFFECTIVE_INFO: (
    <>
      <u>
        <b>For Instance:</b>
      </u>
      <p>
        If <b>Effective Date</b> is <b>20/04/2018</b>, <b>FromTo(delta)</b> is{" "}
        <b>+3</b> and <b>Range(delta)</b> is <b>14</b>, then{" "}
        <b>Expected Effective (Report) Dates</b> = From: <b>02/04/2017</b>(14
        Business days prior), To: <b>20/04/2017</b> and{" "}
        <b>Expected Receive date = 23/04/2017</b>.
      </p>
    </>
  ),
  JOBS_STEPS_TITLE: "Job Name: ",
  COMPLETE: "Complete",
  COLUMN_BASED_ON: "Based On",
  COLUMN_CHECK_IN: "Check In",
  COLUMN_CELL_OR_HEADER: "Cell Or Header",
  COLUMN_CELL_OR_HEADER_VALUE: "Cell Or Header Value",
  COLUMN_OPERATION: "Operation",
  COLUMN_SEARCH_VALUE: "Search Value",
  COLUMN_READ_FROM_NEXT_COLCELL: "Read From Next ColCell",
  COLUMN_SHEET_NAME: "Sheet Name",
  COLUMN_PRIORITY_ORDER: "Priority Order",
  COLUMN_WIDGET_NAME: "Widget Name",
  COLUMN_PARAMETER: "Parameter",
  COLUMN_FIELD_DESCRIPTION: "Field Description",
  COLUMN_ENABLED: "Enabled",
  COLUMN_ID: "#",
  COLUMN_REPORT_HEADER: "Report Header",
  COLUMN_DATA_TYPE: "Data Type",
  COLUMN_CONNECTION_NAME: "Connection Name",
  COLUMN_DELIVERY_PATH: "Delivery Path",
  BACK_TO_JOB_LISTING: "Back to Jobs",
  REMOTE_DIR_PATH_LABEL: "\\dms.local\\file\\Risk_FunData_Client\\Citco\\",
  COLUMN_DELIVERY_FILE_NAME: "Delivery File Name",
  COLUMN_FILE_FORMAT: "File Format",
  COLUMN_FEILD_MAPPING: "Feild Mapping",
  COLUMN_DESTINATION_FIELD_NAME: "Destination Field Name",
  COLUMN_SOURCE_FIELD_NAME: "Source Field Name",
  INCOMPLETE: "Incomplete",
  COLUMN_EXPECTED_EFFECTIVE_DATE_FROM: "Expected Effective Date - From",
  COLUMN_EXPECTED_EFFECTIVE_DATE_TO: "Expected Effective Date - To",
  COLUMN_FILE_EFFECTIVE_DATE: "Expected Effective Date - As At",
  COLUMN_FILE_EXPECTED_RECEIVE_DATE: "File Expected Receive Date",
  DELETE_SCHEDULE_DATE:
    "Few Scheduled task might be processed previously. Do you want to delete all the Scheduled task for all the years?",
  DELETE_ALL: "Delete All",
  BACK_TO_CALENDAR_LISTING: "Back to Calendar",

  COLUMN_ERRNO: "No",
  COLUMN_ERRDATE: "Date",
  COLUMN_ERRMESSAGE: "Message",
  SEARCH_REMEDIAL_ACTION: "Search Remedial Action",
  COLUMN_RCSTATUS: "RC Status",
  COLUMN_LOGDATE: "Log Date",
  COLUMN_RCLOGFILE: "RC Log file",
  COLUMN_RCPREVIEW_FILE: "RC Preview File",
  SEARCH_INSIGHT: "Search Insight",
  COLUMN_FAVORITE_NAME: "Favorite Name",
  POSITION_LOAD_OPTION: "Position Load Option",
  COLUMN_INSIGHT_STATUS: "Status",
  COLUMN_INSIGHT_DATETIME: "Date and Time",
  COLUMN_ORIGINAL_FILE: "Original File",
  COLUMN_PREPROCESSED_FILE: "PreProcessed File",
  COLUMN_LOG_FILE: "Log file",
  COLUMN_APPLICATIONNAME: "Application Name",
  COLUMN_DELIVERY_STATUS: "Delivery Status",
  COLUMN_FILE: "File",
  COLUMN_MESSAGE: "Message",
  INSIGHT_ORDERBY_ID: "id",
  INSIGHT_ORDERBY_JOBNAME: "jobName",
  INSIGHT_ORDERBY_SOURCE: "source",
  INSIGHT_ORDERBY_TAGS: "tags",
  INSIGHT_ORDERBY_STRFILEEXPEXTEDRECEIVEDATE: "strFileExpextedReceiveDate",
  INSIGHT_ORDERBY_STREXPECTEDEFFECTIVEDATEASAT: "strExpectedEffectiveDateAsAt",
  INSIGHT_ORDERBY_STREXPECTEDEFFECTIVEDATEFROM: "strExpectedEffectiveDateFrom",
  INSIGHT_ORDERBY_STREXPECTEDEFFECTIVEDATETO: "strExpectedEffectiveDateTo",
  INSIGHT_ORDERBY_PROCESSINGSTATUS: "processingStatus",
  INSIGHT_ORDERBY_DELIVERYSTATUS: "deliveryStatus",
  INSIGHT_ORDERBY_RISKCORESTATUS: "riskCoreStatus",
  INSIGHT_ORDERBY_RISKCORESTATUSDATE: "riskCoreStatusDate",
  INSIGHT_ORDERBY_MANUALRUN: "manualRun",
  SUMMARY_JOBS_OVERVIEW_TITLE: "Jobs Overview",
  SUMMARY_RECENT_JOBS_TITLE: "Recent Jobs",
  SUMMARY_QUICK_LINKS_TITLE: "Quick Links",
  SUMMARY_SYSTEM_OVERVIEW_TITLE: "System Overview",
  SUMMARY_FTP_LABEL: "FTP",
  SUMMARY_SMS_CAPTION: "SMS",
  SUMMARY_COUNT_CAPTION: "Count",
  SUMMARY_REQUIRES_ATTENTION: "Requires attention",

  ADD_PRODUCTS: "Add Products",
  EDIT_PRODUCTS: "Edit Products",
  MENU_PRODUCTS_TITLE: "Products",
  MENU_DOCTORS_TITLE: "Doctors",
  MENU_DOCTORS_SPECIALIZATION_TITLE: "Doctors Specialization",
  COLUMN_PRODUCTS_NAME: "Product Name",
  COLUMN_PRODUCTS_DESCRIPTION: "Description",
  COLUMN_PRODUCTS_MRP: "MRP",
  COLUMN_PRODUCTS_IMAGE: "Image",
  COLUMN_DOCTORS_FIRST_NAME: "First Name",
  COLUMN_DOCTORS_LAST_NAME: "Last Name",
  COLUMN_DOCTORS_GENDER: "Gender",
  COLUMN_DOCTORS_SPECIALIZATION: "Specialization",
  COLUMN_DOCTORS_EMAIL: "Email",
  COLUMN_DOCTORS_PHONE: "Phone",
  COLUMN_DOCTORS_ADDRESS: "Address",
  COLUMN_DOCTORS_CITY: "City",
  COLUMN_DOCTORS_STATE: "State",
  COLUMN_USERS_NAME: "Name",
  COLUMN_USERS_GENDER: "Gender",
  COLUMN_USERS_PHONE: "Phone",
  COLUMN_DOCTORS_TITLE: "Doctors",
  COLUMNS_DOCTORNAME_TILTLE: "Doctor Name",
  COLUMNS_USERNAME_TILTLE: "User Name",
  SEARCH_TITLE: "Search",
  SEARCH_TITLE_DATERANGE: "Daterange",
  SEARCH_TITLE_CATEGORY: "Category",
  SEARCH_TITLE_PRODUCTS: "Products",
  SEARCH_TITLE_DOCTOR: "Doctor",
  SEARCH_TITLE_USER: "User",
  COLUMN_CATREGORY_IS_ACTIVE: "Is Active",
  COLUMN_DOCTORS_IS_ACTIVE: "Is Active",
};
export { Strings };
