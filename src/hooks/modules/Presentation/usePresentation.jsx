import React, { useContext, useEffect, useRef, useState } from "react"
import {
    useTableIcons,
    useConfirm,
    PresentationDetailPanel,
    Strings,
    appSettings,
    useAxios,
    format,
    Context,
} from "@medicorp"
import * as XLSX from "xlsx"

const usePresentation = () => {
    const tableRef = useRef()
    const confirm = useConfirm()
    const { setIsLoading, logMessage } = useContext(Context)
    const { tableIcons } = useTableIcons()
    const { fieldTypes, endpointConfig, statusType } = appSettings

    const [presentationData, setPresentationData] = useState()
    const [filterReportLabel, setFilterReportLabel] = useState(["All"])
    const [filters, setFilters] = useState([])

    const [searchOptions, setSearchOptions] = useState({})
    const [searchData, setSearchData] = useState({
        sSearchText: null,
        sDoctor: null,
        sUser: null,
    })
    const [
        { data: AllProducts, loading: allProductsLoading },
        refetchAllProducts,
    ] = useAxios(endpointConfig.products.getAll);
    const [
        { data: AllPresentation, loading: allPresentationLoading },
        refetchAllPresentation,
    ] = useAxios(endpointConfig.presentation.getAll)
    const [
        { data: searchDoctorsMenuItems, loading: searchDoctorsMenuItemsLoading },
        refetchSearchDoctorsMenuItems,
    ] = useAxios(endpointConfig.doctors.getAll)
    const [
        { data: searchUserMenuItems, loading: searchUserMenuItemsLoading },
        refetchSearchUserMenuItems,
    ] = useAxios(endpointConfig.users.getAll)
    const [{ }, getPresentationByDoctorId] = useAxios(
        endpointConfig.presentation.getPresentationByDoctorId,
        { manual: true }
    )
    const [{ }, getPresentationByUserId] = useAxios(
        endpointConfig.presentation.getPresentationByUserId,
        { manual: true }
    )

    const [{ }, presentationProduct,] = useAxios(endpointConfig.presentation.getPresentationProductByPresentationId, { manual: true });

    const downloadToExcel = () => {

        setIsLoading(true)
        try {
            const excelExportData = AllPresentation?.data.map((presentationData) => {
                return ({
                    presentationId: presentationData.presentationId,
                    doctorName: presentationData.doctorName,
                    userName: presentationData.userName,
                    // presentationProduct: presentationData.products
                })
            })
            const workSheet = XLSX.utils.json_to_sheet(excelExportData)
            const workBook = XLSX.utils.book_new()
            XLSX.utils.book_append_sheet(workBook, workSheet, "Presentation")
            let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" })
            XLSX.write(workBook, { bookType: "xlsx", type: "binary" })
            XLSX.writeFile(workBook, "Presentation.xlsx")
            setTimeout(() => {
                setIsLoading(false)
            }, 1000);
        } catch (error) {
            setTimeout(() => {
                setIsLoading(false)
            }, 1000);
            console.log(error)
            logMessage({
                severity: statusType.error,
                msg: "Error Downloading File!"
            })
        }
    }

    const actions = [
        {
            icon: tableIcons.FileDownload,
            tooltip: "Export to Excel",
            isFreeAction: true,
            onClick: () => downloadToExcel(),
        },
    ];


    const detailPanel = [
        {
            tooltip: "View details",
            render: ({ rowData }) => (
                <PresentationDetailPanel presentationId={rowData.presentationId} />
            ),
        },
    ]

    const handleSelectionChange = (data, sFieldName) => {
        switch (sFieldName) {
            case "sSearchText":
                setSearchData(prev => ({ ...prev, sSearchText: { value: data?.target?.value, name: data?.target?.value } }))
                // searchData["sSearchText"] = [...searchData["sSearchText"], { value: data?.target?.value, name: data?.target?.value }]
                // if (searchData["sSearchText"].length > 0) {
                //     searchData["sSearchText"] = [...searchData["sSearchText"], { value: data?.target?.value, name: data?.target?.value }]
                // } else {
                //     // setSearchData(prev => ({ ...prev, sSearchText: { value: data?.target?.value, name: data?.target?.value } }))
                //     searchData["sSearchText"] = [{ value: data?.target?.value, name: data?.target?.value }]
                // }
                break;
            case "sDoctor":
                setSearchData(prev => ({ ...prev, sDoctor: { value: data?.value, name: data?.children } }))
                // searchData["sDoctor"] = { value: data?.value, name: data?.children }
                break;
            case "sUser":
                setSearchData(prev => ({ ...prev, sUser: { value: data?.value, name: data?.children } }))
                // searchData["sUser"] = { value: data?.value, name: data?.children }
                break;

            default:
                break;
        }

    }

    useEffect(() => {
        setSearchOptionsData()
    }, [searchDoctorsMenuItems, searchUserMenuItems])


    const setSearchOptionsData = () => {
        setSearchOptions({
            title: "",
            spacing: 1,
            searchItems: {
                search: {
                    label: Strings.SEARCH_TITLE,
                    type: fieldTypes.search.type,
                    size: "small",
                    variant: "outlined",
                    col: 4,
                    value: "",
                    handleSearchChange: (e) => {
                        handleSelectionChange(e, "sSearchText")
                    },
                },
                doctorList: {
                    label: Strings.SEARCH_TITLE_DOCTOR,
                    type: fieldTypes.select.type,
                    size: "small",
                    variant: "outlined",
                    col: 4,
                    value: "",
                    menuItems: searchDoctorsMenuItems?.data
                        ? searchDoctorsMenuItems?.data
                            .map((g) => ({
                                text: `${g.firstName} ${g.lastName}`,
                                val: g.doctorId,
                            }))
                            .sort((a, b) => (a.text ?? "").localeCompare(b.text ?? ""))
                        : [],
                    onSelectionChange: (e, data) => {
                        handleSelectionChange(data, "sDoctor")
                    },
                },
                userList: {
                    label: Strings.SEARCH_TITLE_USER,
                    type: fieldTypes.select.type,
                    size: "small",
                    variant: "outlined",
                    col: 4,
                    value: "",
                    menuItems: searchUserMenuItems?.data
                        ? searchUserMenuItems?.data
                            .map((g) => ({
                                text: `${g.firstName} ${g.lastName}`,
                                val: g.id,
                            }))
                            .sort((a, b) => (a.text ?? "").localeCompare(b.text ?? ""))
                        : [],
                    onSelectionChange: (e, data) => {
                        handleSelectionChange(data, "sUser")
                    },
                },
            },
        })
    }

    const handleSearch = () => {
        console.log(searchData);
        setPresentationData([])
        setFilterReportLabel([])
        let presentationFilteredData;

        new Promise(async (resolve, reject) => {
            if (searchData["sSearchText"] !== null) {
                presentationFilteredData = await AllPresentation?.data && AllPresentation?.data.filter((val) => {
                    if (val.doctorName.toLowerCase().match(searchData["sSearchText"].value.toLowerCase())) {
                        return val
                    }
                    if (val.userName.toLowerCase().match(searchData["sSearchText"].value.toLowerCase())) {
                        return val
                    }
                    if (val.presentationId == searchData["sSearchText"].value) {
                        return val
                    }

                })
            }
            if (searchData["sDoctor"] !== null) {
                if (presentationFilteredData) {
                    presentationFilteredData = await presentationFilteredData && presentationFilteredData.filter((val) => {
                        if (searchData["sDoctor"]?.value === val?.doctorId) {
                            return val
                        }
                    })
                } else {
                    await getPresentationByDoctorId({
                        url: format(
                            endpointConfig.presentation.getPresentationByDoctorId,
                            searchData["sDoctor"]?.value
                        ),
                    }).then((res) => {
                        res.data.data && setPresentationData(prev => [...prev, ...res.data.data])
                        presentationFilteredData = res.data.data
                    }).catch((err) => {
                        console.log(err)
                    })
                }

            }

            if (searchData["sUser"] !== null) {
                if (presentationFilteredData) {
                    presentationFilteredData = await presentationFilteredData && presentationFilteredData.filter((val) => {
                        if (searchData["sUser"]?.value === val?.userId) {
                            return val
                        }
                    })
                } else {
                    await getPresentationByUserId({
                        url: format(
                            endpointConfig.presentation.getPresentationByUserId,
                            searchData["sUser"]?.value
                        ),
                    }).then((res) => {
                        res.data.data && setPresentationData(prev => [...prev, ...res.data.data])
                        presentationFilteredData = res.data.data
                    }).catch((err) => {
                        console.log(err)
                    })
                }
            }
            resolve(presentationFilteredData)
        }).then((res) => {
            setPresentationData(res)
            if (searchData["sDoctor"] !== null || searchData["sUser"] !== null || searchData["sSearchText"] !== null) {
                Object.values(searchData).map((val) => {
                    if (val?.name && val?.name !== undefined) {
                        setFilterReportLabel((prev) => [...prev, val.name])
                    }
                })
            } else {
                setFilterReportLabel(["All"])
            }

        }).catch((err) => {
            console.log(err);
        })




    }


    const CTAButtons = [
        {
            title: <tableIcons.Search />,
            handleClick: handleSearch,
            id: 1,
        }
    ]

    const clearCTAButton = {
        title: Strings.CLEAR_FILTER,
        handleClick: () => {
            setFilterReportLabel(["All"])
            setSearchData({
                sSearchText: null,
                sDoctor: null,
                sUser: null,
            })

            setSearchOptionsData()
            setPresentationData()

        }
    }

    return {
        tableRef,
        detailPanel,
        searchOptions,
        AllPresentation,
        presentationData,
        allPresentationLoading,
        clearCTAButton,
        filterReportLabel,
        CTAButtons,
        actions
    }
}

export default usePresentation
