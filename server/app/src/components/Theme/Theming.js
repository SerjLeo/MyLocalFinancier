import styled from 'styled-components';
import {Link} from 'react-router-dom';
//Material-UI
import Typography from '@material-ui/core/Typography';
// import Container from '@material-ui/core/Container';
// import MenuItem from '@material-ui/core/MenuItem';
import { styled as style } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

export const ProfileField = styled.div`
    margin-bottom: 30px;
    height: 30px;
    width: 100wh;
    pading: 5px;

`
export const PaperRow = styled.div`
    display: flex;
    padding: 5px;
    justify-content: space-between;

`
export const PageContainer = styled.div`
    background-color: rgba(255,255,255,0.6);
    min-height: 92vh;
    display: flex;
    flex-direction: row;
`;

export const MyButton = style(Button)({
    padding: '10px 30px',
    margin: '5px',
    background: 'rgba(255,255,255,0.1)',
    color: 'black'
});

export const CustomLink = style(Link)({
    textDecoration: 'none',
    color: 'black'
});

export const CustomPaper = style(Paper)({
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    width: '100%',
    margin: 'auto',
    padding: '20px',
    fontSize: '20px',
    textAlign: 'center',
    marginBottom: '10px',
    justifyContent: 'space-between'    
})
export const SidePaperLeft = style(Paper)({
    display: 'flex',
    flexDirection: 'column',
    fontSize: '20px',
    width: '100%',
    textAlign: 'center',
    height: '88vh',
    marginBottom: '10px',
    right: '0',
    justifyContent: 'space-between'    
})
export const SidePaperRight = style(Paper)({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    fontSize: '20px',
    textAlign: 'center',
    height: '88vh',
    left: '0',
    marginBottom: '10px',
    justifyContent: 'space-between'    
})
export const CustomTextField = style(TextField)({
    width: "300px"
});
export const CustomTypography = style(Typography)({
    fontFamily: "'DM Serif Text', serif",
    marginLeft: "auto",
    marginRight: "auto",
    paddingBottom: "30px",
    textTransform: "none"
});