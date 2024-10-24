import { Heading, Stack, VStack, Text, Button, Image } from '@chakra-ui/react';
import './home.css';
import { Link } from 'react-router-dom';
import homeImg from '../assets/images/logo.png';
import IntroVedio from '../assets/videos/Intro.mp4';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from '@chakra-ui/react';
// import IntroVedio from '../.';

export default function Home() {
  return (
    <section className="home">
      <div className="container">
        <Stack
          direction={['column', 'row']}
          height="100%"
          justifyContent={['center', 'space-between']}
          alignItems="center"
          spacing={['20', '56']}
        >
          <VStack
            width={'full'}
            alignItems={['center', 'flex-end']}
            spacing="8"
          >
            <Heading size={'2xl'} textAlign={['center', 'right']}>
              UnLock Your Potential,<br></br> Anywhere Anytime
            </Heading>
            <Text textAlign={['center', 'left']}>
              Find valuable content at reasonable price
            </Text>
            <Link to="/courses">
              <Button size={'lg'} colorScheme="blue">
                Explore Now
              </Button>
            </Link>
          </VStack>
          <Image
            boxSize={'md'}
            src={homeImg}
            objectFit={'contain'}
            height={400}
          />
        </Stack>
      </div>
      <div className="container2">
        <video
          controls
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
          src={IntroVedio}
        ></video>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <div style={{ width: '60%' }}>
          <Heading textAlign={'center'} mb={'30px'}>
            FAQ
          </Heading>
          <Accordion allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton _expanded={{ bg: 'blue.400', color: 'white' }}>
                  <Box as="span" flex="1" textAlign="left">
                    How can I see all the available courses?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Once you log in, you can browse all the available courses on the
                platform by going to the "Courses" section. You can filter by
                categories or use the search feature
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton _expanded={{ bg: 'blue.400', color: 'white' }}>
                  <Box as="span" flex="1" textAlign="left">
                    How do I buy a subscription?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                You can buy a subscription by clicking on the "Subscribe" button
                available on the course page. You can choose between Stripe and
                Razorpay as your payment option.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton _expanded={{ bg: 'blue.400', color: 'white' }}>
                  <Box as="span" flex="1" textAlign="left">
                    How do I request a new course?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                You can request a new course by filling out the course request
                form available in the “Request a Course” section of your
                dashboard.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton _expanded={{ bg: 'blue.400', color: 'white' }}>
                  <Box as="span" flex="1" textAlign="left">
                    Can I watch course content without buying a subscription?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                You can browse the available courses, but to access lectures, a
                subscription is required.
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
