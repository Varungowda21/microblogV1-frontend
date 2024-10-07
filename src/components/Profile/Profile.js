import {
  Avatar,
  Button,
  Container,
  Heading,
  HStack,
  Stack,
  VStack,
  Text,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Input,
  ModalFooter,
  useDisclosure,
  ModalHeader,
} from '@chakra-ui/react';
import { useState } from 'react';
import { RiDeleteBin5Fill } from 'react-icons/ri';

import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  cancelSubscription,
  getMyProfile,
  removeFromMyLearning,
  updateProfilePic,
} from '../../redux/usersSlice';
import Loader from '../Layout/Loader';
// import toast from 'react-hot-toast';

export default function Profile({ user }) {
  const dispatch = useDispatch();
  // const { user } = useSelector(state => state.user);

  const removeFromPlayListHandler = async id => {
    console.log(id);
    const formData = { id };
    await dispatch(removeFromMyLearning(formData));
    dispatch(getMyProfile());
  };

  // useEffect(() => {
  //   dispatch(getMyProfile());
  // }, [dispatch]);
  // const {  error, message } = useSelector(state => state.user);
  // useEffect(() => {
  //   if (error) {
  //     toast.error(error);
  //     dispatch(clearError());
  //   }
  //   if (message) {
  //     console.log("inside useEffect profile")
  //     toast.success(message);
  //     dispatch(clearMessage());
  //   }
  // }, [dispatch, error, message]);
  const changeImgSubmitHandler = async (e, image) => {
    e.preventDefault();
    // console.log(image);
    const myForm = new FormData();
    myForm.append('file', image);
    // console.log(myForm);
    await dispatch(updateProfilePic(myForm));
    dispatch(getMyProfile());
  };

  const handleCancelSubscriptionHandler = async () => {
    const isConfirm = window.confirm('Are you sure');
    if (isConfirm) {
      await dispatch(cancelSubscription());
      dispatch(getMyProfile());
    }
  };
  const { isOpen, onClose, onOpen } = useDisclosure();

  // const user = {
  //   name: 'varun',
  //   email: 'v@gamil.com',
  //   createdAt: String(new Date().toISOString()),
  //   role: 'user',
  //   subscription: {
  //     status: 'active',
  //   },
  //   playlist: [
  //     {
  //       course: 'sample1',
  //       poster:
  //         'https://cdn.pixabay.com/photo/2024/08/15/21/13/apple-8972210_1280.jpg',
  //     },
  //     {
  //       course: 'courseId2',
  //       poster: 'poster2.png',
  //     },
  //   ],
  // };

  if (!user) {
    return (
      <Container minH={'95vh'} maxW="container.lg" py="8">
        <Loader />
      </Container>
    );
  }

  return (
    <Container minH={'95vh'} maxW="container.lg" py="8">
      <Heading m={'8'} textTransform={'uppercase'}>
        Profile
      </Heading>
      <Stack
        justifyContent={'flex-start'}
        direction={['column', 'row']}
        alignItems={'center'}
        spacing={['8', '16']}
        padding={'8'}
      >
        <VStack>
          <Avatar boxSize={'48'} src={user.avatar.url} />
          <Button onClick={onOpen} colorScheme={'blue'} variant={'ghost'}>
            Change photo
          </Button>
        </VStack>
        <VStack spacing={'4'} alignItems={['center', 'flex-start']}>
          <HStack>
            <Text fontWeight={'bold'}>Name</Text>
            <Text>{user.name}</Text>
          </HStack>
          <HStack>
            <Text fontWeight={'bold'}>Email</Text>
            <Text>{user.email}</Text>
          </HStack>
          <HStack>
            <Text fontWeight={'bold'}>CreatedAt</Text>
            <Text>{user.createdAt.split('T')[0]}</Text>
          </HStack>
          {user.role !== 'admin' && user.role !== 'instructor' && (
            <HStack>
              <Text fontWeight={'bold'}>Subscription</Text>
              {user.subscription.status === 'active' ? (
                <Button
                  color={'blue'}
                  variant="unstyled"
                  onClick={handleCancelSubscriptionHandler}
                >
                  Cancel subscription
                </Button>
              ) : (
                <Link to="/subscribe">
                  <Button color="blue">Subscribe</Button>
                </Link>
              )}
            </HStack>
          )}
          {user.role === 'instructor' &&
            (user.isApproved === true ? (
              <Heading color={'green'} size={'sm'}>
                Instructor Approved
              </Heading>
            ) : (
              <Heading color={'red'} size={'sm'}>
                Instructor Not Approved
              </Heading>
            ))}

          <Stack direction={['column', 'row']} alignItems={'center'}>
            <Link to="/updateprofie">
              <Button>Update profile</Button>
            </Link>
            <Link to="/changepassword">
              <Button>Change password</Button>
            </Link>
          </Stack>
        </VStack>
      </Stack>

      {user.role === 'user' &&
        (user.mylearnings.length > 0 ? (
          <>
            <Heading size={'md'} m={'8'}>
              My learnings
            </Heading>
            <Stack
              direction={['column', 'row']}
              alignItems={'center'}
              flexWrap="wrap"
              p="4"
            >
              {user.mylearnings.map(ele => (
                <VStack
                  w="48"
                  m="2"
                  key={ele.course}
                  boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}
                  p={'10px'}
                >
                  <Image
                    boxSize={'full'}
                    objectFit="contain"
                    src={ele.poster}
                  />
                  <HStack>
                    <Link to={`/course/${ele.course}`}>
                      <Button variant={'ghost'} colorScheme="blue">
                        Watch now
                      </Button>
                    </Link>
                    <Button
                      onClick={() => removeFromPlayListHandler(ele.course)}
                    >
                      <RiDeleteBin5Fill />
                    </Button>
                  </HStack>
                </VStack>
              ))}
            </Stack>
          </>
        ) : (
          <>
            <Heading size={'md'} m={'8'}>
              My learnings
            </Heading>{' '}
            <Text
              textAlign={'center'}
              backgroundColor={'gold'}
              borderRadius={'5px'}
            >
              Your My Learnings is empty
            </Text>
          </>
        ))}

      <ChangePhotoModal
        isOpen={isOpen}
        onClose={onClose}
        changeImgSubmitHandler={changeImgSubmitHandler}
        // loading={loading}
      />
    </Container>
  );
}

const ChangePhotoModal = ({
  isOpen,
  onClose,
  changeImgSubmitHandler,
  // loading,
}) => {
  const [image, setImage] = useState('');
  const [imagePrev, setImgPrev] = useState('');
  const changeImgHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImgPrev(reader.result);
      setImage(file);
    };
  };

  const closeHandler = () => {
    onClose();
    setImage('');
    setImgPrev('');
  };
  return (
    <Modal isOpen={isOpen} onClose={closeHandler}>
      <ModalOverlay backdropBlur={'blur(10px)'} />
      <ModalContent>
        <ModalHeader>Change Photo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Container>
            <form onSubmit={e => changeImgSubmitHandler(e, image)}>
              <VStack spacing={'8'}>
                {imagePrev && <Avatar src={imagePrev} boxSize={'48'} />}

                <Input type={'file'} onChange={changeImgHandler} />
                <Button
                  w="full"
                  colorScheme={'blue'}
                  type="submit"
                  // isLoading={loading}
                >
                  Change
                </Button>
              </VStack>
            </form>
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button mr={'3'} onClick={closeHandler}>
            cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
