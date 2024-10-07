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
// import Sidebar from '../SideBar';
import { RiDeleteBin7Fill } from 'react-icons/ri';
// import CourseModal from '../Admin/CousesAdmin/AdminCourseModal';
import InstructorCourseModal from './instructorCourseModal';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
// import { getAllCourses } from '../../../redux/courseSlice';
import { getCourseLectures } from '../../redux/courseSlice';

// import { clearError, clearMessage } from '../../../redux/adminSlice';
import {
  clearError,
  clearMessage,
  deleteCourseByInstructor,
  addLecture,
  deleteLectureByInstructer,
  getInstructorCourse,
  editLectureByInstructer,
} from '../../redux/instructorSlice';
import toast from 'react-hot-toast';
import Loader from '../Layout/Loader';
import InstructorSidebar from './InstructorSidebar';
import { Navigate } from 'react-router-dom';

export default function InstructorCourses() {
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
  const { courses, error, message, loading } = useSelector(
    state => state.instructor
  );
  const { lectures } = useSelector(state => state.course);
  const { user } = useSelector(state => state.user);
  // const { error, message, loading } = useSelector(state => state.admin);

  const [courseId, setCourseId] = useState('');
  const [courseTitle, setCourseTitle] = useState('');

  const [lectureClientError, setLectureClientError] = useState({});
  const lectureError = {};

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
    dispatch(getInstructorCourse());
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (message) {
      console.log('i m');
      toast.success(message);
      dispatch(clearMessage());
    }
    // dispatch(getCourseLectures(formData));
  }, [dispatch, error, message]);

  // useEffect(() => {
  //   dispatch(getAllCourses());
  // }, [dispatch]);

  const handleDeleteCourse = courseId => {
    console.log(courseId);
    const isConfirm = window.confirm('Are u sure?');
    if (isConfirm) {
      const formData = {
        id: courseId,
      };
      dispatch(deleteCourseByInstructor(formData));
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
      await dispatch(deleteLectureByInstructer(formData));
      const formDataa = {
        id: courseId,
      };
      dispatch(getCourseLectures(formDataa));
    }
  };

  const addLectureButtonHandler = async (
    e,
    courseId,
    title,
    description,
    video,
    isEditMode,
    currentLectureId
  ) => {
    e.preventDefault();
    console.log({ courseId, title, description, video });
    console.log(courseId);
    const myForm = new FormData();
    myForm.append('id', courseId);
    myForm.append('title', title);
    myForm.append('description', description);
    myForm.append('file', video);
    console.log(myForm);
    if (title.trim().length == 0) {
      lectureError.titleEmpty = 'title cannot be empty';
    }
    if (!(title.trim().length > 4 && title.trim().length < 15)) {
      lectureError.titlelength =
        'title should be greater than 4 and less than 105characters';
    }
    if (description.trim().length == 0) {
      lectureError.descriptionEmpty = 'description cannot be empty';
    }
    if (!(description.trim().length > 6 && description.trim().length < 40)) {
      lectureError.descriptionlength =
        'description should be greater than 6 and less than 40 characters';
    }

    if (!isEditMode) {
      if (!video) {
        lectureError.video = 'please upload the video';
      }
    }
    if (Object.keys(lectureError).length == 0) {
      if (isEditMode) {
        myForm.append('lectureId', currentLectureId);
        console.log('async thunk call');
        dispatch(editLectureByInstructer(myForm));
        setLectureClientError({});
        const formData = {
          id: courseId,
        };
        dispatch(getCourseLectures(formData));
        // dispatch to middleware create async thunk
      } else {
        await dispatch(addLecture(myForm));
        setLectureClientError({});
        const formData = {
          id: courseId,
        };
        dispatch(getCourseLectures(formData));
      }
    } else {
      setLectureClientError(lectureError);
    }
  };
  const { isOpen, onClose, onOpen } = useDisclosure();

  if (user.role === 'instructor' && user.isApproved === false) {
    return <Navigate to="/not-approved" />;
  }

  return (
    <Grid minH={'100vh'} templateColumns={['1fr', '1fr 5fr']}>
      <InstructorSidebar />
      {loading ? (
        <Loader />
      ) : (
        <Box padding={['0', '8']} overflow="auto">
          <Heading my="16" textAlign={['center', 'left']}>
            Your Courses
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
          <InstructorCourseModal
            isOpen={isOpen}
            onClose={onClose}
            id={courseId}
            courseTitle={courseTitle}
            deleteButtonHandler={deleteLectureButtonHandler}
            addButtonHandler={addLectureButtonHandler}
            lectures={lectures}
            lectureClientError={lectureClientError}
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
