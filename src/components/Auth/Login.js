import {
  Container,
  FormLabel,
  Heading,
  VStack,
  Input,
  Box,
  Button,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../../redux/actions/user-action';
import { fetchLoginInfo } from '../../redux/usersSlice';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginClientErrors, setLoginClientError] = useState({});
  const LoginErrors = {};
  const runLoginClientValidation = () => {
    if (email.trim().length == 0) {
      LoginErrors.emailEmpty = 'Email cannot be empty';
    }
    if (!validator.isEmail(email)) {
      LoginErrors.email = 'Enter valid email';
    }
    if (email.trim().length == 0) {
      LoginErrors.passwordEmpty = 'password cannot be empty';
    }
    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      LoginErrors.password = 'Password should be strong';
    }
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector(state => state.user);

  // const handleFormSubmit = e => {
  //   e.preventDefault();
  //   dispatch(login(email, password));
  // };
  const handleFormSubmit = e => {
    e.preventDefault();
    const formData = {
      email,
      password,
    };
    runLoginClientValidation();
    if (Object.keys(LoginErrors).length == 0) {
      dispatch(fetchLoginInfo(formData));
    } else {
      setLoginClientError(LoginErrors);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile'); // Redirect to profile or any other page
    }
  }, [isAuthenticated, navigate]);

  return (
    <Container h={'95vh'}>
      <VStack h={'full'} justifyContent={'center'} spacing={'16'}>
        <Heading>Welcome to SkillBoost</Heading>
        <form style={{ width: '100%' }} onSubmit={handleFormSubmit}>
          <Box>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="abc@gmail.com"
            ></Input>
            {loginClientErrors.emailEmpty && (
              <span style={{ color: 'red' }}>
                {loginClientErrors.emailEmpty}
              </span>
            )}
            <br></br>
            {loginClientErrors.email && (
              <span style={{ color: 'red' }}>{loginClientErrors.email}</span>
            )}
          </Box>
          <Box>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="password"
            ></Input>
            {loginClientErrors.passwordEmpty && (
              <span style={{ color: 'red' }}>
                {loginClientErrors.passwordEmpty}
              </span>
            )}
            <br></br>
            {loginClientErrors.password && (
              <span style={{ color: 'red' }}>{loginClientErrors.password}</span>
            )}
          </Box>
          <Box>
            <Link to="/forget-password">
              <Button fontSize={'sm'} variant={'link'}>
                Forgot password?
              </Button>
            </Link>
          </Box>
          <Button type="submit" my="4" colorScheme="blue">
            Login
          </Button>
          <Box my="4">
            New User?{' '}
            <Link to="/register">
              <Button colorScheme={'blue'} variant="link">
                Sign Up
              </Button>{' '}
              here
            </Link>
          </Box>
        </form>
      </VStack>
    </Container>
  );
}
