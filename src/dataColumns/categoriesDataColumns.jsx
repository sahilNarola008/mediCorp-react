import { Strings } from "@medicorp"

export default function categoriesDataColumns() {
    const columns = [
        { title: Strings.COLUMN_ID, field: 'id' },
        { title: Strings.MENU_CATEGORIESS_TITLE, field: 'categoryName' },

    ]
    return { columns }
}
