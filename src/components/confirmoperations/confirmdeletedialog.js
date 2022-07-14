import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import UserList from '../operations/channelusermoderatorupdate';
import {  useChannelStateContext, useChatContext } from 'stream-chat-react';
import { ListItemButton,ListItemText ,ListItem} from '@mui/material';

export default function AlertDeleteDialog() {
  const [open, setOpen] = React.useState(false);

  const { client } = useChatContext();
  const { channel: activeChannel} = useChatContext();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async() => {

    const cid1=activeChannel.cid;

    const response = await client.deleteChannels([cid1], {hard_delete: true});
    const result = response.result // holds deletion result

    setOpen(false);
    window.location.reload()
  };


  const handleClose2 = async() => {

  

    setOpen(false);
    window.location.reload()
  };


  return (
    <div>
     <ListItem>
         <ListItemButton onClick={handleClickOpen}>
       
              <ListItemText primary='Delete Channel' />
            </ListItemButton>
            </ListItem>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
       {/* <UserList> </UserList> */}


       <DialogTitle id="alert-dialog-title">
          {"Are you sure to delete the channel"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You cannot retrive any data about the channel after deletion 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose2} autoFocus>Disagree</Button>
          <Button onClick={handleClose} >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
