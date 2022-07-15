import { Avatar, Box, Button, Chip, IconButton } from "@mui/material"
import { LoadingButton, Strings } from "@medicorp"
import { blue } from "@mui/material/colors"
import { Place } from "@mui/icons-material"
export default function presentationHistoryDataColumns(handleDoctorNameClick, isDoctorLoading, handleUserNameClick, isUserLoading, handlePresentationClick, isPresentationLoading) {
    const presentationHistoryColumns = [
        { title: Strings.COLUMN_ID, field: 'historyId' },
        { title: Strings.COLUMN_PRESENTATION_ID, field: 'presentationId' },
        {
            title: Strings.COLUMNS_DOCTORNAME_TILTLE, field: 'doctorName',
            render: rowData => <LoadingButton
                size="small"
                onClick={() => { handleDoctorNameClick(rowData?.doctorId) }}
                loading={isDoctorLoading}
                // loadingIndicator="Loading…"
                variant="outlined"
            >
                {rowData?.doctorName}
            </LoadingButton>
        },
        {
            title: Strings.COLUMNS_USERNAME_TILTLE, field: 'userName',
            render: rowData => <LoadingButton
                size="small"
                onClick={() => { handleUserNameClick(rowData?.userId) }}
                loading={isUserLoading}
                // loadingIndicator="Loading…"
                variant="outlined"
            >
                {rowData?.userName}
            </LoadingButton>
        },
        {
            title: Strings.COLUMNS_PRESENTATION_TITLE, field: 'presenationTitle',
            render: rowData => <LoadingButton
                size="small"
                onClick={() => { handlePresentationClick(rowData?.presentationId) }}
                loading={isPresentationLoading}
                // loadingIndicator="Loading…"
                variant="outlined"
            >
                {rowData?.presenationTitle}
            </LoadingButton>
        },
        { title: Strings.COLUMN_CITY, field: 'cityName' },
        { title: Strings.COLUMN_STATE, field: 'stateName' },
        { title: Strings.COLUMN_COUNTRY, field: 'countryName' },
        { title: Strings.COLUMN_ORGANIZATION_NAME, field: 'organizationName' },
        { title: Strings.COLUMN_EMAIL, field: 'emailId' },
        { title: Strings.COLUMNS_PRESENTATION_START_DATE, field: 'presentationStartDate' },
        { title: Strings.COLUMNS_PRESENTATION_END_DATE, field: 'presentationEndDate' },
        {
            title: Strings.COLUMN_LOCATION, field: 'latitude',
            render: rowData =>
                <IconButton color="primary" aria-label="location">
                    <Place />
                </IconButton>
        },
    ]
    return { presentationHistoryColumns }
}