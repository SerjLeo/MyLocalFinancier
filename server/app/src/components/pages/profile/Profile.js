import React, {useEffect} from 'react'
import PropTypes from 'prop-types';
import Spinner from '../../layout/Spinner';
import {connect} from 'react-redux';
import {getProfile} from '../../../actions';
import PersonIcon from '@material-ui/icons/Person';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import PageLayout from '../../layout/PageLayout'
import LanguageIcon from '@material-ui/icons/Language';
import SettingsIcon from '@material-ui/icons/Settings';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import CustomLink from '../../helpers/CustomLink'
//MaterialUi
import {Grid, IconButton, Paper, Typography, Button, makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    pageWrapper: theme.commonStyles.pageWrapper,
    fixedBtn: {
        position: 'absolute',
        top: 20,
        right: 20
    }
}))

const Profile = ({profile: {profile, loading}, getProfile}) => {
    useEffect(()=>{
        getProfile();
    }, []);
    const classes = useStyles();

    if (loading) {
        return  <PageLayout containerSize={'md'}>
                    <Spinner/>
                </PageLayout>
    }

    if (!profile) {
        return <PageLayout containerSize={'md'}>
                    <Typography variant="h4">No Profile Yet</Typography>
                    <CustomLink to='/createprofile'>
                        <Button variant='outlined' size='medium' color='primary'>
                            Set Up Profile
                        </Button>
                    </CustomLink>
                </PageLayout>
    }
    
    return <PageLayout containerSize={'md'}>
                <CustomLink to='/createprofile' className={classes.fixedBtn}>
                    <IconButton>
                        <SettingsIcon/>
                    </IconButton>
                </CustomLink>
                <Grid container direction="column" alignContent="center" justify="center" spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h4">Profile</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={4}>
                            <Grid item xs={4}><PersonIcon/></Grid>
                            <Grid item xs={8}><Typography>{profile.name}</Typography></Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={4}>
                            <Grid item xs={4}><LocationOnIcon/></Grid>
                            <Grid item xs={8}><Typography>{profile.location}</Typography></Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={4}>
                            <Grid item xs={4}><PhoneIcon/></Grid>
                            <Grid item xs={8}><Typography>{profile.phone}</Typography></Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={4}>
                            <Grid item xs={4}><LanguageIcon/></Grid>
                            <Grid item xs={8}><Typography>{profile.language}</Typography></Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={4}>
                            <Grid item xs={4}><AttachMoneyIcon/></Grid>
                            <Grid item xs={8}><Typography>{profile.mainCurrency}</Typography></Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </PageLayout>
}

Profile.propTypes = {
    profile: PropTypes.object.isRequired,
    getProfile: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    profile: state.profile
})
export default connect(mapStateToProps, {getProfile})(Profile);
