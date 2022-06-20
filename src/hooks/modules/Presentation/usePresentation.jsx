import React, { useRef, useState } from 'react'
import {
    useTableIcons,
    useConfirm,
    PresentationDetailPanel,
    Strings,
    appSettings,
    useAxios,
    format,
} from "@medicorp"

const usePresentation = () => {
    const tableRef = useRef()
    const confirm = useConfirm()
    const { tableIcons } = useTableIcons()
    const { fieldTypes, endpointConfig } = appSettings


    const [presentationData, setPresentationData] = useState()

    const [{ data: AllPresentation, loading: allPresentationLoading }, refetchAllPresentation,] = useAxios(endpointConfig.presentation.getAll);
    const [{ data: searchDoctorsMenuItems, loading: searchDoctorsMenuItemsLoading }, refetchSearchDoctorsMenuItems,] = useAxios(endpointConfig.doctors.getAll);
    const [{ data: searchUserMenuItems, loading: searchUserMenuItemsLoading }, refetchSearchUserMenuItems,] = useAxios(endpointConfig.users.getAll);
    const [{ }, getPresentationByDoctorId] = useAxios(endpointConfig.presentation.getPresentationByDoctorId, { manual: true });
    const [{ }, getPresentationByUserId] = useAxios(endpointConfig.presentation.getPresentationByUserId, { manual: true });
    // const [filterReportLabel, setFilterReportLabel] = useState("")
    const [searchData, setSearchData] = useState({
        sSearchText: [],
        sFromDate: null,
        sToDate: null,
        sCommand: ""
    })

    const [openSearchData, setOpenSearchData] = useState({
        sFromDate: null,
        sToDate: null,
        sType: "",
    });

    // AllPresentation?.data && AllPresentation?.data.map(
    //     async (data) => {
    //         Object.assign(data, { fullName: `${data.firstName} ${data.lastName}` })
    //         return data
    //     })

    // const searchDoctorsMenuItems = [
    //     { val: "Doctor1", text: "Doctor1" },
    //     { val: "Doctor2", text: "Doctor2" },
    //     { val: "Doctor3", text: "Doctor3" },
    //     { val: "Doctor4", text: "Doctor4" },
    //     { val: "Doctor5", text: "Doctor5" },
    // ]
    // const searchUserMenuItems = [
    //     { val: "User1", text: "User1" },
    //     { val: "User2", text: "User2" },
    //     { val: "User3", text: "User3" },
    //     { val: "User4", text: "User4" },
    //     { val: "User5", text: "User5" },
    // ]

    // const actions = [
    //     {
    //         icon: tableIcons.Add,
    //         tooltip: 'Add Job',
    //         isFreeAction: true,
    //         onClick: () => { }
    //     },
    //     {
    //         icon: tableIcons.Edit,
    //         tooltip: 'Edit Jobs',
    //         position: 'row',
    //         onClick: (event, rowData) => { }
    //     },
    //     {
    //         icon: tableIcons.Delete,
    //         tooltip: 'Delete Job',
    //         position: 'row',
    //         onClick: (event, rowData) => new Promise((resolve) => {
    //             confirm({ description: 'Are you sure you want to delete?' })
    //                 .then(() => { })
    //         })
    //     },
    //     rowData => ({
    //         icon: tableIcons.Delete,
    //         tooltip: 'Delete Selected Job(s)',
    //         position: (props) => 'row',
    //         onClick: (event, rowData) => new Promise((resolve) => {
    //             const deleteIds = rowData.map(item => item.id)
    //             confirm({ description: 'Are you sure you want to delete?' })
    //                 .then(() => { })
    //         })
    //     })
    // ]

    const detailPanel = [
        {
            tooltip: 'View details',
            render: ({ rowData }) => <PresentationDetailPanel presentationId={rowData.presentationId} />,
        }
    ]


    const handleSearchChange = () => { }
    const handleOpenSearch = () => { }
    const searchOptions = {
        title: "",
        spacing: 1,
        searchItems: {
            // Daterange: {
            //     label: Strings.SEARCH_TITLE_DATERANGE,
            //     size: "small",
            //     variant: "outlined",
            //     col: 4,
            //     type: fieldTypes.dateRange.type,
            //     minDate: new Date("1900-01-01"),
            //     maxDate: new Date().toLocaleDateString(),
            //     value: [openSearchData["sFromDate"], openSearchData["sToDate"]],
            //     onChange: handleSearchChange,
            // },
            // categories: {
            //     label: Strings.SEARCH_TITLE_CATEGORY,
            //     type: fieldTypes.select.type,
            //     size: "small",
            //     variant: "outlined",
            //     col: 4,
            //     value: "",
            //     menuItems: searchCategoryMenuItems.map(g => ({
            //         text: g.text,
            //         val: g.value
            //     })).sort((a, b) => (a.text ?? "").localeCompare(b.text ?? "")),
            //     onSelectionChange: handleSearchChange
            // },
            // products: {
            //     label: Strings.SEARCH_TITLE_PRODUCTS,
            //     type: fieldTypes.select.type,
            //     size: "small",
            //     variant: "outlined",
            //     col: 4,
            //     value: "",
            //     menuItems: searchProductsMenuItems.map(g => ({
            //         text: g.text,
            //         val: g.value
            //     })).sort((a, b) => (a.text ?? "").localeCompare(b.text ?? "")),
            //     onSelectionChange: handleSearchChange
            // },
            search: {
                label: Strings.SEARCH_TITLE,
                type: fieldTypes.search.type,
                size: "small",
                variant: "outlined",
                col: 4,
                onSelectionChange: handleSearchChange
            },
            doctorList: {
                label: Strings.SEARCH_TITLE_DOCTOR,
                type: fieldTypes.select.type,
                size: "small",
                variant: "outlined",
                col: 4,
                menuItems: searchDoctorsMenuItems?.data ? searchDoctorsMenuItems?.data.map(g => ({
                    text: g.firstName,
                    val: g.doctorId
                })).sort((a, b) => (a.text ?? "").localeCompare(b.text ?? "")) : [],
                onSelectionChange: (e) => {
                    getPresentationByDoctorId({
                        url: format(
                            endpointConfig.presentation.getPresentationByDoctorId,
                            e.target.value)
                    }).then((res) => {
                        setPresentationData(res.data.data)
                    }).catch((err) => {
                        console.log(err)
                    })
                }
            },
            userList: {
                label: Strings.SEARCH_TITLE_USER,
                type: fieldTypes.select.type,
                size: "small",
                variant: "outlined",
                col: 4,
                menuItems: searchUserMenuItems?.data ? searchUserMenuItems?.data.map(g => ({
                    text: g.userName,
                    val: g.id
                })).sort((a, b) => (a.text ?? "").localeCompare(b.text ?? "")) : [],
                onSelectionChange: (e) => {
                    getPresentationByDoctorId({
                        url: format(
                            endpointConfig.presentation.getPresentationByUserId,
                            e.target.value)
                    }).then((res) => {
                        setPresentationData(res.data.data)
                    }).catch((err) => {
                        console.log(err)
                    })
                }
            },

        },
        handleSearch: handleOpenSearch,
    };



    // const CTAButtons = [
    //     {
    //         title: "Clear Filter",
    //         handleClick: () => {
    //             setSearchData({
    //                 sSearchText: [],
    //                 sFromDate: null,
    //                 sToDate: null,
    //                 sCommand: null
    //             })
    //             // refreshInsightsData('All', moment().format('l'))
    //         }
    //     },
    //     {
    //         title: "T-2",
    //         handleClick: () => { }
    //     },

    // ]


    return {
        tableRef,
        detailPanel,
        searchOptions,
        AllPresentation,
        presentationData,
        allPresentationLoading
        // filterReportLabel,
        // CTAButtons

    }
}

export default usePresentation