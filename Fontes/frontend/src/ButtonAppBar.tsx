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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Bold } from "lucide-react";

export default function ButtonAppBar() {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <div className="drawerInBox" style={{ background: "black" }}>

        <Drawer
          open={open}
          onClose={() => setOpen(false)}
        >


          <h2>Medicapp</h2>

          <div><AccountCircleIcon fontSize="large" /></div>
          <text id="nomePerfil">Persona</text>

          <ul>
            <li><Button style={{ color: "black" }}>Meus Medicamentos</Button></li>
            {/* <li><Button style={{ color: "black" }}>Perfil</Button></li> esta parte tem que mudar para quando clicar o icone do perfil entre no proprio dito cujo*/} 
            {/* <li><Button style={{ color: "black" }}>Lembretes</Button></li>
            <li><Button style={{ color: "black" }}>Agenda</Button></li> */}
            <li><Button style={{ color: "black" }}>Farmácias Próximas</Button></li>
            <li><Button style={{ color: "black" }}>Controle de Receituario</Button></li>
            {/* <li><Button style={{ color: "black" }}>Configurações</Button></li> */}
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
            <MedicationIcon /> <text id="titleApp">MedicApp</text>
          </Typography>

          <Button color="inherit" id="buttonLogin">Login</Button>
        </Toolbar>
      </AppBar>


    </Box>
  );
}