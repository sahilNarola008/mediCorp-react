import { CheckCircle, Autorenew, Error } from "@mui/icons-material"
import { red, teal } from "@mui/material/colors"
import { appSettings, useAxios } from "@medicorp"

const useRequiresAttention = () => {
    const { endpointConfig } = appSettings
    // const [{ data: requireAttention }] = useAxios(endpointConfig.dashboard.getAllRequireAttention)

    const categoryEnum = [
        {
            CategoryIcon: CheckCircle,
            borderColor: teal["A700"],
            title: "Incomplete pipeline(s) need your attention"
        },
        {
            CategoryIcon: Autorenew,
            borderColor: "#9155FD",
            title: "Pipeline(s) schedule required"
        },
        {
            CategoryIcon: Error,
            borderColor: red[400],
            title: "Pipeline(s) failing since last 2 weeks"
        }
    ]

    const items = [
        {
            id: 1,
            categoryId: 0,
            category: "Completed",
            categoryCount: 0,
            route: ""
        },
        {
            id: 2,
            categoryId: 1,
            category: "In Progress",
            categoryCount: 0,
            route: ""
        },
        {
            id: 3,
            categoryId: 2,
            category: "Failed",
            categoryCount: 0,
            route: ""
        }
    ]

    return {
        categoryEnum,
        items
    }
}
export default useRequiresAttention