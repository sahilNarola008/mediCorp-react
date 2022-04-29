import {
    Dashboard,
    Category,
    Group,
    Inventory,
    Slideshow
} from "@mui/icons-material"
import { Strings, appSettings, uuidv4, moment, PropTypes } from "@medicorp"

export const getDefaultValueArray = (options, data) => {
    if (!Array.isArray(data)) return []
    if (data.length === 0) return []
    return data.map(id => options.find(item => item.id === id))
}

export const validator = {
    emailValidator: {
        required: { value: true, message: "Email is required" },
        pattern: { value: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/i, message: "Email is invalid" }
    },
    requiredValidator: (title) => ({
        required: { value: true, message: `${title} is required!` }
    }),
    timeValidator: {
        required: { value: true, message: "Time is required" },
        pattern: { value: /^([01]\d|2[0-3]):?([0-5]\d)$/g, message: "Time is invalid" }
    },
    hourValidator: {
        required: { value: true, message: "Time is required" },
        pattern: { value: /^([0]{0,1}[1-9]{1}|[1]\d|[2][0-3])$/g, message: "Interval is invalid. Must be a whole number between 1 to 23" }
    }
}

export const useMenus = () => {
    const { dashboard, categories, presentation, products, users } = appSettings.routeConfig
    const {
        MENU_DASHBOARD_TITLE,
        MENU_PRODUCTS_TITLE,
        MENU_CATEGORIESS_TITLE,
        MENU_USERS_TITLE,
        MENU_PRESENTATIONSS_TITLE
    } = Strings

    const menuItems = [
        {
            id: "dashboard",
            labelText: MENU_DASHBOARD_TITLE,
            isVisible: true,
            icon: Dashboard,
            navigate: dashboard.baseURL
        },
        {
            id: "products",
            labelText: MENU_PRODUCTS_TITLE,
            isVisible: true,
            icon: Inventory,
            navigate: products.baseURL
        },
        {
            id: "categories",
            labelText: MENU_CATEGORIESS_TITLE,
            isVisible: true,
            icon: Category,
            navigate: categories.baseURL
        },
        {
            id: "users",
            labelText: MENU_USERS_TITLE,
            isVisible: true,
            icon: Group,
            navigate: users.baseURL
        },
        {
            id: "presentations",
            labelText: MENU_PRESENTATIONSS_TITLE,
            isVisible: true,
            icon: Slideshow,
            navigate: presentation.baseURL
        },

    ]
    return menuItems
}

export const groupBy = (xs, key) => {
    return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x)
        return rv
    }, {})
}

// a little function to help us with reordering the result
export const reorderWidget = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
}
/**
 * Moves an item from one list to another list.
 */
export const copyWidget = (jobID, source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source)
    const destClone = Array.from(destination)
    const item = sourceClone[droppableSource.index]
    if (item.category === 'single' && destClone.some(widget => widget.title === item.title)) return destClone
    destClone.splice(droppableDestination.index, 0, { ...item, id: uuidv4(), fileProcessingTemplateId: Number(jobID) })
    return destClone
}

export const weekDays = [
    {
        text: "Select Weekday", val: 0,
    },
    {
        text: "Monday", val: 1,
    },
    {
        text: "Tuesday", val: 2,
    },
    {
        text: "Wednesday", val: 3,
    },

    {
        text: "Thursday", val: 4,
    },
    {
        text: "Friday", val: 5,
    },
    {
        text: "Saturday", val: 6,
    },
    {
        text: "Sunday", val: 7,
    }
]

export const getActualDates = (dates) => {
    return dates?.map((item) => ({
        startDate: moment(item.startDate).unix(),
        endDate: moment(item.endDate).unix()
    })) ?? []
}
export const getRefactoredDates = (dates, color) => {
    return dates?.map((item) => ({
        startDate: moment.unix(item.startDate).toDate(),
        endDate: moment.unix(item.endDate).toDate(),
        color: color
    })) ?? []
}

/**
 * 
 * @param {Number} startDate 
 * @param {Number} endDate 
 * @param {'['|']'} granularity 
 * @returns 
 */
export const enumerateDaysBetweenDates = (startDate, endDate, granularity = '') => {
    let dates = []

    let currDate = moment(startDate)
    let lastDate = moment(endDate)
    if (currDate > lastDate) {
        let temp = lastDate
        lastDate = currDate
        currDate = temp
    }

    (!currDate.isSame(lastDate, 'day')) && granularity === '[' && dates.push(currDate.clone().toDate())

    while (currDate.add(1, 'days').diff(lastDate) < 0) {
        dates.push(currDate.clone().toDate())
    }
    (currDate.isSame(lastDate, 'day')) && granularity === ']' && dates.push(currDate.clone().toDate())
    if (dates.length <= 0) return []
    return [{
        startDate: moment(dates[0]).unix(),
        endDate: moment(dates[dates.length - 1]).unix()
    }]
}