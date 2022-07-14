import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {DotsVertical} from 'tabler-icons-react'
import AlertleaveDialog from '../confirmoperations/confirmleavechannel';
import AlertDeleteDialog from '../confirmoperations/confirmdeletedialog';
import {  useChannelStateContext, useChatContext } from 'stream-chat-react';
import { act } from 'react-dom/test-utils';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
import Addmember from '../../modal/addmember';
import Addmod from '../../modal/addmod';
import Delmod from '../../modal/delmod';
import Removemember from '../../modal/removemember';
// import Divider from '@mui/material/Divider';

export default function SwipeablemodDrawer() {

  const { client } = useChatContext();
  const { channel: activeChannel} = useChatContext();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });





   
   
   const handlemute=()=>{
    const result=activeChannel.mute();
    console.log(result);
    console.log(activeChannel)
   }
   
   
      































  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['1'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <li>
            <Addmember></Addmember>
            <Divider></Divider>
            {/* <Addmod></Addmod> */}
            <Divider></Divider>
<Removemember></Removemember>
            </li>
          </ListItem>
            // <Demo></Demo>
        ))}
      </List>
        {/* <AlertDialog> </AlertDialog> */}
    {/* <Demo></Demo> */}
      <Divider />
      <List>
        {['1'].map((text, index) => (
          <ListItem key={text} disablePadding>
           <li>
            <AlertleaveDialog></AlertleaveDialog>
            <Divider></Divider>
             <AlertDeleteDialog></AlertDeleteDialog>
             <Divider></Divider>

             <ListItem>
         <ListItemButton onClick={handlemute}>
       
              <ListItemText primary='Mute channel' />
            </ListItemButton>
            </ListItem>
           </li>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer('left', true)}><DotsVertical color={'black'}></DotsVertical></Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
              {/* <Demo></Demo> */}
            {/* <AlertDialog></AlertDialog> */}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
