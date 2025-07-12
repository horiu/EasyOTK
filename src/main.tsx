import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@mantine/core/styles.css";

import { MantineProvider, ColorSchemeScript } from "@mantine/core";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <ColorSchemeScript defaultColorScheme="auto" />
    <MantineProvider defaultColorScheme="auto">
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </MantineProvider>
  </>
);
