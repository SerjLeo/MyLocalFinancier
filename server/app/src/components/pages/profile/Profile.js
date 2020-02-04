import React, {useEffect} from 'react'
import PropTypes from 'prop-types';
import Spinner from '../../layout/Spinner';
import {connect} from 'react-redux';
import {getCurrentProfile} from '../../../actions';
import {CustomLink} from '../../utils/CustomLink'
//MaterialUi
import {Container, Paper, Typography, Button, makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    pageContainer: theme.commonStyles.pageContainer,
    pageWrapper: theme.commonStyles.pageWrapper
}))

const Profile = ({profile: {profile, loading}, getCurrentProfile}) => {
    useEffect(()=>{
        getCurrentProfile();
    }, [getCurrentProfile]);
    const classes = useStyles();

    if (loading) {
        return  <div className={classes.pageContainer}>
                    <Spinner/>
                </div>
    }

    if (!profile) {
        return <div className={classes.pageContainer}>
                    <Container maxWidth='lg'>
                        <Paper className={classes.pageWrapper}>
                            <Typography variant="h4">No Profile Yet</Typography>
                            <CustomLink to='/createprofile'>
                                <Button variant='outlined' size='medium' color='primary'>
                                    Set Up Profile
                                </Button>
                            </CustomLink>
                        </Paper>
                    </Container>
                </div>
    }
    return <div className={classes.pageContainer}>
                <Container maxWidth="lg">
                    <Paper className={classes.pageWrapper}>
                        <Typography variant="h4">Profile</Typography>
                        <Paper>
                            <i className="fas fa-user"/>{' '}
                            <span style={{marginLeft:"20px"}}>{profile.name}</span>
                        </Paper>
                        <Paper>
                            <i className="fas fa-map-marker-alt"/>{' '}
                            <span style={{marginLeft:"20px"}}>{profile.location}</span>
                        </Paper>
                        <Paper>
                            <i className="fas fa-phone-alt"/>{' '}
                            <span style={{marginLeft:"20px"}}>{profile.phone}</span>
                        </Paper>
                        <Paper>
                        <CustomLink to='/createprofile'>
                                <Button>Profile Settings</Button>
                            </CustomLink>
                        </Paper>
                    </Paper>
                </Container>
            </div>
}

Profile.propTypes = {
    profile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    profile: state.profile
})
export default connect(mapStateToProps, {getCurrentProfile})(Profile);
