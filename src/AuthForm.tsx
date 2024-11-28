import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, CircularProgress, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    const savedEmail = localStorage.getItem('userEmail');
    const savedPassword = localStorage.getItem('userPassword');

    setTimeout(() => {
      setLoading(false);
      if (email === savedEmail && password === savedPassword) {
        alert('Login successful!');
        navigate('/dashboard'); // Redirect to the next page
      } else {
        setError('Invalid email or password');
      }
    }, 2000);
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '1000vh',
        backgroundColor: '#ffffff',
      }}
    >
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          width: '100%',
          maxWidth: '400px',
          padding: 4,
          backgroundColor: '#ffffff',
          borderRadius: 2,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
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
          helperText={error && 'Email atau Password salah'}
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
          helperText={error && 'Email atau Password salah'}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 2,
            py: 1.5,
            backgroundColor: '#2629cf',
            '&:hover': { backgroundColor: '#2629cf' },
          }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
        </Button>

        <Box mt={2} textAlign="center">
          <Typography variant="body2" color="#000000">
            Belum punya akun?{' '}
            <Link
              component="button"
              onClick={() => navigate('/signup')} // Redirect ke halaman Sign Up
              underline="hover"
              sx={{ color: '#2629cf', fontWeight: 'bold' }}
            >
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          textAlign: 'center',
          backgroundColor: '#ffffff',
          py: 1,
          px: 3,
          boxShadow: '0px -2px 8px rgba(0, 0, 0, 0.0)',
          width: '46vw',
        }}
      >
        <Typography variant="body2" color="#000000">
          © {new Date().getFullYear()} Muse Academy. All rights reserved.
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginForm;
