import { Strings } from "@medicorp"
import { Chip } from "@mui/material"

export default function doctorsDataColumns() {
    const columns = [
        { title: Strings.COLUMN_ID, field: 'doctorId' },
        { title: Strings.COLUMN_NAME, field: 'fullName' },
        // { title: Strings.COLUMN_DOCTORS_FIRST_NAME, field: 'firstName' },
        // { title: Strings.COLUMN_DOCTORS_LAST_NAME, field: 'lastName' },
        { title: Strings.COLUMN_DOCTORS_GENDER, field: 'gender' },
        { title: Strings.COLUMN_DOCTORS_EMAIL, field: 'email' },
        { title: Strings.COLUMN_DOCTORS_PHONE, field: 'mobileNumber' },
        {
            title: Strings.COLUMN_SPECIALITY_TITLE,
            field: 'specialityTitle',
            render: rowData => (
                <Chip
                    label={rowData.specialityTitle}
                    color={"info"} />
            )
        },
        { title: Strings.COLUMN_DOCTORS_ADDRESS, field: 'addresses' },
        { title: Strings.COLUMN_DOCTORS_COUNTRY, field: 'countryName' },
        { title: Strings.COLUMN_DOCTORS_STATE, field: 'stateName' },
        { title: Strings.COLUMN_DOCTORS_CITY, field: 'cityName' },
        { title: Strings.COLUMN_DOCTORS_IS_ACTIVE, field: 'isActive', type: 'boolean' },
    ]
    return { columns }


}
