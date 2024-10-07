import {
  Grid,
  Box,
  Text,
  Heading,
  Stack,
  Table,
  Tr,
  Th,
  Td,
  // Progress,
} from '@chakra-ui/react';
import Sidebar from '../SideBar';

import { DoughnutChart } from './Chart';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminStats, getAllUsers } from '../../../redux/adminSlice';
import Loader from '../../Layout/Loader';

const DataBox = ({ title, qty }) => {
  return (
    <Box
      w={['full', '20%']}
      boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}
      p="8"
      borderRadius={'lg'}
    >
      <Text textAlign={'center'}>{title}</Text>

      <Text fontSize={'2xl'} fontWeight="bold" textAlign={'center'}>
        {qty}
      </Text>
    </Box>
  );
};

export default function Dashboard() {
  const dispatch = useDispatch();
  const { users } = useSelector(state => state.admin);
  const { loading, usersCount, subscriptionCount, viewsCount } = useSelector(
    state => state.admin
  );

  useEffect(() => {
    dispatch(getAdminStats());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  // Table functions
  const getTotalUsers = () => {
    return users.length;
  };
  const getTotalSubscibers = () => {
    const TotalSubscibers = users.filter(
      user => user.subscription.status === 'active'
    );
    return TotalSubscibers.length;
  };

  const getTotalInstructor = () => {
    const TotalInstructor = users.filter(user => user.role === 'instructor');
    return TotalInstructor.length;
  };
  const getTotalApprovedInstructor = () => {
    const TotalApprovedInstructor = users.filter(
      user => user.role === 'instructor' && user.isApproved === true
    );
    return TotalApprovedInstructor.length;
  };

  return (
    <Grid minH={'100vh'} templateColumns={['1fr', '1fr 5fr']}>
      <Sidebar />
      {loading ? (
        <Loader />
      ) : (
        <Box boxSizing="border-box" py="16" px={['4', '0']}>
          <Heading ml={['0', '16']} mb="16" textAlign={['center', 'left']}>
            DashBoard
          </Heading>
          <Stack
            direction={['column', 'row']}
            minH="24"
            justifyContent={'space-evenly'}
          >
            <DataBox title="Views" qty={viewsCount} />
            <DataBox title="Users" qty={usersCount} />
            <DataBox title="Subscriptions" qty={subscriptionCount} />
          </Stack>

          <Grid templateColumns={['1fr', '2fr 1.5fr']}>
            <Box p={'8'}>
              <Table
                border={'1px'}
                variant="striped"
                colorScheme="teal"
                size={'lg'}
                mt={'110px'}
              >
                <Tr>
                  <Th>Total Users</Th>
                  <Td>{getTotalUsers()}</Td>
                </Tr>
                <Tr>
                  <Th>Total Subscribers</Th>
                  <Td>{getTotalSubscibers()}</Td>
                </Tr>
                <Tr>
                  <Th>Total Non Subscribers</Th>
                  <Td>{getTotalUsers() - getTotalSubscibers()}</Td>
                </Tr>
                <Tr>
                  <Th>Total Instructor</Th>
                  <Td>{getTotalInstructor()}</Td>
                </Tr>
                <Tr>
                  <Th>Total Approved Instructor</Th>
                  <Td>{getTotalApprovedInstructor()}</Td>
                </Tr>
                <Tr>
                  <Th>Total Not Approved Instructor</Th>
                  <Td>{getTotalInstructor() - getTotalApprovedInstructor()}</Td>
                </Tr>
              </Table>
            </Box>

            <Box p={['0', '16']} boxSizing="border-box" py="4">
              <Heading textAlign={'center'} size="md" mb="4">
                Subscribed vs not Subscribed
              </Heading>
              <DoughnutChart
                growthData={[
                  subscriptionCount,
                  getTotalUsers() - getTotalSubscibers(),
                ]}
              />
              {/* pie chart */}
            </Box>
          </Grid>
        </Box>
      )}
    </Grid>
  );
}
