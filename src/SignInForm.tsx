import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

const SignInForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (event: React.FormEvent) => {
    event.preventDefault();
    alert(`Logged in as: ${email}`);
  };

  return (
    <Box component="form" onSubmit={handleSignIn}>
      <TextField
        margin="normal"
        required
        fullWidth
        label="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ backgroundColor: '#fff', borderRadius: 1 }}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ backgroundColor: '#fff', borderRadius: 1 }}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          mt: 2,
          py: 1.5,
          backgroundColor: '#4CAF50',
          '&:hover': { backgroundColor: '#45A049' },
        }}
      >
        Sign In
      </Button>
    </Box>
  );
};

export default SignInForm;
