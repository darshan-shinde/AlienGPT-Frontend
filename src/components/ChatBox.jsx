import React from "react";
import { Container, Box } from "@mui/material";
import QuickChat from "../images/QuickChat.svg";
import TipsAndUpdatesOutlinedIcon from "@mui/icons-material/TipsAndUpdatesOutlined";

const ChatBox = ({ messages, isGenerating, renderContent }) => {
  return (
    <Container
      sx={{
        overflowY: "auto",
        marginTop: { xs: "60px", sm: "70px", md: "70px", lg: "70px" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        width: "100%",
        scrollbarWidth: "0px",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        marginBottom: "10px",
        border: "1px solid #EEEEEE",
        borderRadius: "15px",
        backgroundColor: "#EEEEEE",
        padding: "20px",
        height: { xs: "77vh", sm: "77vh", md: "77vh", lg: "77vh" },
      }}
    >
      {messages.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "65vh",
            width: "100%",
          }}
        >
          <img src={QuickChat} alt="No messages" width="60%" height={"60%"} />
        </Box>
      ) : (
        <>
          {messages.map((message, index) => (
            <Box
              key={index}
              sx={{
                backgroundColor:
                  message.role === "user" ? "#EC625F" : "#525252",
                color: "white",
                padding: "8px",
                paddingLeft: "10px",
                borderRadius: "10px",
                maxWidth: "55%",
                marginBottom: "16px",
                marginLeft: message.role === "user" ? "auto" : "initial",
                marginRight: message.role === "assistant" ? "auto" : "initial",
                fontSize: "13px",
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              {renderContent(message.content)}
            </Box>
          ))}

          {/* Show loader at the assistant's position */}
          {isGenerating && (
            <Box
              sx={{
                backgroundColor: "#525252",
                color: "white",
                padding: "8px",
                paddingLeft: "10px",
                borderRadius: "10px",
                maxWidth: "70%",
                marginBottom: "16px",
                alignSelf: "flex-start", // Align with assistant messages
                display: "flex",
                alignItems: "center",
              }}
            >
              <TipsAndUpdatesOutlinedIcon
                sx={{ marginRight: "8px", color: "#EC625F" }}
              />
              <span>Generating...</span>
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default ChatBox;
