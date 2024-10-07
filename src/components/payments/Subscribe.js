import {
  Container,
  Heading,
  VStack,
  Box,
  Text,
  Button,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import axios from '../../config/axios';
import { buySubscription } from '../../redux/usersSlice';
import { clearError } from '../../redux/courseSlice';
import toast from 'react-hot-toast';
import skillboostlogo from '../../assets/images/SkillBoost.png';
import { useNavigate } from 'react-router-dom';

export default function Subscribe({ user }) {
  const dispatch = useDispatch();
  // const [key, setKey] = useState('');
  const navigate = useNavigate();

  const { subscriptionId } = useSelector(state => state.user);
  const { error } = useSelector(state => state.course);

  const handleSubscribeHandler = () => {
    console.log('inside sub handler');
    // const { data } = await axios.get('/api/v1/razorpaykey');
    // console.log(data);
    // console.log(data.key);
    // setKey(data.key);
    // if (data.key) {
    // if (isAuthenticated) {
    dispatch(buySubscription());
    // } else {
    // toast.error('Please login before buying the course');
    // }
    // Dispatch only after key is set
    // }
    // dispatch(buySubscription());
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    // if (courseError) {
    //   toast.error(courseError);
    //   dispatch(clearCoureseError());
    // }
    const token = localStorage.getItem('token');
    // console.log(key)
    if (subscriptionId) {
      const openPopUp = () => {
        const options = {
          key: 'rzp_test_OGGnrdl15pJdvi',
          name: 'Skill Boost',
          description: 'Get access to all premium content',
          image: skillboostlogo,
          subscription_id: subscriptionId,
          callback_url: `http://localhost:3061/api/v1/paymentverification?token=${token}`,
          prefill: {
            name: user.name,
            email: user.email,
            contact: '',
          },
          notes: {
            address: 'varun gowda from skill boost',
          },
          theme: {
            color: '#3399cc',
          },
        };

        console.log(options);

        const razor = new window.Razorpay(options);
        razor.open();
      };
      openPopUp();
    }
  }, [dispatch, error, subscriptionId, user.name, user.email]);
  const handleBack = () => {
    navigate('/courses');
  };

  return (
    <Container h={'90vh'} p="16">
      <Heading my="8" textAlign={'center'}>
        Welcome
      </Heading>
      <VStack
        boxShadow={'lg'}
        alignItems="stretch"
        borderRadius={'lg'}
        spacing="0"
      >
        <Box bg="blue.400" p={'4'} css={{ borderRadius: '8px 8px 0 0' }}>
          <Text textAlign={'center'}>Pro pack - 149</Text>
        </Box>
        <Box p="4">
          <VStack textAlign={'center'} px="8" spacing="8">
            <Text>Join Pro pack and get access to all content</Text>
            <Heading size={'md'}>149 only</Heading>
          </VStack>
          <Button
            my={'8'}
            w="full"
            colorScheme="blue"
            onClick={handleSubscribeHandler}
          >
            Buy now
          </Button>
        </Box>
        <Box bg="blackAlpha.600" p={'4'} css={{ borderRadius: '0 0 8px 8px' }}>
          <Heading size={'sm'} color={'white'}>
            100% refund at cancellation
          </Heading>
          <Text fontSize={'xs'} color={'white'}>
            Terms and conditions applied*
          </Text>
        </Box>
        <Button onClick={handleBack} mt={'5px'}>
          Back
        </Button>
      </VStack>
    </Container>
  );
}
