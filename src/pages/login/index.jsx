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
  TextField,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { logIn } from '../../api/user';
import { MAIN, REGISTRATION } from '../../routing/routes';
import { Link, useHistory } from 'react-router-dom';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const history = useHistory();

  function handleShowPasswordClick() {
    setShowPassword(!showPassword);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAuthError('');
  };

  async function handleFormSubmit() {
    try {
      await logIn(email, password);
      history.push(MAIN);
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
          <TextField
            fullWidth
            type="email"
            value={email}
            label="Email"
            variant="standard"
            onChange={handleEmailChange}
            placeholder="input your email"
          />

          <FormControl fullWidth variant="standard">
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
          <Button variant="outlined">
            <Link to={REGISTRATION}>REGISTRATION</Link>
          </Button>
          <Snackbar open={!!authError}>
            <Alert
              severity="error"
              action={
                <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              }
            >
              {authError}
            </Alert>
          </Snackbar>
        </Stack>
      </Box>
    </Container>
  );
}
