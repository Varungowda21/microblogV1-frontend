import {
  Grid,
  Box,
  Container,
  Heading,
  VStack,
  Input,
  Select,
  FormLabel,
  Image,
  Button,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearError,
  clearMessage,
  createCourse,
} from '../../redux/instructorSlice';
import toast from 'react-hot-toast';

import InstructorSidebar from './InstructorSidebar';
import Loader from '../Layout/Loader';
import { Navigate } from 'react-router-dom';

export default function InstructorCreateCourse() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [createdby, setCreatedBy] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [imgprev, setImgPrev] = useState('');
  const [courseClientError, setCourseClientError] = useState({});
  const courseError = {};
  const dispatch = useDispatch();

  const { error, message, loading } = useSelector(state => state.instructor);
  const { user } = useSelector(state => state.user);
  // console.log(error, message);

  const categories = [
    'Web development',
    'App development',
    'Data structures and Algorithm',
    'Machine Learning',
  ];

  const runCourseClientError = () => {
    if (title.trim().length == 0) {
      courseError.titleEmpty = 'title cannot be empty';
    }
    if (!(title.trim().length > 4 && title.trim().length < 10)) {
      courseError.titlelength =
        'title should be greater than 4 and less than 10 character ';
    }
    if (description.trim().length == 0) {
      courseError.descriptionEmpty = 'description cannot be empty';
    }
    if (!(description.trim().length > 10 && title.trim().length < 50)) {
      courseError.descriptionlength =
        'description should be greater than 10 and less than 50 character ';
    }
    if (createdby.trim().length == 0) {
      courseError.creatorEmpty = 'creatorBy cannot be empty';
    }
    if (!(createdby.trim().length > 4 && createdby.trim().length < 15)) {
      courseError.creatorlength =
        'creatorBy should be greater than 4 and less than 15 character ';
    }
    if (!category) {
      courseError.category = 'category cannot be empty';
    }
    if (!image) {
      courseError.image = 'please upload image ';
    }
  };

  const changeImgHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImgPrev(reader.result);
      setImage(file);
    };
  };

  const handleCreateCourseSubmit = e => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append('title', title);
    myForm.append('description', description);
    myForm.append('category', category);
    myForm.append('createdBy', createdby);
    myForm.append('file', image);

    runCourseClientError();

    if (Object.keys(courseError).length == 0) {
      dispatch(createCourse(myForm));

      setTitle('');
      setDescription('');
      setCategory('');
      setCreatedBy('');
      setImage('');
    } else {
      setCourseClientError(courseError);
    }
  };

  useEffect(() => {
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

  if (user.role === 'instructor' && user.isApproved === false) {
    return <Navigate to="/not-approved" />;
  }

  return (
    <Grid minH={'100vh'} templateColumns={['1fr', '1fr 5fr']}>
      <InstructorSidebar />
      {loading ? (
        <Loader />
      ) : (
        <Box>
          <Container py={'16'}>
            <form onSubmit={handleCreateCourseSubmit}>
              <Heading my={'16'} textAlign={['center', 'left']}>
                Create Course
              </Heading>
              <VStack m="auto" spacing={'8'}>
                <Input
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Title"
                ></Input>
                {courseClientError.titleEmpty && (
                  <span style={{ color: 'red' }}>
                    {courseClientError.titleEmpty}
                  </span>
                )}
                {courseClientError.titlelength && (
                  <span style={{ color: 'red' }}>
                    {courseClientError.titlelength}
                  </span>
                )}
                <Input
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Description"
                ></Input>
                {courseClientError.descriptionEmpty && (
                  <span style={{ color: 'red' }}>
                    {courseClientError.descriptionEmpty}
                  </span>
                )}
                {courseClientError.descriptionlength && (
                  <span style={{ color: 'red' }}>
                    {courseClientError.descriptionlength}
                  </span>
                )}
                <Input
                  value={createdby}
                  onChange={e => setCreatedBy(e.target.value)}
                  placeholder="Creator name"
                ></Input>
                {courseClientError.creatorEmpty && (
                  <span style={{ color: 'red' }}>
                    {courseClientError.creatorEmpty}
                  </span>
                )}
                {courseClientError.creatorlength && (
                  <span style={{ color: 'red' }}>
                    {courseClientError.creatorlength}
                  </span>
                )}
                <Select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                >
                  <option value="">Category</option>
                  {categories.map(ele => {
                    return (
                      <option key={ele} value={ele}>
                        {ele}
                      </option>
                    );
                  })}
                </Select>
                {courseClientError.category && (
                  <span style={{ color: 'red' }}>
                    {courseClientError.category}
                  </span>
                )}
                <FormLabel htmlFor="poster">Poster (Thumbnail)</FormLabel>
                <Input
                  accept="image/*"
                  id="poster"
                  type="file"
                  onChange={changeImgHandler}
                ></Input>
                {courseClientError.image && (
                  <span style={{ color: 'red' }}>
                    {courseClientError.image}
                  </span>
                )}
                {imgprev && (
                  <Image src={imgprev} boxSize="64" objectFit={'contain'} />
                )}

                <Button w={'full'} colorScheme={'purple'} type="submit">
                  Create
                </Button>
              </VStack>
            </form>
          </Container>
        </Box>
      )}
    </Grid>
  );
}
