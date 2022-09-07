import { Avatar, Box, Button, Chip, IconButton } from "@mui/material"
import { LoadingButton, Strings } from "@medicorp"
import { blue } from "@mui/material/colors"
import { Place } from "@mui/icons-material"
export default function presentationHistoryByPresentationIdDataColumns(handleDoctorNameClick, handleUserNameClick, handlePresentationClick) {
    const presentationHistoryByPresentationIdColumns = [
        { title: Strings.COLUMN_ID, field: 'historyId' },
        { title: Strings.COLUMN_PRESENTATION_ID, field: 'presentationID' },
        {
            title: Strings.COLUMNS_DOCTORNAME_TILTLE, field: 'doctorName',
            render: rowData => <LoadingButton
                size="small"
                onClick={() => {
                    handleDoctorNameClick(rowData?.doctorID)
                }}
                // loadingIndicator="Loading…"
                variant="outlined"
                key={rowData?.doctorName + rowData?.doctorId}
            >
                {rowData?.doctorName}
            </LoadingButton>
        },
        {
            title: Strings.COLUMNS_USERNAME_TILTLE, field: 'userName',
            render: rowData => <LoadingButton
                size="small"
                onClick={() => {
                    handleUserNameClick(rowData?.userId)
                }}
                // loadingIndicator="Loading…"
                variant="outlined"
                key={rowData?.userName + rowData?.userId}
            >
                {rowData?.userName}
            </LoadingButton>
        },
        {
            title: Strings.COLUMNS_PRESENTATION_TITLE, field: 'presenationTitle',
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
                    <a href={rowData.latitude ? `https://www.google.com/maps/dir/${rowData.latitude},${rowData.longitude}` : "https://www.google.com/maps/dir/21.2140032,72.8858624/psoftcs/@21.213522,72.8828587,17z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x3be04fd6ed4b3383:0x56ba24c17168c1f1!2m2!1d72.8843787!2d21.2132676"} target="_blank" style={{ textDecoration: 'none', color: "#2196f3" }}>
                        <Place />
                    </a>
                </IconButton>
        },
    ]
    return { presentationHistoryByPresentationIdColumns }
}