import React from "react";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import ArrowCircleUpRoundedIcon from "@mui/icons-material/ArrowCircleUpRounded";

const Footer = ({
  inputText,
  setInputText,
  generateResponse,
  isGenerating,
}) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isGenerating && inputText.trim()) {
      e.preventDefault(); // Prevent the default form submit action on Enter key
      generateResponse(); // Call the generate response function
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        color: "white",
        width: "100%",
        padding: "5px",
        justifySelf: "center",
        marginTop: "20px",
        backgroundColor: "white",
        marginRight: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: { xs: "90%", sm: "80%", md: "70%" },
          margin: "0 auto",
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
                height: { xs: "45px", sm: "50px" }, // Responsive height
                padding: "4px",
              },
              "&:hover fieldset": { borderColor: "black" },
              "&.Mui-focused fieldset": { borderColor: "#EC625F" },
            },
            "& .MuiInputBase-input": {
              color: "black",
              fontSize: { xs: "14px", sm: "16px" }, // Responsive font size
            },
            input: { color: "black" },
          }}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress} // Handle Enter key press
          placeholder="Type your message..."
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={generateResponse} // Trigger response on icon click
                  color="primary"
                  sx={{
                    color:
                      isGenerating || !inputText.trim() ? "#B2B2B2" : "#EC625F",
                  }}
                  disabled={isGenerating || !inputText.trim()}
                >
                  <ArrowCircleUpRoundedIcon fontSize="large"/>
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
};

export default Footer;
