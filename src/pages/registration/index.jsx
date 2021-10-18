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
  TextField,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { registration } from '../../api/user';
import { useHistory } from 'react-router-dom';
import { LOG_IN } from '../../routing/routes';
import validator from 'validator';

export default function registrationForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const history = useHistory();

  //let error = '';
  function handleShowPasswordClick() {
    setShowPassword(!showPassword);
  }

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleEmailChange(event) {
    const { value } = event.target;
    setEmail(value);
    console.log(value);
    if (validator.isEmail(value) || value === '') {
      setError(false);
      return;
    }
    setError(true);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  async function handleFormSubmit() {
    await registration(name, email, password);
    history.push(LOG_IN);
  }

  return (
    <Container maxWidth="sx" sx={{ display: 'flex', height: '100%', p: 2 }}>
      <Box sx={{ width: 600, m: 'auto' }}>
        <Stack direction="column" spacing={2}>
          <Typography variant="h4" gutterBottom>
            Registration Form
          </Typography>
          <TextField
            fullWidth
            type="name"
            label="Name"
            variant="standard"
            value={name}
            onChange={handleNameChange}
            placeholder="input your name"
          />

          <TextField
            fullWidth
            type="email"
            error={error}
            helperText={error ? 'incorrect email' : null}
            value={email}
            label="Email"
            variant="standard"
            onChange={handleEmailChange}
            placeholder="input your email"
          />

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
          <Button variant="outlined" href={LOG_IN}>
            Log In
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
