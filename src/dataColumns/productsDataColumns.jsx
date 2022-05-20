import { Avatar, Box, Button, Chip } from "@mui/material"
import { Strings } from "@medicorp"
export default function productsDataColumns() {
    const productsColumn = [
        { title: Strings.COLUMN_ID, field: 'productId' },
        { title: Strings.COLUMN_ID, field: 'categoryId' },
        { title: Strings.COLUMN_NAME, field: 'productName' },
        { title: Strings.COLUMN_FIELD_DESCRIPTION, field: 'productDescription' },
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