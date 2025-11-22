import React, { useState } from 'react';
import { Button, TextField, Typography, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent form refresh

    // MOCK VALIDATION LOGIC
    // You can change the accepted email/pass here
    if (email === 'test@test.com' && password === '1234') {
      setIsAuthenticated(true);
      navigate('/');
    } else {
      setError('Invalid credentials');
    }
  };

  // Custom styles for the TextFields to make them white/dark-theme friendly
  const textFieldStyles = {
    '& .MuiInputLabel-root': { color: '#b0b0b0' }, // Label color (grayish white)
    '& .MuiInputLabel-root.Mui-focused': { color: 'white' }, // Label color when clicking
    '& .MuiInputBase-input': { color: 'white' }, // Input text color
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: '#555' }, // Default border
      '&:hover fieldset': { borderColor: 'white' }, // Hover border
      '&.Mui-focused fieldset': { borderColor: 'white' }, // Focused border
    },
  };

  return (
    <Box
      sx={{
        // The "Secondary" background color for the full page
        backgroundColor: '#39445a',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"Montserrat", sans-serif',
      }}>
      <Paper
        elevation={6}
        sx={{
          // The "Primary" color for the card
          backgroundColor: '#2d313a',
          padding: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: '400px',
          color: 'white',
          borderRadius: '10px',
        }}>
        <Typography
          component="h1"
          variant="h5"
          sx={{ mb: 3, fontFamily: '"Montserrat", sans-serif', fontWeight: 600 }}>
          Welcome Back to Movies Insight
        </Typography>

        <form onSubmit={handleLogin} style={{ width: '100%' }}>
          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={textFieldStyles}
            required
          />

          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={textFieldStyles}
            required
          />

          {error && (
            <Typography
              color="#ff4f4fff"
              variant="body2"
              sx={{ mt: 1, textAlign: 'center', fontWeight: 500 }}>
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 4,
              mb: 2,
              backgroundColor: 'white',
              color: '#282c34',
              fontWeight: 'bold',
              padding: '10px',
              fontFamily: '"Montserrat", sans-serif',
              '&:hover': {
                backgroundColor: '#d1d1d1',
              },
            }}>
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
