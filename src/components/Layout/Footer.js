import { Stack, Box, VStack, Heading, HStack } from '@chakra-ui/react';
import {
  TiSocialYoutubeCircular,
  TiSocialInstagramCircular,
  TiSocialGithubCircular,
} from 'react-icons/ti';
export default function Footer() {
  return (
    <Box padding={'4'} bg="blackAlpha.900" minH={'10vh'} mt={'20'}>
      <Stack direction={['column', 'row']}>
        <VStack alignItems={['center', 'flex-start']} width="full">
          <Heading color={'white'}>All rights reserved</Heading>
          <Heading fontFamily={'body'} size="sm" color={'blue.400'}>
            @varungowda.k
          </Heading>
        </VStack>
        <HStack
          spacing={['2', '10']}
          justifyContent={'center'}
          color={'white'}
          fontSize={'50'}
        >
          <a href="https://youtube.com" target={'black'}>
            <TiSocialYoutubeCircular />
          </a>
          <a href="https://instagram.com" target={'black'}>
            <TiSocialInstagramCircular />
          </a>
          <a href="https://github.com" target={'black'}>
            <TiSocialGithubCircular />
          </a>
        </HStack>
      </Stack>
    </Box>
  );
}
