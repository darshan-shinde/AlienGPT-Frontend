import React, { useState } from "react";
import { Container } from "@mui/material";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { paraisoDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import logo from "../images/d753cd31d66585bc9c91332b8a7b25fc-removebg-preview.png";
import Header from "./Header";
import ChatBox from "./ChatBox";
import Footer from "./Footer";

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
       console.log("API Response:", assistantResponse);
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
    <Container
      lg={12}
      sx={{
        minHeight: "96vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: "poppins",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <Header logo={logo} />
      <ChatBox
        messages={messages}
        isGenerating={isGenerating}
        renderContent={renderContent}
      />
      <Footer
        inputText={inputText}
        setInputText={setInputText}
        generateResponse={generateResponse}
        isGenerating={isGenerating}
      />
    </Container>
  );
};

export default BaseLayout;
