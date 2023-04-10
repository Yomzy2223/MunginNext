import { Drawer } from "@mui/material";
import React from "react";

const MobileSidebarCont = ({ children, open, setOpen, anchor }) => {
  return (
    <Drawer
      anchor={anchor || "left"}
      open={open}
      onClose={() => setOpen(false)}
    >
      {children}
    </Drawer>
  );
};

export default MobileSidebarCont;
