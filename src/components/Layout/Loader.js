import { Spinner, VStack } from '@chakra-ui/react';

export default function Loader() {
  return (
    <VStack h="100vh" justifyContent={'center'}>
      <div style={{ transform: 'scale(4)' }}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </div>
    </VStack>
  );
}
