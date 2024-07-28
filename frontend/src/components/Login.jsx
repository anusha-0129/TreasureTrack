import React, { useState } from "react";
import { Container, Typography, TextField, Button, Grid, Link } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { login } from './actions/authAction';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password))
      .then(() => {
        toast.success('Login successful!');
        navigate("/");
      })
      .catch(err => toast.error('Login failed. Please try again.'));
  };

  return (
    <div>
    
      <CssBaseline />
      <div style={{ backgroundImage: 'linear-gradient(45deg, #0F2167 20%, #4CB9E7 95%)', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Container component="main" maxWidth="xs" >
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color:"white"
        }}
      >
        <Typography component="h1" variant="h4" style={{fontFamily:"serif"}}>
          Login
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1}}>
          <Grid item xs={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              InputLabelProps={{ style: { color: 'white' } }}
              autoComplete="off"
              sx={{ '& .MuiInputBase-input': { fontSize: '1.25rem', padding: '12px' } }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              InputLabelProps={{ style: { color: 'white' } }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2,color:"white" }}
            >
              Login
            </Button>
          </Grid>
          <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2" sx={{color:"white"}}>
                  Don't have an account? Sign Up
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

export default Login;
