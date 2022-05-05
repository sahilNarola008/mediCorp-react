import { Avatar, Box, Button, Chip } from "@mui/material"
import { Strings } from "@medicorp"
export default function productsDataColumns(handleRemedialActionStatusClick) {
    const productsColumn = [
        { title: Strings.COLUMN_ID, field: 'id' },
        { title: Strings.COLUMN_NAME, field: 'name' },
        { title: Strings.COLUMN_FIELD_DESCRIPTION, field: 'description' },
        { title: Strings.COLUMN_MRP, field: 'mrp' },
        { title: Strings.COLUMN_PRODUCT_IS_ACTIVE, field: 'isActive', type: 'boolean' },
        {
            title: Strings.COLUMN_UPLOAD_IMAGES, field: 'uploadImage', render: rowData => (
                <Avatar alt={rowData.name} src={rowData.uploadImage} sx={{ width: 56, height: 56 }} />
            )
        },

    ]
    return { productsColumn }
}