import React from "react";
import ChatApp from "../src/components/BaseLayout.jsx";
import { Box, Typography, AppBar, Toolbar } from "@mui/material"; // Material UI components
import "../src/App.css"; // Tailwind and custom CSS (if needed)

function App() {
  return (
    <div
      className="App"
      style={{
        height: "100%",
        overflow: "hidden",
        width: "100%",
      }}
    >
      <ChatApp />
    </div>
  );
}

export default App;
