import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import { RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/usersSlice';
import toast from 'react-hot-toast';

const LinkButton = ({ url = '/', title = 'Home', onClose }) => (
  <Link onClick={onClose} to={url}>
    <Button variant={'ghost'}>{title}</Button>
  </Link>
);

export default function Header({ isAuthenticated = false, user }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const isLoggedIn = false;
  // const user = {
  //   role: 'admin',
  // };
  const dispatch = useDispatch();
  const handleLogout = () => {
    // console.log('Logout');
    localStorage.removeItem('token');
    dispatch(logOut());
    toast.success('Logged out successfully');
    onClose();
  };
  return (
    <>
      <ColorModeSwitcher />
      <Button
        onClick={onOpen}
        colorScheme="blue"
        width="12"
        height="12"
        rounded={'full'}
        position={'fixed'}
        top="6"
        right="6"
        zIndex={'1'}
      >
        <RiMenu5Fill />
      </Button>
      <Drawer placement="right" isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay backdropFilter={'blur(5px)'} />
        <DrawerContent>
          <DrawerHeader borderBottomWidth={'1px'}>SkillBoost.com</DrawerHeader>
          <DrawerCloseButton />
          <DrawerBody>
            <VStack spacing={'4'} alignItems="flex-start">
              <LinkButton url="/" title="Home" onClose={onClose} />
              <LinkButton
                url="/courses"
                title="All courses"
                onClose={onClose}
              />
              <LinkButton
                url="/requestcourse"
                title="Request a Course"
                onClose={onClose}
              />
              <LinkButton url="/contact" title="Contact Us" onClose={onClose} />
              <LinkButton url="/about" title="About" onClose={onClose} />
            </VStack>

            <HStack
              justifyContent={'space-evenly'}
              position="absolute"
              bottom={'5rem'}
              width="80%"
            >
              {isAuthenticated ? (
                <>
                  <VStack>
                    {user && user.role == 'admin' && (
                      <Link to="/admin/dashboard" onClick={onClose}>
                        <Button colorScheme={'yellow'}>
                          <RiDashboardFill />
                          Dashboard
                        </Button>
                      </Link>
                    )}
                    {user && user.role == 'instructor' && (
                      <Link to="/instructor/dashboard" onClick={onClose}>
                        <Button colorScheme={'yellow'}>
                          <RiDashboardFill />
                          Dashboard
                        </Button>
                      </Link>
                    )}
                    <HStack>
                      <Link to="/profile" onClick={onClose}>
                        <Button colorScheme={'blue'}>Profile</Button>
                      </Link>
                      <Button colorScheme={'red'} onClick={handleLogout}>
                        <RiLogoutBoxLine />
                        Logout
                      </Button>
                    </HStack>
                  </VStack>
                </>
              ) : (
                <>
                  <Link to="/register" onClick={onClose}>
                    <Button colorScheme={'blue'}>Sign Up</Button>
                  </Link>
                  <p>OR</p>
                  <Link to="/login" onClick={onClose}>
                    <Button colorScheme={'blue'}>Login</Button>
                  </Link>
                </>
              )}
            </HStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
