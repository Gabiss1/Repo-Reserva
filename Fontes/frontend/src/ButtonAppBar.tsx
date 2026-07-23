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
import React from "react";
import Image from "@mui/icons-material/Image";
import MedicationIcon from '@mui/icons-material/Medication';
import { Icon } from "@mui/material";

export default function ButtonAppBar() {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <div className="drawerInBox" style={{background: "black"}}>

      <Drawer 
        open={open}
        onClose={() => setOpen(false)}
      >


        <h2>Medicapp</h2>



        <ul>
          <li><Button style={{color: "black"}}>Inicio</Button></li>
          <li><Button style={{color: "black"}}>Perfil</Button></li>
          <li><Button style={{color: "black"}}>Configurações</Button></li>
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
            <MedicationIcon/>
          </Typography>

          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      
    </Box>
  );
}