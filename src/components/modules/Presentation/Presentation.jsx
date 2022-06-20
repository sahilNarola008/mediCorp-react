import MaterialTable from "@material-table/core";
import {
  presentationDataColumns,
  SearchBar,
  Strings,
  usePresentation,
  useStyles,
} from "@medicorp";
import { Card } from "@mui/material";
const Presentation = () => {
  const {
    tableRef,
    actions,
    detailPanel,
    searchOptions,
    AllPresentation,
    presentationData,
    allPresentationLoading
  } = usePresentation();
  const { presentationColumns } = presentationDataColumns();
  const { materialTableStyle: tableStyle } = useStyles();
  return (
    <>
      <Card>
        <SearchBar options={searchOptions} />

        <MaterialTable
          columns={presentationColumns}
          tableRef={tableRef}
          data={presentationData !== undefined ? presentationData : AllPresentation?.data ? AllPresentation?.data : []}
          title={Strings.MENU_PRESENTATIONSS_TITLE}
          actions={actions}
          detailPanel={detailPanel}
          isLoading={allPresentationLoading}
          options={{
            ...tableStyle,
            selection: true,
            filtering: false,
            grouping: false,
            columnsButton: false,
            pageSize: 10,
            pageSizeOptions: [10, 20, 30, 50, 100],
            padding: "dense",

          }}
        />
      </Card>
    </>
  );
};

export default Presentation;
