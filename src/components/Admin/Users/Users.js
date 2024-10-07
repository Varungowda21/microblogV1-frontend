import {
  Grid,
  Box,
  Heading,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  HStack,
  Button,
  RadioGroup,
  Radio,
  Stack,
  Image,
} from '@chakra-ui/react';
import Sidebar from '../SideBar';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  clearError,
  clearMessage,
  deleteUser,
  getAllUsers,
} from '../../../redux/adminSlice';
import toast from 'react-hot-toast';
import Loader from '../../Layout/Loader';

export default function Users() {
  const { users, loading, message, error } = useSelector(state => state.admin);
  const [filteredOption, setFilterdOption] = useState('all');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
  }, [dispatch, error, message]);

  const filterdUser = users.filter(user => {
    if (filteredOption === 'all') return true;
    if (filteredOption === 'subscribed-user')
      return user.subscription.status === 'active';
    if (filteredOption === 'approved-instructor')
      return user.isApproved === true;
    return true;
  });

  const handleDeleteUser = userId => {
    console.log(userId);
    const isConfirm = window.confirm('Are you sure');
    if (isConfirm) {
      const formData = {
        id: userId,
      };
      dispatch(deleteUser(formData));
    }
  };
  return (
    <Grid minH={'100vh'} templateColumns={['1fr', '1fr 5fr']}>
      <Sidebar />
      {loading ? (
        <Loader />
      ) : (
        <Box padding={['0', '16']} overflow="auto">
          <Heading my="16" textAlign={['center', 'left']}>
            All Users
          </Heading>
          <RadioGroup
            onChange={setFilterdOption}
            value={filteredOption}
            my={4}
            mb={'50px'}
          >
            <Stack direction="row">
              <Radio value="all" mr={10}>
                All
              </Radio>
              <Radio value="subscribed-user" mr={10}>
                Subscribed Users
              </Radio>
              <Radio value="approved-instructor">Approved Instructors</Radio>
            </Stack>
          </RadioGroup>
          <TableContainer w={['100vw', 'full']}>
            <Table variant={'simple'} size="lg">
              <TableCaption>All available users in the database</TableCaption>
              <Thead>
                <Tr>
                  <Th>Id</Th>
                  <Th>Profile Pic</Th>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Role</Th>
                  <Th>Subscription</Th>
                  <Th isNumeric>Action</Th>
                </Tr>
              </Thead>

              <Tbody>
                {filterdUser.map(ele => {
                  return (
                    <Row
                      ele={ele}
                      key={ele._id}
                      // handleChangeRole={handleChangeRole}
                      handleDeleteUser={handleDeleteUser}
                    />
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Grid>
  );
}

function Row({ ele, handleDeleteUser }) {
  return (
    <Tr>
      <Td>#{ele._id}</Td>
      <Td>
        <Image src={ele.avatar.url} />
      </Td>
      <Td>{ele.name}</Td>
      <Td>{ele.email}</Td>
      <Td>{ele.role}</Td>
      <Td>{ele.subscription.status === 'active' ? 'Active' : 'Not active'}</Td>
      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button color={'red.600'} onClick={() => handleDeleteUser(ele._id)}>
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}
