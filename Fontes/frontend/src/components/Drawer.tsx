import React from "react";
import "./drawer.css";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Drawer({ open, onClose, children }: DrawerProps) {
  return (
    <>
      {open && <div className="overlay" onClick={onClose} />}

      <aside className={`drawer ${open ? "open" : ""}`}>
        <button className="close-button" onClick={onClose}>
          ✕
        </button>

        {children}
      </aside>
    </>
  );
}