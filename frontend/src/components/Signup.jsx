import React, { useState } from "react";
import { Container, Typography, TextField, Button, Grid, Link } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { signup } from './actions/authAction';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      return;
    }
    dispatch(signup(username, email, password))
      .then(() => {
        toast.success('Signup successful! Please login.');
        navigate('/login');
      })
      .catch(err => toast.error('Signup failed. Please try again.'));
  };

  return (
    <div>
      <CssBaseline />
      <div style={{ backgroundImage: 'linear-gradient(45deg, #0F2167 20%, #4CB9E7 95%)', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: "white"
            }}
          >
            <Typography component="h1" variant="h4" style={{ fontFamily: "serif" }}>
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="username"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    autoFocus
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    InputLabelProps={{ style: { color: 'white' } }}
                    autoComplete="off"
                    sx={{ '& .MuiInputBase-input': { fontSize: '1.25rem', padding: '12px' } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    error={!!emailError}
                    helperText={emailError}
                    InputLabelProps={{ style: { color: 'white' } }}
                    autoComplete="off"
                    sx={{ '& .MuiInputBase-input': { fontSize: '1.25rem', padding: '12px' } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    InputLabelProps={{ style: { color: 'white' } }}
                    autoComplete="off"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, color: "white" }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2" sx={{ color: "white" }}>
                    Already have an account? Log in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </div>
    </div>
  );
};

export default Signup;
