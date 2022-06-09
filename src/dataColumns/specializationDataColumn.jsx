import { Strings } from "@medicorp"
function specializationDataColumn() {
    const columns = [

        { title: Strings.COLUMN_ID, field: 'specialityId', editable: 'never' },
        { title: Strings.COLUMN_DOCTORS_SPECIALIZATION, field: "title" },
        { title: Strings.COLUMN_FIELD_DESCRIPTION, field: "specialalityDescription" },
        { title: Strings.COLUMN_CATREGORY_IS_ACTIVE, field: 'isActive', type: 'boolean' },


    ]
    return { columns }


}

export default specializationDataColumn