import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import axios from "axios";

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
      });

      // Log the full API response for debugging
      console.log("Login response:", response.data);

      if (response.data.success) {
        const { token, user } = response.data;

        // Ensure token and user object exist
        if (!token || !user) {
          throw new Error("Invalid response from server");
        }

        // Save token to localStorage
        localStorage.setItem("token", token);

        // Pass user object to onLogin
        onLogin(user);
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Left Side */}
      <Box
        sx={{
          width: "33%",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 3,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Še niste registrirani?
        </Typography>
        <Button type="submit" variant="outlined" color="primary">
          Registracija
        </Button>
      </Box>

      {/* Right Side */}
      <Box
        sx={{
          width: "67%",
          backgroundColor: "gray",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          sx={{
            padding: 4,
            width: "100%",
            maxWidth: "400px",
            backgroundColor: "white",
            borderRadius: "17px",
          }}
          elevation={3}
        >
          <Typography variant="h6" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default LoginForm;
