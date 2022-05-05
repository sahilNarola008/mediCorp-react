import { Strings } from "@medicorp"
function specializationDataColumn() {
    const columns = [

        { title: Strings.COLUMN_ID, field: 'id' },
        { title: Strings.COLUMN_DOCTORS_SPECIALIZATION, field: "specialization" },
        { title: Strings.COLUMN_FIELD_DESCRIPTION, field: "description" }

    ]
    return { columns }


}

export default specializationDataColumn