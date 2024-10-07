import { Container, Heading, VStack, Button, Input } from '@chakra-ui/react';
import {  useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  changePassword,
 
} from '../../redux/usersSlice';
// import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { getMyProfile } from '../../redux/usersSlice';

export default function ChangePassword() {
  const [oldpassword, setOldpassword] = useState('');
  const [newpassword, setNewpassword] = useState('');
  const dispatch = useDispatch();
  const navigate=useNavigate()

  // const {  loading } = useSelector(state => state.user);

  // useEffect(() => {
  //   if (error) {
  //     toast.error(error);
  //     dispatch(clearError());
  //   }
  //   if (message) {
  //     console.log("inside change password")
  //     toast.success(message);
  //     dispatch(clearMessage());
  //   }
  // }, [dispatch, error, message]);

  const handleChangePassword = async(e) => {
    e.preventDefault();
    const formData = {
      oldpassword,
      newpassword,
    };
    await dispatch(changePassword(formData));
    dispatch(getMyProfile());
    navigate('/profile')
  };
  return (
    <Container minH={'90vh'} py="16">
      <form onSubmit={handleChangePassword}>
        <Heading my={'16'} textAlign={['center', 'left']}>
          Change Password
        </Heading>
        <VStack spacing={'8'}>
          <Input
            required
            value={oldpassword}
            onChange={e => setOldpassword(e.target.value)}
            placeholder="old password"
          ></Input>

          <Input
            required
            value={newpassword}
            onChange={e => setNewpassword(e.target.value)}
            placeholder="new password"
          ></Input>
          <Button
            w={'full'}
            colorScheme="blue"
            type="submit"
            // isLoading={loading}
          >
            Change Password
          </Button>
        </VStack>
      </form>
    </Container>
  );
}
