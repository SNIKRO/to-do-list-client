import {
  Container,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Box,
  Stack,
  Button,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { logIn } from '../../api/user';
import { REGISTRATION } from '../../routing/routes';

export default function login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  function handleShowPasswordClick() {
    setShowPassword(!showPassword);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  async function handleFormSubmit() {
    try {
      await logIn(email, password);
    } catch (error) {
      setAuthError(error.message);
    }
  }

  return (
    <Container maxWidth="sx" sx={{ display: 'flex', height: '100%', p: 2 }}>
      <Box sx={{ width: 600, m: 'auto' }}>
        <Stack direction="column" spacing={2}>
          <Typography variant="h4" gutterBottom>
            Log In Form
          </Typography>
          <FormControl fullWidth>
            <InputLabel htmlFor="email">Email address</InputLabel>
            <Input
              id="email"
              type="email"
              aria-describedby="my-helper-text"
              value={email}
              onChange={handleEmailChange}
              placeholder="input your email"
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="password"
              onChange={handlePasswordChange}
              value={password}
              placeholder="input your password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" edge="end" onClick={handleShowPasswordClick}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <Button variant="contained" onClick={handleFormSubmit}>
            Log In
          </Button>
          <Button variant="outlined" href={REGISTRATION}>
            REGISTRATION
          </Button>
          <Snackbar open={!!authError}>
            <Alert severity="error">{authError}</Alert>
          </Snackbar>
        </Stack>
      </Box>
    </Container>
  );
}
