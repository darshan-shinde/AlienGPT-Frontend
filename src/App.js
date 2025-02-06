import React from "react";
import ChatApp from "../src/components/BaseLayout.jsx";
import "../src/App.css";

function App() {
  return (
    <div
      sx={{
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <ChatApp />
    </div>
  );
}

export default App;
