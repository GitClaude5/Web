/**
 * Entrada de VISTA PREVIA: un único HTML autocontenido que se abre sin servidor.
 * Usa MemoryRouter para funcionar desde file:// o dentro de un visor.
 * No es la versión de producción (esa es `npm run build`).
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router";
import { App } from "./App";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MemoryRouter>
      <App />
    </MemoryRouter>
  </StrictMode>,
);
