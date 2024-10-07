import {
  Container,
  FormLabel,
  Heading,
  VStack,
  Input,
  Box,
  Button,
  Avatar,
  Select,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../../redux/usersSlice';
import validator from 'validator';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [imgPrev, setImgPrev] = useState('');
  const [image, setImage] = useState('');
  const [role, setRole] = useState('');

  const [RegisterClientErrors, setRegisterClientError] = useState({});
  const RegisterErrors = {};

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector(state => state.user);

  const changeImgHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImgPrev(reader.result);
      setImage(file);
    };
  };

  const runRegisterClientValidation = () => {
    if (name.trim().length == 0) {
      RegisterErrors.name = 'username cannot be empty';
    }

    if (!(name.trim().length > 4 && name.trim().length < 15)) {
      RegisterErrors.namelength =
        'username should be greater than 4 and less than 15 character';
    }

    if (email.trim().length == 0) {
      RegisterErrors.emailEmpty = 'Email cannot be empty';
    }
    if (!validator.isEmail(email)) {
      RegisterErrors.email = 'Enter valid email';
    }
    if (email.trim().length == 0) {
      RegisterErrors.passwordEmpty = 'password cannot be empty';
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
      RegisterErrors.password = 'Password should be strong...!';
    }

    if (!image) {
      RegisterErrors.image = 'Please upload a profile picture';
    }
    if (!role) {
      RegisterErrors.role = 'Please select a role';
    }
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.append('name', name);
    myForm.append('email', email);
    myForm.append('password', password);
    myForm.append('file', image);
    myForm.append('role', role);
    // console.log(role);
    runRegisterClientValidation();
    if (Object.keys(RegisterErrors).length == 0) {
      dispatch(register(myForm));
    } else {
      setRegisterClientError(RegisterErrors);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile'); // Redirect to profile or any other page
    }
  }, [isAuthenticated, navigate]);
  return (
    <Container h={'90vh'} py={'16'} mb={'20'}>
      <VStack h={'full'} justifyContent={'center'} spacing={'8'}>
        <Heading textTransform={'uppercase'}>Registration</Heading>
        <form style={{ width: '100%' }} onSubmit={handleFormSubmit}>
          <Box my={'4'} display={'flex'} justifyContent={'center'}>
            <Avatar src={imgPrev} size={'2xl'} />
          </Box>
          <Box>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="abc"
            ></Input>
            {RegisterClientErrors.name && (
              <span style={{ color: 'red' }}>{RegisterClientErrors.name}</span>
            )}
            <br></br>
            {RegisterClientErrors.namelength && (
              <span style={{ color: 'red' }}>
                {RegisterClientErrors.namelength}
              </span>
            )}
          </Box>
          <Box>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              type="text"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="abc@gmail.com"
            ></Input>
            {RegisterClientErrors.emailEmpty && (
              <span style={{ color: 'red' }}>
                {RegisterClientErrors.emailEmpty}
              </span>
            )}
            <br></br>
            {RegisterClientErrors.email && (
              <span style={{ color: 'red' }}>{RegisterClientErrors.email}</span>
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
            {RegisterClientErrors.passwordEmpty && (
              <span style={{ color: 'red' }}>
                {RegisterClientErrors.passwordEmpty}
              </span>
            )}
            <br></br>
            {RegisterClientErrors.password && (
              <span style={{ color: 'red' }}>
                {RegisterClientErrors.password}
              </span>
            )}
          </Box>
          <Box>
            <FormLabel htmlFor="choseProfilePic">Profile Pic</FormLabel>
            <Input
              accept="image/*"
              id="choseProfilePic"
              type="file"
              onChange={changeImgHandler}
            ></Input>
            {RegisterClientErrors.image && (
              <span style={{ color: 'red' }}>{RegisterClientErrors.image}</span>
            )}
          </Box>
          <Box>
            <FormLabel htmlFor="role">Role</FormLabel>
            <Select
              onChange={e => setRole(e.target.value)}
              value={role}
              id="role"
              placeholder="select role"
            >
              <option value="user">Student</option>
              <option value="instructor">Instructor</option>
            </Select>
            {RegisterClientErrors.role && (
              <span style={{ color: 'red' }}>{RegisterClientErrors.role}</span>
            )}
          </Box>

          <Button type="submit" my="4" colorScheme="blue">
            Sign Up
          </Button>
          <Box>
            Already sign up ?{' '}
            <Link to="/login">
              <Button colorScheme={'blue'} variant="link">
                Login
              </Button>{' '}
              here
            </Link>
          </Box>
        </form>
      </VStack>
    </Container>
  );
}
