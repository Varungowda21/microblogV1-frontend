import {
  Box,
  Grid,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  Image,
  Td,
  HStack,
  Button,
} from '@chakra-ui/react';
import Sidebar from '../SideBar';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  approveInstructor,
  clearError,
  clearMessage,
  getAllUsers,
} from '../../../redux/adminSlice';
import { FcApproval } from 'react-icons/fc';
import toast from 'react-hot-toast';
import Loader from '../../Layout/Loader';

export default function ApproveInstructor() {
  const { users, message, error, loading } = useSelector(state => state.admin);
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
  const NotApprovedInstructor = users.filter(user => {
    return user.role === 'instructor' && user.isApproved === false;
  });
  const handleApprove = InstructorId => {
    console.log(InstructorId);
    const isConfirm = window.confirm('Are you sure');
    if (isConfirm) {
      const formData = {
        id: InstructorId,
      };
      dispatch(approveInstructor(formData));
    }
  };

  return (
    <Grid minH={'100vh'} templateColumns={['1fr 5fr']}>
      <Sidebar />
      {loading ? (
        <Loader />
      ) : (
        <Box padding={['0', '16']} overflow="auto">
          <Heading my="16" textAlign={['center', 'left']}>
            Instructor Requests
          </Heading>

          <TableContainer w={['100vw', 'full']}>
            <Table>
              <TableCaption>All instructor Request</TableCaption>
              <Thead>
                <Tr>
                  <Th>Id</Th>
                  <Th>Profile Pic</Th>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {NotApprovedInstructor.map(ele => {
                  return (
                    <Row
                      ele={ele}
                      key={ele._id}
                      handleApprove={handleApprove}
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

function Row({ ele, handleApprove }) {
  return (
    <Tr>
      <Td>#{ele._id}</Td>
      <Td>
        <Image src={ele.avatar.url} />
      </Td>
      <Td>{ele.name}</Td>
      <Td>{ele.email}</Td>

      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button color={'green.600'} onClick={() => handleApprove(ele._id)}>
            Approve
            <FcApproval />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}
