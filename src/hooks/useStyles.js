import { useTheme } from '@mui/material'
import { red, grey } from '@mui/material/colors'
// eslint-disable-next-line no-extend-native
Object.defineProperty(String.prototype, "as", {
    value: function as(metric) {
        return `${this.replace('px', metric)}`;
    },
    writable: true,
    configurable: true
})
const drawerWidth = 240
const useStyles = () => {
    const theme = useTheme()
    return {
        loginWrap: {
            backgroundImage: 'url("../img/bg-login2.png")',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            height: theme.spacing(12.5).as('vh'),
            width: theme.spacing(12.5).as('%'),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        loginBox: {
            backgroundColor: '#fff',
            width: `${theme.spacing(3.875).as('vw')}`,
            m: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            boxShadow: `#333 ${theme.spacing(0, 0, 1.25)}`
        },
        loginHead: {
            '& h2': {
                fontSize: theme.spacing(3.25),
                fontWeight: 300,
                color: '#1f3038',
                m: `0 0 ${theme.spacing(1.25)} 0`
            },
            '& p': {
                fontWeight: 300,
                color: '#1f3038',
                '& strong': {
                    color: theme.palette.primary.main
                }
            },
            '& img': {
                maxWidth: theme.spacing(56.25)
            }
        },
        loginBtn: {
            width: theme.spacing(30.625),
            height: theme.spacing(5.625),
            fontSize: `${theme.spacing(2.125)} !important`,
            textTransform: 'none !important',
            boxShadow: `#0bb20254 ${theme.spacing(0, 0, 1.25)} !important`
        },
        loginCard: {
            border: 0,
            backgroundColor: 'transparent !important',
            boxShadow: `#e1dddd ${theme.spacing(0, 0, 1.25)} !important`
        },
        root: {
            display: 'flex',
        },
        mainRoot: {
            width: `calc(${theme.spacing(12.5).as('%')} - ${drawerWidth}px)`,
        },
        content: {
            flexGrow: 1,
            p: theme.spacing(0, 3),
            transition: theme.transitions.create('m', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            height: `${theme.spacing(12.5).as('vh')} !important`,
            overflowX: 'hidden'
        },
        contentShift: {
            flexGrow: 1,
            p: theme.spacing(0, 3),
            transition: theme.transitions.create('m', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            ml: theme.spacing(-21.5),//-drawerWidth + theme.spacing(8.5),
            height: `${theme.spacing(12.5).as('vh')} s!important`,
        },
        appBar: {
            zIndex: { sm: theme.zIndex.drawer + 1 },
        },
        title: {
            flexGrow: 1,
            '& img': {
                verticalAlign: 'middle !important'
            }
        },
        dummyToolBar: {
            mb: theme.spacing(0)
        },
        drawerOpen: {
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                transition: `${theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                })} !important`,
                backgroundColor: `${theme.palette.background.paper} !important`,
                boxShadow: `${theme.shadows[4]} !important`,
            },
            '& $menuList': {
                pl: theme.spacing(3)
            },
            '& ul': {
                pr: theme.spacing(3)
            }
        },
        drawerClose: {
            '& .MuiDrawer-paper': {
                transition: `${theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                })} !important`,
                overflowX: 'hidden',
                width: parseInt(theme.spacing(8.5).as('')),
                backgroundColor: `${theme.palette.background.paper} !important`,
                boxShadow: `${theme.shadows[4]} !important`,
            },
            '& $menuList': {
                pl: theme.spacing(1.5)
            },
            '& ul': {
                pr: theme.spacing(0)
            }
        },
        drawer: {
            backgroundColor: `${theme.palette.background.paper} !important`,
            width: { sm: drawerWidth },
            flexShrink: { sm: 0 }
        },
        drawerPaper: {
            '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                backgroundColor: theme.palette.background.default,
                boxShadow: theme.shadows[4]
            },
            '& ul': {
                pr: theme.spacing(3)
            }
        },
        paddedMenuMobile: {
            p: theme.spacing(1.5),
            '& img': {
                verticalAlign: 'middle !important'
            }
        },
        drawerContainer: {
            overflowY: 'auto',
            overflowX: 'hidden'
        },
        drawerMinWidth: {
            width: theme.spacing(30),//drawerWidth,
        },
        menuList: {
            borderRadius: `${theme.spacing(6.25)} !important`,
            "&:hover": {
                backgroundColor: `${theme.palette.primary.light} !important`,
                color: `${theme.palette.primary.contrastText} !important`,
                "& svg": {
                    color: `${theme.palette.primary.contrastText} !important`
                },
                "& $smallFont": {
                    fontWeight: `${600} !important`
                }
            }
        },
        menuLink: {
            textDecoration: 'none',
            color: 'inherit'
        },
        smallFont: {
            fontSize: `${theme.spacing(0.10625).as('rem')} !important`
        },
        smUp: { display: { sm: 'none', xs: 'block' } },
        smDown: { display: { xs: 'none', sm: 'block' } },
        materialTableStyle: {
            actionsColumnIndex: -1,
            addRowPosition: "first",
            search: true,
            filtering: true,
            selection: true,
            grouping: true,
            columnsButton: true,
            pageSize: 5,
            pageSizeOptions: [5, 10, 20],
            padding: "normal",
            headerStyle: {
                backgroundColor: theme.palette.secondary.light,
                pt: 12,
                pb: 12
            }
        },
        materialTableNoActionStyle: {
            search: true,
            filtering: false,
            selection: false,
            grouping: false,
            columnsButton: false,
            showTitle: false,
            draggable: false,
            searchFieldAlignment: 'left',
            columns: {
                align: 'center'
            },
            toolbar: false,
            sorting: false
        },
        navTab: {
            width: `${theme.spacing(12.5).as('%')}`
        },
        navTabContextBox: {
            borderBottom: 1,
            borderColor: 'divider'
        },
        ModalTitle: {
            backgroundColor: `${theme.palette.primary.main} !important`,
            color: `${theme.palette.primary.contrastText} !important`
        },
        invalid: {
            color: red[500],
        },
        no_p: {
            p: theme.spacing(0)
        },
        chCard: {
            p: `${theme.spacing(2.5)} !important`
        },
        contentBox: {
            p: `${theme.spacing(8.75)}`,
            '& h2': {
                fontSize: `${theme.spacing(2.5)}`,
                fontWeight: `${theme.spacing(87.5).as('')}`,
                lineHeight: `${theme.spacing(4.12)}`,
            },
            '& p': {
                textAlign: 'justify'
            }

        },
        subTitle: {
            color: '#757575',
        },
        helpGreenColor: {
            color: theme.palette.primary.main
        },
        transparentButton: {
            display: 'inline'
        },
        hidden: { display: 'none !important' },
        shown: { display: 'block !important' },
        shownFlex: { display: 'inline-flex !important' },
        stepContainer: {
            mt: theme.spacing(2.5),
            '& button': {
                p: theme.spacing(0),
                m: theme.spacing(0)
            }
        },
        adornmentLabel: {
            bgcolor: grey['A400'],
            p: theme.spacing(1.75),
            ml: theme.spacing(-1.25)
        },
        searchContentRoot: {
            flexGrow: 1,
            mb: theme.spacing(2),
            mt: theme.spacing(2),
            p: theme.spacing(3),
        },
        mb2: {
            mb: theme.spacing(2)
        },
        primaryBgTheme: {
            backgroundColor: `${theme.palette.primary.main} !important`,
            color: `${theme.palette.primary.contrastText} !important`,
            '& button': {
                color: `${theme.palette.primary.contrastText} !important`
            }
        },
        searchField: {
            '& .MuiFilledInput-root': {
                borderRadius: 0,
                backgroundColor: 'rgba(255,165,0,0.23) !important;',
                '&:after': {
                    borderBottom: '0 !important;'
                }
            },
            '& .MuiInputLabel-root.Mui-focused': {
                color: 'rgba(0, 0, 0, 0.87) !important;'
            }
        },
        summarySystemOverviewPrimary: {
            fontSize: 60,
            color: "#3dbd36"
        },
    }
}
export default useStyles