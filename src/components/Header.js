import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import "../App.css";

const Header = (props) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            HOSPITAL
          </Typography>
          <div
            style={{
              display: "flex",
              gap: "20px",
            }}
          >
            <Link className="NavbarCategory" to="/">
              Ana Sayfa
            </Link>
            <Link className="NavbarCategory" to="/hastalar">
              Hastalar
            </Link>
            <Link className="NavbarCategory" to="/randevular">
              Randevular
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
