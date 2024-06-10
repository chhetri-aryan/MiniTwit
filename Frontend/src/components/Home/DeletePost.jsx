import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAuth } from '../auth/auth';

const DeletePost = (prop) => {

    const {arr,last, setLast } = useAuth();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handlePostDelete = async (e) => {
        e.preventDefault();

        const URL = `http://localhost:5000/api/auth/post/${prop.item._id}`
        setLast(last - 1)

        try {
          const response = await fetch(URL, {
            method: "DELETE",
            headers: {
              'Content-Type': "application/json",
            },
          });
    
          const res_data = await response.json();
    
          if (response.ok) {
                handleClose()
    
          } else {
            alert(res_data.msg);
    
          }
    
        } catch (error) {
          console.log("Post updating error", error)
          
        }
    
      }

  return (
    <React.Fragment>
      <Button  onClick={handleClickOpen}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 stroke-red-500">
  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>

</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are You Sure?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deleting this Post
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePostDelete} autoFocus>Yes</Button>
          <Button onClick={handleClose} >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  
  )
}

export default DeletePost