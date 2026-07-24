import { DoseCard } from './components/DoseCard';
import { StatCard } from './components/StatCard';
import { Activity, Calendar, Icon } from 'lucide-react';
import { useState } from "react";
import { Drawer } from "./components/Drawer";
import ButtonAppBar from './ButtonAppBar';
import React from 'react';

export default function PerfilLogin() {
  const [open, setOpen] = useState(false);

  return (

    <div className="min-h-screen bg-surface w-screen ">

      <div className="menuButtonBar">
        <ButtonAppBar/>
      </div>
    </div>
  );
}



