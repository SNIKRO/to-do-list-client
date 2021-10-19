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
  const [emailValidation, setState] = useState('');
  const [passwordValidation, setPasswordState] = useState('');
  const [nameValidation, setNameState] = useState('');
  const history = useHistory();

  function handleShowPasswordClick() {
    setShowPassword(!showPassword);
  }

  function handleNameChange(event) {
    const { value } = event.target;
    setName(value);
    if (value) {
      setNameState('');
      return;
    }
    setNameState('Name cannot be empty');
  }

  function handleEmailChange(event) {
    const { value } = event.target;
    setEmail(value);
    if (validator.isEmail(value) || value === '') {
      setState('');
      return;
    }
    setState('incorrect email');
  }

  function handlePasswordChange(event) {
    const { value } = event.target;
    setPassword(value);
    if (
      validator.isStrongPassword(value, {
        minLength: 5,
        minLowercase: 0,
        minUppercase: 0,
        minNumbers: 0,
        minSymbols: 0,
        returnScore: false,
      }) ||
      value === ''
    ) {
      setPasswordState('');
      return;
    }
    setPasswordState('Password length must be more than 5 characters');
  }

  async function handleFormSubmit() {
    if (!!nameValidation && !!passwordValidation && !!emailValidation) {
      try {
        await registration(name, email, password);
        history.push(LOG_IN);
      } catch (error) {
        setState(error.message);
      }
    }
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
            error={!!nameValidation}
            helperText={nameValidation ? nameValidation : null}
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
            error={!!emailValidation}
            helperText={emailValidation ? emailValidation : null}
            value={email}
            label="Email"
            variant="standard"
            onChange={handleEmailChange}
            placeholder="input your email"
          />

          <FormControl fullWidth>
            <InputLabel htmlFor="password" color={!!passwordValidation ? 'warning' : null}>
              {!!passwordValidation ? passwordValidation : 'Password'}
            </InputLabel>
            <Input
              error={!!passwordValidation}
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
