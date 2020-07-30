import React, {useState} from 'react'
import {IconButton} from '@material-ui/core'
import DeleteIncomeDialog from '../incomeHelpers/DeleteDialog'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const IncomeToolbar = ({id}) => {
    const [openDialog, setOpenDialog] = useState(false)

    const openDeleteDialog = () => setOpenDialog(true)
    const handleDialogClose = () => setOpenDialog(false)
    
    return (
        <div>
            <IconButton aria-label="delete" >
                <EditIcon />
            </IconButton>
            <IconButton aria-label="edit" onClick={() => openDeleteDialog()}>
                <DeleteIcon />
            </IconButton>
            <DeleteIncomeDialog id={id} open={openDialog} onClose={handleDialogClose}/>
        </div>
    )
}

export default IncomeToolbar