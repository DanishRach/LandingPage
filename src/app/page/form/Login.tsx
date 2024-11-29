"use client";

import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { login, regis } from "@/api/user";
import { toast } from "sonner";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData()
    if(email) formData.append('email', email)
    if(password) formData.append('password', password)
    const result = await login(formData)
    if (result !== undefined && result.error) {
      toast.error(result.error)
      setLoading(false)
    } else if(result !== undefined && result.success) {
      toast.success(result.success)
      if (result.role === 'ADMIN') {
        router.push('/page/admin/user')
      } else {
        router.push('/')
      }
    }
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#ffffff",
      }}
    >
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          width: "100%",
          maxWidth: "400px",
          padding: 4,
          backgroundColor: "#ffffff",
          borderRadius: 2,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={1} textAlign="center">
          Login to Your Account
        </Typography>

        <Typography
          fontWeight="bold"
          variant="h6"
          textAlign="center"
          color="#1d1e2b"
          mb={3}
        >
          Selamat datang! Harap masukkan email untuk login.
        </Typography>

        <TextField
          margin="normal"
          required
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!error}
          helperText={error && "Email atau Password salah"}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!error}
          helperText={error && "Email atau Password salah"}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 2,
            py: 1.5,
            backgroundColor: "#2629cf",
            "&:hover": { backgroundColor: "#2629cf" },
          }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
        </Button>

        <Box mt={2} textAlign="center">
          <Typography variant="body2" color="#000000">
            Belum punya akun?{" "}
            <Link
              href="/page/signup"
              style={{
                textDecoration: "none",
                color: "#2629cf",
                fontWeight: "bold",
              }}
            >
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          textAlign: "center",
          backgroundColor: "#ffffff",
          py: 1,
          px: 3,
          boxShadow: "0px -2px 8px rgba(0, 0, 0, 0.0)",
          width: "100%",
        }}
      >
        <Typography variant="body2" color="#000000">
          © {new Date().getFullYear()} Muse Academy. All rights reserved.
        </Typography>
      </Box>
    </Container>
  );
}
