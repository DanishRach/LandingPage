'use client'

import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, CircularProgress, Link } from '@mui/material';
import { useRouter } from 'next/navigation';
import { login, regis } from '@/api/user';
import { toast } from 'sonner';

export default function SignUpForm ()  {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSignUp (event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    const formData = new FormData()
    if(email) formData.append('email', email)
    if(password) formData.append('password', password)
    const result = await regis(formData)
    if (result !== undefined && result.error) {
      toast.error(result.error)
      setLoading(false)
    } else if(result !== undefined && result.success) {
      toast.success(result.success)
      router.push('/')
    }

  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#ffffff',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSignUp}
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
          Create an Account
        </Typography>

        <Typography
          fontWeight="bold"
          variant="h6"
          textAlign="center"
          color="#1d1e2b"
          mb={3}
        >
          Sign up to get started with Muse Academy
        </Typography>

        <TextField
          margin="normal"
          required
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!error}
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
        />
        <TextField
          margin="normal"
          required
          fullWidth
          type="password"
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={!!error}
          helperText={error}
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
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
        </Button>

        <Box mt={2} textAlign="center">
          <Typography variant="body2" color="#000000">
            Already have an account?{' '}
            <Link
              component="button"
              onClick={() => router.push('/page/form')} // Redirect ke halaman Login
              underline="hover"
              sx={{ color: '#2629cf', fontWeight: 'bold' }}
            >
              Log In
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};
