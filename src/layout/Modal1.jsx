import { Dialog } from "@mui/material";
import React from "react";

const Modal1 = ({ children, open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      {children}
    </Dialog>
  );
};

export default Modal1;
