import * as React from "react";
import Modal from "@mui/material/Modal";

export default function ModalComponent({children,open,handleClose}){
    <Modal
        // open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {children}
      </Modal>
}