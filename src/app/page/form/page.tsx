"use client";
import React, { useState } from "react";
import LoginForm from "./Login";
import SignUpForm from "../signup/page";
import { Box, Button, Typography } from "@mui/material";

export default function Page() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // Responsive: Column for small screens, row for large screens
          height: "100vh",
          width: "100vw",
        }}
      >
        {/* Content Area */}
        <div>
          {/* Login Page */}
          {isLogin && (
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                px: 2, // Padding for small screens
              }}
            >
              <LoginForm />
              <Typography variant="body2" mt={2}>
                Don&apos;t have an account?{" "}
                <Button
                  variant="text"
                  onClick={() => setIsLogin(false)} // Switch to Sign Up
                  sx={{ color: "#2629cf", fontWeight: "bold", textTransform: "none" }}
                >
                  Sign Up
                </Button>
              </Typography>
            </Box>
          )}

          {/* Sign Up Page */}
          {!isLogin && (
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                px: 2, // Padding for small screens
              }}
            >
              <SignUpForm />
              <Typography variant="body2" mt={2}>
                Already have an account?{" "}
                <Button
                  variant="text"
                  onClick={() => setIsLogin(true)} // Switch to Login
                  sx={{ color: "#2629cf", fontWeight: "bold", textTransform: "none" }}
                >
                  Login
                </Button>
              </Typography>
            </Box>
          )}
        </div>

        {/* Sidebar with Background Image */}
        <Box
          sx={{
            flex: 1,
            backgroundImage: `url('https://img.lovepik.com/background/20211022/medium/lovepik-electronic-cloud-service-background-image_500608251.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: { xs: "none", md: "block" }, // Show only on large screens
          }}
        />
      </Box>
    </div>
  );
}
