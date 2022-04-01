import React from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";

function Header() {
  return (
    <AppBar position="static" color="inherit">
      <Toolbar>
        <Typography variant="h3" sx={{ flexGrow: 1 }}>
          Nerdle
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
