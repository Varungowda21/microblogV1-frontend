import {
  Container,
  Heading,
  VStack,
  Input,
  FormLabel,
  Button,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { resetPassword } from '../../redux/usersSlice';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const params = useParams();
  console.log(params.token);
  const { isAuthenticated } = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile'); // Redirect to profile or any other page
    }
  }, [isAuthenticated, navigate]);

  const handleResetPasswordFormSubmit = e => {
    e.preventDefault();
   

    const formData = {
      token: params.token,
      password,
    };
    console.log(formData);
    dispatch(resetPassword(formData));
    navigate('/login')
  };

  return (
    <Container h={'90vh'} py={'16'}>
      <form onSubmit={handleResetPasswordFormSubmit}>
        <Heading
          my="16"
          textTransform={'uppercase'}
          textAlign={['center', 'left']}
        >
          Reset Password
        </Heading>
        <FormLabel htmlFor="password">Enter Password</FormLabel>
        <VStack spacing={'8'}>
          <Input
            required
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="password"
          ></Input>
          <Button type="submit" w={'full'} colorScheme="blue">
            Reset Password
          </Button>
        </VStack>
      </form>
    </Container>
  );
}
