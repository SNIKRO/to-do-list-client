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
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { registration } from '../../api/user';

export default function registrationForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleShowPasswordClick() {
    setShowPassword(!showPassword);
  }

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleFormSubmit() {
    registration(name, email, password);
  }
  return (
    <Container maxWidth="sx" sx={{ display: 'flex', height: '100%', p: 2 }}>
      <Box sx={{ width: 600, m: 'auto' }}>
        <Stack direction="column" spacing={2}>
          <Typography variant="h4" gutterBottom>
            Registration Form
          </Typography>
          <FormControl fullWidth>
            <InputLabel htmlFor="userName">Your name</InputLabel>
            <Input
              id="userName"
              type="name"
              aria-describedby="my-helper-text"
              value={name}
              onChange={handleNameChange}
              placeholder="input your name"
            />
          </FormControl>
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
            Registration
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
