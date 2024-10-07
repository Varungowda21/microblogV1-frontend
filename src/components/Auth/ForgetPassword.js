import {
  Container,
  Heading,
  VStack,
  Input,
  FormLabel,
  Button,
} from '@chakra-ui/react';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { forgotPassword } from '../../redux/usersSlice';

export default function ForgetPassword() {
  const [email, setEmail] = useState('');
  const { isAuthenticated } = useSelector(state => state.user);
  const navigate=useNavigate()
  const dispatch=useDispatch()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile'); // Redirect to profile or any other page
    }
  }, [isAuthenticated, navigate]);


  const handleForgotFormSubmit=(e)=>{
    e.preventDefault()
    const formData={
      email
    }
    dispatch(forgotPassword(formData))
    
  }
  return (
    <Container h={'90vh'} py={'16'}>
      <form onSubmit={handleForgotFormSubmit}>
        <Heading
          my="16"
          textTransform={'uppercase'}
          textAlign={['center', 'left']}
        >
          Forget password
        </Heading>
        <FormLabel htmlFor="email">Enter Email</FormLabel>
        <VStack spacing={'8'}>
          <Input
            required
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="abc@gmail.com"
          ></Input>
          <Button type="submit" w={'full'} colorScheme="blue">
            Send Rest Link
          </Button>
        </VStack>
      </form>
    </Container>
  );
}
