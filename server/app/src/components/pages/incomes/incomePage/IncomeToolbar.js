import React, {useState} from 'react'
import {IconButton} from '@material-ui/core'
import DeleteDialog from '../../../helpers/DeleteDialog'
import DeleteIcon from '@material-ui/icons/Delete';
import {connect} from "react-redux";
import {deleteIncome, deleteRelatedTransactions, setAlert} from "../../../../actions";

const IncomeToolbar = ({id, deleteIncome, deleteRelatedTransactions, setAlert, redirect}) => {

    const [openDialog, setOpenDialog] = useState(false)
    const [loading, setLoading] = useState(false)

    const openDeleteDialog = () => setOpenDialog(true)
    const handleDialogClose = () => setOpenDialog(false)

    const handleDeleteIncome = async (deleteRelative = false) => {
        setLoading(true)
        try {
            if(deleteRelative) {
                await deleteRelatedTransactions(id)
            }
            await deleteIncome(id)
            redirect()
        } catch (error) {
            setAlert(error.msg, 'error')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <IconButton aria-label="edit" onClick={() => openDeleteDialog()}>
                <DeleteIcon />
            </IconButton>
            <DeleteDialog id={id} type="income" loading={loading} open={openDialog} onClose={handleDialogClose} onDelete={handleDeleteIncome}/>
        </div>
    )
}

export default connect(null, {deleteIncome, deleteRelatedTransactions, setAlert})(IncomeToolbar)
