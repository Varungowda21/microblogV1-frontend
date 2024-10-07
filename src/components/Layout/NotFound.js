import { Container, Heading, VStack, Button } from '@chakra-ui/react';

import { Link } from 'react-router-dom';
import { RiErrorWarningFill } from 'react-icons/ri';

export default function NotFound() {
  return (
    <Container h={'97vh'} p="16">
      <VStack justifyContent={'center'} h="full" spacing={'8'}>
        <RiErrorWarningFill size={'5rem'} />
        <Heading>Page Not Found</Heading>
        <Link to="/">
          <Button>Go to Home</Button>
        </Link>
      </VStack>
    </Container>
  );
}
