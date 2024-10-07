import { Grid, Heading, VStack, Th, Tr, Td, Table } from '@chakra-ui/react';
import InstructorSidebar from './InstructorSidebar';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getInstructorCourse } from '../../redux/instructorSlice';
import { Navigate } from 'react-router-dom';

export default function InstructorDashboard() {
  const { courses } = useSelector(state => state.instructor);
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();
  console.log(courses);
  useEffect(() => {
    dispatch(getInstructorCourse());
  }, [dispatch]);

  if (user.role === 'instructor' && user.isApproved === false) {
    return <Navigate to="/not-approved" />;
  }

  const getToalViews = () => {

    const viewsCount = courses.reduce((acc, cv) => {
      return acc + cv.views;
    }, 0);
    return viewsCount;
  };
  const getTotalLecture = () => {
 
    const TotalLecture = courses.reduce((acc, cv) => {
      return acc + cv.lectures.length;
    }, 0);
    return TotalLecture;
  };

  const getHighestCourseView = () => {
    if (!courses.length) return 0; // Check if courses exist

    const highestViewCourse = courses.reduce((prev, current) => {
      return prev.views > current.views ? prev : current;
    });

    return highestViewCourse.title;
  };

  const getHighestMyLearning = () => {
    if (!courses.length) return 0; // Check if courses exist

    const highestMyLearning = courses.reduce((prev, current) => {
      return prev.numOfStudAddedToMyLearning >
        current.numOfStudAddedToMyLearning
        ? prev
        : current;
    });

    return highestMyLearning.title;
  };
  return (
    <Grid minH={'100vh'} templateColumns={['1fr', '1fr 5fr']}>
      <InstructorSidebar />
      <VStack
        className="course"
        alignItems={['center', 'flex-start']}
        boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}
        p={'20px'}
      >
        {/* <Heading>Total views - {getToalViews()}</Heading>
        <Heading>Total Courses Added- {courses.length}</Heading>
        <Heading>Total Lectures Added- {getTotalLecture()}</Heading>
        <Heading>Highest Course views- {getHighestCourseView()}</Heading>
        <Heading>
          Highest Course Added to My learning- {getHighestMyLearning()}
        </Heading> */}
        <Heading ml={'10px'}>Instructor DashBoard</Heading>
        <Table
          border={'1px'}
          variant="striped"
          colorScheme="teal"
          size={'lg'}
          mt={'110px'}
        >
          <Tr>
            <Th>Total views</Th>
            <Td>{getToalViews()}</Td>
          </Tr>
          <Tr>
            <Th>Total Courses Added</Th>
            <Td>{courses.length}</Td>
          </Tr>
          <Tr>
            <Th>Total Lectures Added</Th>
            <Td>{getTotalLecture()}</Td>
          </Tr>
          <Tr>
            <Th>Highest Course views</Th>
            <Td>{getHighestCourseView()}</Td>
          </Tr>
          <Tr>
            <Th>Highest Course Added to My learning</Th>
            <Td>{getHighestMyLearning()}</Td>
          </Tr>
        </Table>
      </VStack>
    </Grid>
  );
}
