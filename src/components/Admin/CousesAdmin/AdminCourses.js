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
  Image,
  useDisclosure,
} from '@chakra-ui/react';
import Sidebar from '../SideBar';
import { RiDeleteBin7Fill } from 'react-icons/ri';
// import CourseModal from './CourseModal';
import AdminCourseModal from './AdminCourseModal';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllCourses } from '../../../redux/courseSlice';
import { getCourseLectures } from '../../../redux/courseSlice';
import {
  deleteCourseByadmin,
  deleteLectureByadmin,
} from '../../../redux/adminSlice';
import { clearError, clearMessage } from '../../../redux/adminSlice';
import toast from 'react-hot-toast';
import Loader from '../../Layout/Loader';

export default function AdminCourses() {
  // course array sample
  // const courses = [
  //   {
  //     _id: 'wrfrt',
  //     poster: {
  //       url: 'https://cdn.pixabay.com/photo/2024/08/15/21/13/apple-8972210_1280.jpg',
  //     },
  //     title: 'react',
  //     category: 'web development',
  //     createdBy: 'varun',
  //     views: 123,
  //     numOfVideos: 3,
  //   },
  // ];
  const { courses, lectures } = useSelector(state => state.course);
  const { error, message, loading } = useSelector(state => state.admin);

  const [courseId, setCourseId] = useState('');
  const [courseTitle, setCourseTitle] = useState('');

  const dispatch = useDispatch();

  const handleCourseDetail = (courseId, courseTitle) => {
    console.log(courseId);
    setCourseId(courseId);
    setCourseTitle(courseTitle);

    const formData = {
      id: courseId,
    };
    dispatch(getCourseLectures(formData));
    onOpen();
  };

  useEffect(() => {
    const formData = {
      keyword: '',
      category: '',
    };
    dispatch(getAllCourses(formData));
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (message) {
      console.log('i m');
      toast.success(message);
      dispatch(clearMessage());
    }
  }, [dispatch, error, message]);



  const handleDeleteCourse = courseId => {
    console.log(courseId);
    const isConfirm = window.confirm('Are u sure?');
    if (isConfirm) {
      const formData = {
        id: courseId,
      };
      dispatch(deleteCourseByadmin(formData));
    }
  };
  const deleteLectureButtonHandler = async (courseId, lectureId) => {
    const formData = {
      courseId,
      lectureId,
    };
    console.log(formData);
    const isConfirm = window.confirm('Are u sure');
    if (isConfirm) {
      await dispatch(deleteLectureByadmin(formData));
      const formDataa = {
        id: courseId,
      };
      dispatch(getCourseLectures(formDataa));
    }
  };

  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <Grid minH={'100vh'} templateColumns={['1fr', '1fr 5fr']}>
      <Sidebar />
      {loading ? (
        <Loader />
      ) : (
        <Box padding={['0', '8']} overflow="auto">
          <Heading my="16" textAlign={['center', 'left']}>
            All Courses
          </Heading>

          <TableContainer w={['100vw', 'full']}>
            <Table variant={'simple'} size="lg">
              <TableCaption>All available courses in the database</TableCaption>
              <Thead>
                <Tr>
                  <Th>Id</Th>
                  <Th>Poster</Th>
                  <Th>Title</Th>
                  <Th>Category</Th>
                  <Th>Instructor</Th>
                  <Th>Instructer Id</Th>
                  <Th>
                    No of Students <br></br>Added to My learning
                  </Th>
                  {/*5+3*/}
                  <Th isNumeric>Views</Th>
                  <Th isNumeric>Lectures</Th>
                  <Th isNumeric>Action</Th>
                </Tr>
              </Thead>

              <Tbody>
                {courses.map(ele => {
                  return (
                    <Row
                      ele={ele}
                      key={ele._id}
                      handleCourseDetail={handleCourseDetail}
                      handleDeleteCourse={handleDeleteCourse}
                    />
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
          <AdminCourseModal
            isOpen={isOpen}
            onClose={onClose}
            id={courseId}
            courseTitle={courseTitle}
            deleteButtonHandler={deleteLectureButtonHandler}
            lectures={lectures}
          />
        </Box>
      )}
    </Grid>
  );
}

function Row({ ele, handleCourseDetail, handleDeleteCourse }) {
  return (
    <Tr>
      <Td>#{ele._id}</Td>
      <Td>
        <Image src={ele.poster.url} />
      </Td>
      <Td>{ele.title}</Td>
      <Td>{ele.category}</Td>
      <Td>{ele.createdBy}</Td>
      <Td>{ele.InstucterId}</Td>
      <Td>{ele.numOfStudAddedToMyLearning.length}</Td>
      <Td isNumeric>{ele.views}</Td>
      <Td isNumeric>{ele.numofVideos}</Td>
      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button
            variant={'outline'}
            color={'purple.500'}
            onClick={() => handleCourseDetail(ele._id, ele.title)}
          >
            View Lectures
          </Button>
          <Button color={'red.600'} onClick={() => handleDeleteCourse(ele._id)}>
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}
