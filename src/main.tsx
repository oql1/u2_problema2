import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles.css";
import { PokedexProvider } from "./contexts/PokedexProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PokedexProvider>
      <App />
    </PokedexProvider>
  </React.StrictMode>,
);
