import { ListItemButton, ListItemText, ListItem } from "@mui/material";

import RemovememberList from "../components/operations/deletemembers";
import * as React from "react";
import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Removemember() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <ListItem>
        <ListItemButton onClick={handleOpen}>
          <ListItemText primary="Remove members" />
        </ListItemButton>
      </ListItem>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <RemovememberList></RemovememberList>
        </Box>
      </Modal>
    </div>
  );
}
