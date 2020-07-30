import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import {Paper, Dialog, Switch, DialogTitle, Container, Grid, Button, Typography} from '@material-ui/core';
import {deleteRelatedDeposits, deleteRelatedExpenses, deleteIncome} from '../../../../actions'

function DeleteIncomeDialog({id, onClose, open, deleteRelatedDeposits, deleteIncome, deleteRelatedExpenses}) {
  const [state, setState] = React.useState({
      deleteDeposits: false,
      deleteExpenses: false,
    });
    const handleChange = name => event => {
        setState({ ...state, [name]: event.target.checked });
    };

  return (
    <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
      <Container maxWidth='md' justify='center' align='center' style={{padding: '10px'}}>
          <Grid container>
              <Grid item xs={12}>
                <Typography variant="h4">Delete Income</Typography>
              </Grid>
              <Grid item xs={12}>
                  <Grid container>
                      <Grid item xs ={2}>
                      <Switch
                            checked={state.deleteDeposits}
                            onChange={handleChange('deleteDeposits')}
                            value="deleteDeposits"
                            color="primary"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                      </Grid>
                      <Grid item xs ={10}>
                        <Paper elevation={0}>
                            <Typography variant='h5'>
                                Delete related Deposits
                            </Typography>
                            <Typography variant='h6'>
                                You may not delete related deposits for more accurate analytics
                            </Typography>
                        </Paper>
                      </Grid>
                  </Grid>
              </Grid>
              <Grid item xs={12}>
                  <Grid container>
                      <Grid item xs ={2}>
                      <Switch
                            checked={state.deleteExpenses}
                            onChange={handleChange('deleteExpenses')}
                            value="deleteExpenses"
                            color="primary"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                      </Grid>
                      <Grid item xs ={10}>
                        <Paper elevation={0}>
                            <Typography variant='h5'>
                                Delete related Expenses
                            </Typography>
                            <Typography variant='h6'>
                                You may not delete related deposits for more accurate analytics
                            </Typography>
                        </Paper>
                      </Grid>
                  </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={6} style={{paddingRight: '10px'}}>
                        <Button
                            fullWidth
                            // onClick={() => goBack()}
                            color="secondary"
                        >
                            Delete
                        </Button>
                    </Grid>
                    <Grid item xs={6} style={{paddingLeft: '10px'}}>
                        <Button
                            fullWidth
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                    </Grid>   
                </Grid>
              </Grid>
              
              <Grid item xs={12}></Grid>
          </Grid>
        
        
      </Container>
    </Dialog>
  );
}

// SimpleDialog.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   open: PropTypes.bool.isRequired,
//   selectedValue: PropTypes.string.isRequired,
// };

export default connect(null, {deleteRelatedDeposits, deleteRelatedExpenses, deleteIncome})(DeleteIncomeDialog)