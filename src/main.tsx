import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { App } from "./App";
import "./styles/index.css";

const container = document.getElementById("root")!;
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// HTML prerenderizado → hidratar. En desarrollo (contenedor vacío) → renderizar.
if (container.hasChildNodes()) hydrateRoot(container, app);
else createRoot(container).render(app);
