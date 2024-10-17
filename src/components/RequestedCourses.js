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
  Td,
} from '@chakra-ui/react';
import Sidebar from './Admin/SideBar';
import InstructorSidebar from './Instructer/InstructorSidebar';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../config/axios';

export default function RequestedCourse() {
  const [coureseReqList, setCourseReqList] = useState([]);
  const { user } = useSelector(state => state.user);

  useEffect(() => {
    const fetchCourseRequests = async () => {
      try {
        const response = await axios.get('/admin-instructor/getAllCourseReq', {
          headers: { Authorization: localStorage.getItem('token') },
        });
        // console.log(response)
        setCourseReqList(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCourseRequests();
  }, []);

  if (user.role === 'instructor' && user.isApproved === false) {
    return <Navigate to="/not-approved" />;
  }
  return (
    <Grid minH={'100vh'} templateColumns={['1fr', '1fr 5fr']}>
      {user.role === 'admin' ? <Sidebar /> : <InstructorSidebar />}

      <Box padding={['0', '16']} overflow="auto">
        <Heading my="16" textAlign={['center', 'left']}>
          Requested Courses
        </Heading>

        <TableContainer w={['100vw', 'full']}>
          <Table>
            <TableCaption>All requested courses</TableCaption>
            <Thead>
              <Tr>
                <Th>name</Th>
                <Th>Email</Th>
                <Th>course</Th>
              </Tr>
            </Thead>
            <Tbody>
              {coureseReqList.map(ele => {
                return <Row ele={ele} key={ele._id} />;
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Grid>
  );
}

function Row({ ele }) {
  return (
    <Tr>
      <Td>{ele.name}</Td>
      <Td>{ele.email}</Td>
      <Td>{ele.course}</Td>
    </Tr>
  );
}
