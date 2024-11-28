import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthForm from './AuthForm';
import SignUpForm from './SignUpForm';
import { Box } from '@mui/material';

const App: React.FC = () => {
  return (
    <Router>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' }, // Responsif: Kolom untuk layar kecil, baris untuk layar besar
          height: '100vh',
          width: '100vw',
        }}
      >
        <Routes>
          {/* Halaman Login */}
          <Route
            path="/login"
            element={
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  px: 2, // Padding untuk layar kecil
                }}
              >
                <AuthForm />
              </Box>
            }
          />

          {/* Halaman Sign Up */}
          <Route
            path="/signup"
            element={
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  px: 2, // Padding untuk layar kecil
                }}
              >
                <SignUpForm />
              </Box>
            }
          />

          {/* Redirect default ke /login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>

        {/* Sidebar dengan gambar latar */}
        <Box
          sx={{
            flex: 1,
            backgroundImage: `url('https://img.lovepik.com/background/20211022/medium/lovepik-electronic-cloud-service-background-image_500608251.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: { xs: 'none', md: 'block' }, // Tampilkan hanya di layar besar
          }}
        />
      </Box>
    </Router>
  );
};

export default App;
