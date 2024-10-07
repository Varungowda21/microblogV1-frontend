import {
  Container,
  Heading,
  HStack,
  Input,
  Text,
  Button,
  Stack,
  VStack,
  Image,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToMyLearning, getAllCourses } from '../../redux/courseSlice';
import { clearError, clearMessage } from '../../redux/courseSlice';
import { getMyProfile } from '../../redux/usersSlice';
import toast from 'react-hot-toast';

export default function Courses() {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const dispatch = useDispatch();
  const { courses, error, message } = useSelector(state => state.course);
  const { isAuthenticated, user } = useSelector(state => state.user);

  useEffect(() => {
    const formData = {
      keyword,
      category,
    };
    dispatch(getAllCourses(formData));
  }, [category, keyword, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
  }, [message, error, dispatch]);

  
  const addToPlayListHandler = async id => {
    // console.log('Add to playlist');
    if (isAuthenticated) {
      const formData = { id };
      await dispatch(addToMyLearning(formData));
      dispatch(getMyProfile());
    } else {
      toast.error('Please Login...!');
    }
  };
  const categories = [
    'web development',
    'App development',
    'Data structures and Algorithm',
    'Machine Learning',
  ];



  return (
    <>
      <Container minH={'95vh'} maxW="container.lg" paddingY={'8'}>
        <Heading m={'8'}>All Courses</Heading>
        <Input
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          placeholder="Search a course..."
        />
        <HStack overflowX={'auto'} padding="7" mb={'20px'}>
          {categories.map((ele, i) => {
            return (
              <Button key={i} onClick={() => setCategory(ele)} minW={'60'}>
                <Text>{ele}</Text>
              </Button>
            );
          })}
        </HStack>
        <Stack
          direction={['column', 'row']}
          flexWrap="wrap"
          justifyContent={['flex-start', 'space-evenly']}
          alignItems={['center', 'flex-start']}
        >
          {courses.length > 0 ? (
            courses.map(ele => (
              <CourseCard
                key={ele._id}
                id={ele._id}
                imageSrc={ele.poster.url}
                title={ele.title}
                description={ele.description}
                creator={ele.createdBy}
                lectureCount={ele.numofVideos}
                views={ele.views}
                addToPlayListHandler={addToPlayListHandler}
                user={user}
              />
            ))
          ) : (
            <Heading>Course Not found</Heading>
          )}
        </Stack>
      </Container>
    </>
  );
}

const CourseCard = ({
  id,
  imageSrc,
  title,
  description,
  creator,
  lectureCount,
  views,
  addToPlayListHandler,
  user,
}) => {
  return (
    <VStack
      className="course"
      alignItems={['center', 'flex-start']}
      boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}
      p={'20px'}
      width="100%"
      maxW="300px"
      borderRadius={'10px'}
    >
      <Image src={imageSrc} boxSize="60" objectFit={'contain'} />
      <Heading
        textAlign={['center', 'left']}
        maxW="200px"
        fontFamily={'sans-serif'}
        noOfLines={3}
      >
        {title}
      </Heading>
      <Text noOfLines={2}>{description}</Text>
      <HStack>
        <Text fontFamily={'bold'} textTransform="uppercase">
          Creator
        </Text>
        <Text textTransform="uppercase">{creator}</Text>
      </HStack>
      <Heading textAlign={'center'} size="xs" textTransform="uppercase">
        Lectures- {lectureCount}
      </Heading>
      <Heading textAlign={'center'} size="xs" textTransform="uppercase">
        views- {views}
      </Heading>
      <Stack direction={['column', 'row']} alignItems="center" content="fit">
        <Link to={`/course/${id}`}>
          <Button colorScheme={'blue'} size="sm">
            watch now
          </Button>
        </Link>

        {user?.role !== 'admin' && user?.role !== 'instructor' && (
          <Button
            colorScheme={'yellow'}
            onClick={() => addToPlayListHandler(id)}
            size="sm"
          >
            Add to playlist
          </Button>
        )}
      </Stack>
    </VStack>
  );
};
