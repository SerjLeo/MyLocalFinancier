import React, {useState} from 'react'
import {IconButton} from '@material-ui/core'
import DeleteDialog from '../../helpers/DeleteDialog'
import DeleteIcon from '@material-ui/icons/Delete';
import {connect} from "react-redux";
import {deleteCategory, setAlert} from "../../../actions";

const CategoryToolbar = ({id, redirect, deleteCategory, setAlert}) => {

    const [openDialog, setOpenDialog] = useState(false)
    const [loading, setLoading] = useState(false)

    const openDeleteDialog = () => setOpenDialog(true)
    const handleDialogClose = () => setOpenDialog(false)

    const handleDeleteCategory = async () => {
        setLoading(true)
        try {
            await deleteCategory(id)
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
            <DeleteDialog id={id} type="category" loading={loading} open={openDialog} onClose={handleDialogClose} onDelete={handleDeleteCategory}/>
        </div>
    )
}

export default connect(null, {deleteCategory, setAlert})(CategoryToolbar)
