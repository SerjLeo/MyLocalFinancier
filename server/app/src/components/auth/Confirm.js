import React, {useState, useEffect} from 'react';
import {confirmEmail} from '../../actions'
import {connect} from 'react-redux'
import {compose} from 'redux'
import Spinner from '../layout/Spinner'
import PageLayout from '../layout/PageLayout'
import { CustomLink } from '../utils/CustomLink';
import { Button, Typography } from '@material-ui/core';
import WithTranslation from '../translation/withTranslationHOC'

const Confirm = props => {
    const [loading, setLoading] = useState(true)
    
    useEffect(()=>{
        const id = props.match.params.userID
        props.confirmEmail(id)
            .then(() => setLoading(false))
    },[])

    if(loading) {
       return   <PageLayout>
                    <Spinner/>
                </PageLayout>
    }

    return <PageLayout>
                <Typography variant='h4' gutterBottom>
                    {props.strings.titleText}
                </Typography>
                <CustomLink to='/login'>
                    <Button>
                        {props.strings.buttonText}
                    </Button>
                </CustomLink>
            </PageLayout>
}

export default compose(
    connect(null, {confirmEmail}),
    WithTranslation)(Confirm)
