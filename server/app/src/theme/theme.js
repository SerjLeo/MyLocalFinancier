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
            backgroundColor: 'rgba(255,255,255,0.6)',
            paddingTop: '10vh',
            minHeight: '100vh',
        },
        pageWrapper: {
            padding: 30,
            minHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start'
        },
        authFormContainer: {
            paddingTop: '10vh',
            minHeight: '100vh',
        }
    }
});

console.log(theme);

export default responsiveFontSizes(theme)