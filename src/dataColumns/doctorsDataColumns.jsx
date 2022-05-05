import { Strings } from "@medicorp"

export default function doctorsDataColumns() {
    const columns = [
        { title: Strings.COLUMN_ID, field: 'id' },
        { title: Strings.COLUMN_DOCTORS_FIRST_NAME, field: 'firstName' },
        { title: Strings.COLUMN_DOCTORS_LAST_NAME, field: 'lastName' },
        { title: Strings.COLUMN_DOCTORS_GENDER, field: 'gender' },
        { title: Strings.COLUMN_DOCTORS_EMAIL, field: 'email' },
        { title: Strings.COLUMN_DOCTORS_PHONE, field: 'phone' },
        { title: Strings.COLUMN_DOCTORS_ADDRESS, field: 'address' },
        { title: Strings.COLUMN_DOCTORS_CITY, field: 'city' },
        { title: Strings.COLUMN_DOCTORS_STATE, field: 'state' },
    ]
    return { columns }


}
