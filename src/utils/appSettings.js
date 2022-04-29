import { indigo, red, amber, lightBlue } from '@mui/material/colors'
const appSettings = {
    appLogo: `${process.env.PUBLIC_URL}/img/logo.svg`,
    oktaConfig: {
        clientId: `${process.env.REACT_APP_CLIENT_ID}`,
        issuer: `https://${process.env.REACT_APP_OKTA_DOMAIN}/oauth2/default`,
        redirectUri: `${process.env.REACT_APP_BASE_URL}/login/callback`, // this makes it so redirects to login if not logged in for secure routes
        scopes: ['openid', 'profile', 'email'],
        pkce: JSON.parse(`${process.env.REACT_APP_OKTA_ENABLE_PKCE}`),
        disableHttpsCheck: JSON.parse(`${process.env.REACT_APP_OKTA_DISABLE_HTTPS_CHECK}`),
    },
    axiosConfig: {
        baseURL: `${process.env.REACT_APP_API_BASE_URL}/api`,
        validateStatus: false
    },
    routeConfig: {
        login: '/login',
        loginCallback: '/login/callback',
        dashboard: {
            baseURL: '/dashboard',
            insight: 'dashboard/insight',
            remedialActions: 'dashboard/remedial-actions',
            remedialDetailPanel: 'dashboard/remedialDetailPanel',
            summary: 'dashboard/summary'
        },
        jobScheduling: {
            baseURL: '/jobscheduling',
            jobs: 'jobscheduling/jobs',
            jobDetails: 'jobscheduling/jobs/:jobID',
            jobDetailPanel: 'jobscheduling/jobDetailPanel',
            schedules: 'jobscheduling/schedules',
            calendar: 'jobscheduling/calendar',
            calendarTemplate: 'calendar-template/:templateId',
            application: 'jobscheduling/application',
            applicationTemplate: 'jobscheduling/application-template'
        },
        datasource: {
            baseURL: '/datasource',
            connection: 'datasource/connection',
            source: 'datasource/source'
        },
        settings: {
            baseURL: '/settings',
            config: 'settings/config',
            roles: 'settings/roles',
            tag: 'settings/tag',
            user: 'settings/user'
        },
        help: '/help'
    },
    endpointConfig: {
        sources: {
            getAll: '/Source',
            postSource: '/Source',
            updateSource: '/Source',
            getSourceById: '/Source/{0}',
            deleteSourceById: '/Source/{0}',
        },
        connections: {
            getAll: '/Connection',
            postConnection: '/Connection',
            updateConnection: '/Connection',
            getConnectionById: '/Connection/{0}',
            deleteConnection: '/Connection/{0}'
        },
        applications: {
            getAll: '/Application',
            postApplication: '/Application',
            updateApplication: '/Application',
            getApplicationById: '/Application/{0}',
            deleteApplicationById: '/Application/{0}',
        },
        applicationTemplates: {
            getAll: '/ApplicationTemplate',
            postApplicationTemplate: '/ApplicationTemplate',
            updateApplicationTemplates: '/ApplicationTemplate',
            getApplicationTemplateById: '/ApplicationTemplate/{0}',
            deleteApplicationTemplateById: '/ApplicationTemplate/{0}',
            getApplicationTemplateByApplicationId: '/ApplicationTemplate/GetApplicationTemplateByApplicationId?id={0}',
        },
        fileDeliveryTemplate: {
            getAll: '/FileDeliveryTemplate',
            getMappedFieldsByAppTemplateId: '/FileDeliveryTemplates/{0}',
            postMappedFieldById: '/FileDeliveryTemplate',
            putMappedFieldById: '/FileDeliveryTemplate',
            deleteMappedFieldById: '/FileDeliveryTemplate/{0}'
        },
        roles: {
            getAll: '/Role',
            postRole: '/Role',
            updateRole: '/Role',
            getRoleById: '/Role/{0}',
            getRolePermissionById: '/Role/Permission/{0}',
            postRolePermission: '/Role/Permission'
        },
        menu: {
            getMenus: '/Menu'
        },
        tags: {
            getAll: '/Tag',
            postTag: '/Tag',
            updateTag: '/Tag/id',
            getTagById: '/Tag/{0}',
            deleteTagById: '/Tag/id?id={0}',

        },
        users: {
            getAll: '/Users',
            getUsersById: '/Users/{0}',
            postUser: '/Users',
            updateUser: '/Users',
        },
        configs: {
            getEmailConfig: '/Config/email',
            getSchedulerConfig: '/Config/scheduler',
            updateEmailConfig: '/Config/email',
            updateSchedulerConfig: '/Config/scheduler'
        },
        common: {
            getConnectionProtocols: '/Common/ConnectionProtocols',
            getConnectionTypes: '/Common/ConnectionTypes',
            fileValidationDataTypes: '/Common/FileValidationDataTypes',
            fileReadCheckInTypes: '/Common/fileReadCheckInTypes',
            fileReadOperationTypes: '/Common/FileReadOperationTypes',
            fileReadCellOrHeaderTypes: '/Common/FileReadCellOrHeaderTypes',
            fileReadBasedOnTypes: '/Common/FileReadBasedOnTypes',
            getFrequencyTags: '/Common/GetFrequencyTags',
            getCSVDelimiter: '/Common/GetCSVDelimiter',
            getTextDelimiter: '/Common/GetTextDelimiter',
            getCalenderYears: '/Common/GetCalenderYears',
        },
        jobs: {
            getAll: '/Jobs',
            getJobDetailsById: '/Jobs/{0}',
            deleteJobById: '/Jobs',
            createStep1: '/Jobs/CreateJob',
            createStep2: '/Jobs/CreateFundScheduler',
            createStep3: '/Jobs/CreateFileFetch',
            createStep4: '/Jobs/CreateFileSetting',
            createStep5: '/Jobs/CreateFileRead',
            createStep6: '/Jobs/CreateFileManipulation',
            createStep7: '/Jobs/CreateFormulaField',
            createStep8: '/Jobs/CreateFileValidation',
            createStep9: '/Jobs/CreateFileDelivery',
            getStep1Data: '/Jobs/GetJob?fileProcessingTemplateId={0}',
            getStep2Data: '/Jobs/GetFundScheduler?fileProcessingTemplateId={0}',
            getStep3Data: '/Jobs/GetFileFetch?fileProcessingTemplateId={0}',
            getStep4Data: '/Jobs/GetFileSetting?fileProcessingTemplateId={0}',
            getStep5Data: '/Jobs/GetFileRead?fileProcessingTemplateId={0}',
            getStep6Data: '/Jobs/GetFileManipulation?fileProcessingTemplateId={0}',
            getStep7Data: 'Jobs/GetFormulaField?fileProcessingTemplateId={0}',
            getStep7DataById: 'Jobs/GetFormulaFieldById?id={0}',
            getStep8Data: 'Jobs/GetFileValidation?fileProcessingTemplateId={0}',
            getStep9Data: 'Jobs/GetFileDelivery?fileProcessingTemplateId={0}',
            getStep9DataById: 'Jobs/GetFileDeliveryById?id={0}&templateid={1}',
            deleteStep5: '/Jobs/DeleteFileRead',
            deleteStep7Data: 'Jobs/DeleteFormulaField?id={0}',
            toggleFormulaFieldStep7: 'Jobs/ToggleFormulaField',
            deleteStep8Data: 'Jobs/DeleteFileValidation',
            getFieldMappingConfigDataById: 'Jobs/GetFieldMappingConfig?id={0}',
            saveFieldMappingConfigDataById: 'Jobs/SaveFieldMappingConfig/{0}/{1}/{2}',
            deleteFieldMappingConfigDataById: 'Jobs/DeleteFieldMappingConfig?id={0}',
            deleteStep9: '/Jobs/DeleteFileDelivery',
            getGetApplicationsByJobId: 'Jobs/GetApplicationsByFileProcessingTemplateId/{0}',
            getJobStepCompleted:'Jobs/GetJobStepCompleted?fileProcessingTemplateId={0}',
        },
        calendar: {
            getAllCalendarTemplate: '/Calendar/GetAllCalendarTemplate',
            createCalendarTemplate: '/Calendar/CreateCalendarTemplate',
            createCalendar: '/Calendar',
            getCalendarTemplateById: '/Calendar/GetCalendarTemplateById',
            deleteCalendarTemplate: '/Calendar/DeleteCalendarTemplate',
            getCalendar: '/Calendar/getCalendar',
            cloneCalendarTemplate: '/Calendar/CloneCalendarTemplate',
            GetCalendarHolidayNSelectedDateList: '/Calendar/GetCalendar',
        },
        schedular: {
            getAllJob: '/Schedular/GetAllJob',
            getFundDetailsByJobId: '/Schedular/GetFundDetailsByJobId?fileProcessingTemplateId={0}',
            getDatesByJobIdAndCalId: '/Schedular/GetDatesByJobIdAndCalId?fileProcessingTemplateId={0}&CalenderYearId={1}',
            deleteAllScheduledTaskByJobId: '/Schedular/DeleteAllScheduledTaskByJobId',
            getEffectiveAs: '/Schedular/EffectiveAs',
            createEffectiveAs: '/Schedular/SaveEffectiveAs',
        },
        remedialAction: {
            getAllRemedialAction: '/RemedialAction/GetAllRemedialAction',
            getRiskCoreprocessingStatus: '/RemedialAction/GetRiskCoreprocessingStatus',
            remedialActionChildRow: '/RemedialAction/RemedialActionChildRow',
            runMenualRemedialprocess: '/RemedialAction/RunMenualRemedialprocess',
        },
        insight: {
            getAllInsight: '/insight/GetAllInsight',
            selectAllInsight: '/insight/SelectAllInsight',
            getYesterdayBusinessDate: '/Insight/GetYesterdayBusinessDate',
            getprocessingStatus: '/insight/GetprocessingStatus',
            getRiskCoreprocessingStatus: '/insight/GetRiskCoreprocessingStatus',
            dowload: '/insight/Dowload',
            dowloadAttachment: '/insight/DowloadAttachment',
            dowloadMultipleAttachment: '/insight/DowloadMultipleAttachment',
            runMultipleTask: '/insight/RunMultipleTask',
            getFavourite: '/insight/GetFavourite',
            saveFavourite: '/insight/SaveFavourite',
            deleteFavourite: '/insight/DeleteFavourite',
            getRiskCoreProcessed: '/insight/RiskCoreProcessed',
            getRiskCoreImportTemplateSetup: '/insight/RiskCoreImportTemplateSetup',
            getDeliveryStatus: '/insight/GetDeliveryStatus',
            downloadDeliveryFile: '/insight/DownloadDeliveryFile',
        }
    },
    fieldGroupTypes: {
        array: 'array',
        nullable: 'nullable',
        boolean: 'boolean'
    },
    fieldTypes: {
        component: { type: 'component' },
        table: { type: 'table' },
        select: { type: 'select' },
        multiSelect: { type: 'select-multiple', group: 'array' },
        text: { type: 'text' },
        password: { type: 'password' },
        email: { type: 'email' },
        numeric: { type: 'numeric', group: 'nullable' },
        switch: { type: 'switch', group: 'boolean' },
        checkbox: { type: 'checkbox', group: 'boolean' },
        radio: { type: 'radio' },
        radioGroup: { type: 'radioGroup' },
        textArea: { type: 'textarea' },
        autoComplete: { type: 'autocomplete' },
        autoCompleteMultiple: { type: 'autocomplete-multiple', group: 'array' },
        date: { type: 'date', group: 'nullable' },
        time: { type: 'time', group: 'nullable' },
        dateTime: { type: 'datetime', group: 'nullable' },
        image: { type: 'image', group: 'array' },
        dateRange: { type: 'dateRange', group: 'array' },
        label: { type: 'label' },
        counter: { type: 'counter', group: 'nullable' },
        aceEditor: { type: 'aceEditor' },
    },
    statusType: {
        error: 'error',
        info: 'info',
        success: 'success',
        warning: 'warning',
        default: 'info',
    },
    defaultDuration: 6000,
    defaultSnackContent: {
        severity: 'info',
        msg: ''
    },
    documentsURL: `${process.env.REACT_APP_BASE_URL}/documents/`,
    calendarConfig: {
        colors: {
            Selected: indigo[500],
            Executed: red[500],
            Holiday: amber[500],
            Weekend: lightBlue[500]
        },
        type: {
            daily: { id: 0, title: 'Daily' },
            weekly: { id: 1, title: 'Weekly' },
            monthly: { id: 2, title: 'Monthly' },
        }
    }
}
export { appSettings }