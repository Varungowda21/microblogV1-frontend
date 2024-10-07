import {
  Container,
  Heading,
  VStack,
  Box,
  Text,
  Button,
} from '@chakra-ui/react';
import { RiCheckboxCircleFill } from 'react-icons/ri';
import { Link, useSearchParams } from 'react-router-dom';

export default function PaymentSuccess() {
  const reference = useSearchParams()[0].get('reference');
  return (
    <Container h={'97vh'} p="16">
      <Heading my="8" textAlign={'center'}>
        You have pro pack
      </Heading>
      <VStack
        boxShadow={'lg'}
        pb={'16'}
        alignItems={'center'}
        borderRadius="lg"
      >
        <Box w="full" bg="blue.400" p="4" css={{ borderRadius: '8px 8px 0 0' }}>
          <Text textAlign={'center'}>Payment Success</Text>
        </Box>
        <Box p="4">
          <VStack textAlign={'center'} px={'8'} mt={'8'} spacing={'8'}>
            <Text>
              Congratulation you are a pro member you have access to premium
              content
            </Text>
            <Heading color={'green'} size={'4xl'}>
              <RiCheckboxCircleFill />
            </Heading>
          </VStack>
        </Box>
        <Link to="/profile">
          <Button>Go to profile</Button>
        </Link>
        <Heading size={'xs'}>Reference: {reference}</Heading>
      </VStack>
    </Container>
  );
}
