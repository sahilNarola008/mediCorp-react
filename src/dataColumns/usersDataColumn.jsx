import { Strings } from "@medicorp"

function usersDataColumn() {
    const columns = [
        // { title: Strings.COLUMN_ID, field: 'id', editable: 'never' },
        // { title: Strings.COLUMN_USERS_FIRST_NAME, field: 'firstName' },
        { title: Strings.COLUMN_ROLES_PERMISSION, field: 'fullName' },
        // { title: Strings.COLUMN_USERS_LAST_NAME, field: 'lastName' },
        { title: Strings.COLUMN_USERS_GENDER, field: 'gender' },
        { title: Strings.COLUMN_USERS_EMAIL, field: 'email' },
        { title: Strings.COLUMN_USERS_PHONE, field: 'mobileNo' },
        { title: Strings.COLUMN_USERS_IS_ACTIVE, field: 'isActive', type: 'boolean' },
    ]
    return { columns }


}

export default usersDataColumn

