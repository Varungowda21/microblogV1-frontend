import { Container, Heading, VStack, Button, Text } from '@chakra-ui/react';

import { Link } from 'react-router-dom';
import { RiErrorWarningFill } from 'react-icons/ri';

export default function NotApproved() {
  return (
    <>
      <Container h={'97vh'} p="16">
        <VStack justifyContent={'center'} h="full" spacing={'8'}>
          <RiErrorWarningFill size={'5rem'} />
          <Heading>Oops..!</Heading>
          <Text>Cannot access this page, Admin need to approve</Text>
          <Link to="/">
            <Button>Go to Home</Button>
          </Link>
        </VStack>
      </Container>
    </>
  );
}
