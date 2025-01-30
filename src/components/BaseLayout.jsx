import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  CircularProgress,
  Typography,
  AppBar,
  Toolbar,
} from "@mui/material";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { paraisoDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import logo from "../images/d753cd31d66585bc9c91332b8a7b25fc-removebg-preview.png";

const BaseLayout = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const renderContent = (text) => {
    const codeRegex = /```([\s\S]*?)```/g;
    let codeBlocks = [];
    let match;

    while ((match = codeRegex.exec(text)) !== null) {
      codeBlocks.push(match[1]);
    }

    let formattedText = text.replace(codeRegex, "").trim();

    let formattedElements = [];
    const lines = formattedText.split("\n");

    lines.forEach((line, index) => {
      if (line.startsWith("**") && lines[index + 1]?.startsWith("* ")) {
        const title = line.replace("**", "").trim();
        const mainPoint = lines[index + 1].replace("*", "").trim();
        formattedElements.push(
          <div key={index}>
            <h3>{title}</h3>
            <p>{mainPoint}</p>
          </div>
        );
      } else if (line.includes("**")) {
        const boldText = line
          .split("**")
          .map((part, idx) =>
            idx % 2 === 1 ? <strong key={idx}>{part}</strong> : part
          );
        formattedElements.push(<p key={index}>{boldText}</p>);
      } else if (line.startsWith("* ")) {
        formattedElements.push(
          <ul
            key={index}
            style={{ listStyleType: "none", paddingLeft: "20px" }}
          >
            <li style={{ position: "relative", paddingLeft: "20px" }}>
              <span
                style={{
                  position: "absolute",
                  left: "0",
                  top: "0",
                  fontWeight: "bold",
                }}
              >
                •
              </span>
              {line.replace("*", "").trim()}
            </li>
          </ul>
        );
      } else {
        formattedElements.push(<p key={index}>{line}</p>);
      }
    });

    const codeElements = codeBlocks.map((code, index) => (
      <div
        key={index}
        style={{
          marginBottom: "10px",
          backgroundColor: "#525252",
          padding: "10px",
          borderRadius: "15px",
        }}
      >
        <SyntaxHighlighter language="auto" style={paraisoDark}>
          {code}
        </SyntaxHighlighter>
      </div>
    ));

    return [...formattedElements, ...codeElements];
  };

  const generateResponse = async () => {
    if (!inputText.trim()) return;

    const userMessage = { role: "user", content: inputText };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");

    try {
      setIsGenerating(true);

      const response = await fetch(
        "https://alien-gpt-backend.vercel.app/api/chat",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [...messages, userMessage],
          }),
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        const assistantResponse = { role: "assistant", content: data.response };
        setMessages((prev) => [...prev, assistantResponse]);
      } else {
        console.error("API Error:", data.error);
      }
    } catch (error) {
      console.error("Request Error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "96vh",
        overflowY: "auto",
        fontFamily: "poppins",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      {/* Header */}
      <AppBar
        position="fixed"
        sx={{ top: 0, backgroundColor: "#313131" }}
        width="100%"
      >
        <Toolbar>
          <img src={logo} alt="logo" height={40} width={60} />
          <Typography variant="h5" sx={{ width: "100%", color: "#EC625F" }}>
            AlienGPT
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Chat Area */}
      <Box
        sx={{
          flex: 1,
          width: "70%",
          overflowY: "auto",
          padding: "15px",
          paddingTop: "64px",
          marginBottom: "50px",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              backgroundColor: message.role === "user" ? "#EC625F" : "#525252",
              color: "white",
              padding: "8px",
              paddingLeft: "10px",
              borderRadius: "10px",
              maxWidth: "55%",
              marginBottom: "16px",
              marginLeft: message.role === "user" ? "auto" : "initial",
              marginRight: message.role === "assistant" ? "auto" : "initial",
              fontSize: "13px",
            }}
          >
            {renderContent(message.content)}{" "}
          </Box>
        ))}
        {isGenerating && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#525252",
              padding: "10px",
              borderRadius: "10px",
              marginBottom: "10px",
              maxWidth: "55%",
            }}
          >
            <CircularProgress size={24} />
            <span className="ml-2">Generating...</span>
          </Box>
        )}
      </Box>

      {/* Input Section */}
      <Box
        sx={{
          display: "flex",
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          color: "white",
          width: "70%",
          justifySelf: "center",
        }}
      >
        <TextField
          variant="outlined"
          fullWidth
          value={inputText}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#B2B2B2",
                borderRadius: "15px",
                height: "50px",
                padding: "2px",
              },
              "&:hover fieldset": {
                borderColor: "black",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#EC625F",
              },
            },
            "& .MuiInputBase-input": {
              color: "black",
            },
            input: {
              color: "black",
            },
          }}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message..."
        />
        <Button
          variant="contained"
          onClick={generateResponse}
          sx={{
            marginLeft: "8px",
            backgroundColor: "#EC625F",
            color: "white",
            height: "50px",
            borderRadius: "15px",
            width: "80px",
          }}
          disabled={isGenerating || !inputText.trim()}
        >
          {"Send"}
        </Button>
      </Box>
    </Box>
  );
};

export default BaseLayout;
