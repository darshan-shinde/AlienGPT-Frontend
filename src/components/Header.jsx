import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = ({ logo }) => {
  return (
    <AppBar
      position="fixed"
      sx={{ top: 0, backgroundColor: "#313131", width: "100%" }}
    >
      <Toolbar>
        <img src={logo} alt="logo" height={50} width={80} />
        <Typography variant="h4" sx={{ width: "100%", color: "#EC625F", fontFamily: "Rubik storm", marginLeft: "-10px" }}>
          AlienGPT
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
