import { Container, Heading, VStack, Button, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMyProfile, updateProfile } from '../../redux/usersSlice';
import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import { useEffect } from 'react';
// import { clearError, clearMessage } from '../../redux/usersSlice';

export default function UpdateProfile() {
 
  const { user} = useSelector(state => state.user);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (error) {
  //     toast.error(error);
  //     dispatch(clearError());
  //   }
  //   if (message) {
  //     console.log("inside useEffect updateProfile")
  //     toast.success(message);
  //     dispatch(clearMessage());
  //   }
  // }, [dispatch, error, message]);

  const handleUpdateProfile = async e => {
    e.preventDefault();
    const formData = {
      name,
      email,
    };
    await dispatch(updateProfile(formData));
    dispatch(getMyProfile());
    navigate('/profile');
  };

  const handleBack = () => {
    navigate('/profile');
  };

  return (
    <Container minH={'90vh'} py="16">
      <form onSubmit={handleUpdateProfile}>
        <Heading my={'16'} textAlign={['center', 'left']}>
          Update Profile
        </Heading>
        <VStack spacing={'8'}>
          <Input
            required
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="name"
          ></Input>

          <Input
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="email"
          ></Input>
          <Button
            w={'full'}
            colorScheme="blue"
            type="submit"
            // isLoading={loading}
          >
            Update
          </Button>
          <Button onClick={handleBack}>Back</Button>
        </VStack>
      </form>
    </Container>
  );
}
