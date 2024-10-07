import {
  Container,
  Heading,
  Textarea,
  VStack,
  Input,
  Box,
  FormLabel,
  Button,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from '../../config/axios';
import toast from 'react-hot-toast';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleContactSubmit = async e => {
    e.preventDefault();
    const formData = {
      name,
      email,
      message,
    };
    try {
      const response = await axios.post('/api/v1/contact', formData);
      console.log(response.data)
      toast.success('Your message sent Successfully');
      setName('');
      setMessage('');
      setEmail('');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container h="92vh">
      <VStack h={'full'} justifyContent={'center'} spacing={'16'}>
        <Heading>Contact Us</Heading>
        <form style={{ width: '100%' }} onSubmit={handleContactSubmit}>
          <Box>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              required
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="abc"
            ></Input>
          </Box>
          <Box>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              required
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="email"
            ></Input>
          </Box>
          <Box>
            <FormLabel htmlFor="message">Message</FormLabel>
            <Textarea
              required
              id="message"
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Your message..."
            ></Textarea>
          </Box>
          <Button type="submit" my="4" colorScheme="blue">
            Send mail
          </Button>
          <Box my="4">
            Request for a course{' '}
            <Link to="/requestcourse">
              <Button colorScheme={'blue'} variant="link">
                Click here
              </Button>{' '}
            </Link>
          </Box>
        </form>
      </VStack>
    </Container>
  );
}
