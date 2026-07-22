import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect } from "react";
import { useState } from "react";

import { Drawer } from "./components/Drawer";

export default function ButtonAppBar() {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <div className="drawerInBox" style={{background: "black"}}>
      <Drawer 
        open={open}
        onClose={() => setOpen(false)}
      >
        <h2>Menu</h2>

        <ul>
          <li>Home</li>
          <li>Perfil</li>
          <li>Configurações</li>
        </ul>
      </Drawer>
      </div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            News
          </Typography>

          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      
    </Box>
  );
}