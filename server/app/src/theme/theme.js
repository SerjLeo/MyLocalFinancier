import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';

const theme = createMuiTheme({
    status: {
      danger: orange[500],
    },
    typography: {
        h4: {
            fontFamily: 'DM Serif Display'
        }
    },
    palette: {
        primary: {
            main: '#689f38'
        },
        expense: {
            light: "#ffa726",
            main: "#ef6c00",
            dark: "#e65100",
            contrastText: "#fff"
        },
        info: {
            light: "#64b5f6",
            main: "#2196f3",
            dark: "#1976d2",
            contrastText: "#fff"
        },
        type: 'dark'
    },
    commonStyles: {
        pageContainer: {
            backgroundColor: 'rgba(255,255,255,0.1)',
            paddingTop: 100,
            paddingBottom: 10,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            minHeight: 'calc(100vh - 64px)',
        },
        pageWrapper: {
            padding: 30,
            minHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start'
        },
        authFormContainer: {
            paddingTop: '10vh',
            minHeight: '100vh',
        }
    },
    breakpoints: {
        values: {
            xs: 0,
            xsm: 360,
            sm: 620,
            md: 960,
            lg: 1280,
            xl: 1920
        }
    }
});

export default responsiveFontSizes(theme)
