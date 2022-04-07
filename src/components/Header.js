import React from "react";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import HistoryIcon from "@mui/icons-material/History";
import { Link } from "react-router-dom";

const headerStyles = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
};

function Header() {
  return (
    <AppBar position="static" color="inherit" data-testid="header">
      <Toolbar sx={headerStyles}>
        <Link to="/about">
          <HelpOutlineIcon fontSize="large" data-testid="help-icon" />
        </Link>
        <Link to="/">
          <Typography data-testid="title" variant="h3" sx={{ flexGrow: 1 }}>
            Nerdle
          </Typography>
        </Link>
        <Link to="/history">
          <HistoryIcon fontSize="large" data-testid="history-icon" />
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
