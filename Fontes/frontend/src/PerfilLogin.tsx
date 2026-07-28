import { DoseCard } from './components/DoseCard';
import { StatCard } from './components/StatCard';
import { Activity, Calendar, Icon } from 'lucide-react';
import { useState } from "react";
import { Drawer } from "./components/Drawer";
import ButtonAppBar from './ButtonAppBar';
import React from 'react';
import MedicationIcon from '@mui/icons-material/Medication';
import { Box, Button, Paper } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


export default function PerfilLogin() {
  const [open, setOpen] = useState(false);

  return (

    <div className="min-h-screen bg-surface w-screen ">

      <div className="menuButtonBar">
        <ButtonAppBar />
      </div>

      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100vh",
          bgcolor: "#cfe8f7", // Fundo azul
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={6}
          sx={{
            position: "absolute",
            top: 24,
            width: 340,
            minHeight: "90%",
            borderRadius: 4,
            p: 3,
            bgcolor: "#fff",
          }}
        >
          {/* Conteúdo */}
          <ul id="perfilOptions">

            <div id="perfilIcon"><AccountCircleIcon fontSize="large" /></div>
            <li><Button style={{ color: "black" }}>Perfil</Button></li>
            <li><Button style={{ color: "black" }}>Lembretes</Button></li>
            <li><Button style={{ color: "black" }}>Agenda</Button></li>
            <li><Button style={{ color: "black" }}>Configurações</Button></li>

          </ul>
        </Paper>
      </Box>

    </div>
  )
}



