import {
  Grid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Box,
  Heading,
  Stack,
  Text,
  Button,
  VStack,
  Input,
  ModalFooter,
  Flex,
} from '@chakra-ui/react';
import { useState } from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { useSelector } from 'react-redux';

export default function InstructorCourseModal({
  isOpen,
  onClose,
  deleteButtonHandler,
  addButtonHandler,
  id,
  courseTitle,
  lectures,
  lectureClientError,
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [video, setVideo] = useState('');
  const [videoprev, setVideoPrev] = useState('');
  const [isEditMode, setEditMode] = useState(false);
  const [currentLectureId, setCurrentLectureId] = useState(null);

  const { loading } = useSelector(state => state.admin);
  // const { user } = useSelector(state => state.user);

  const closeHandler = () => {
    setTitle('');
    setDescription('');
    setVideo('');
    setVideoPrev('');
    setEditMode(false);
    setCurrentLectureId(null);
    onClose();
  };

  const changeVideoHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setVideoPrev(reader.result);
      setVideo(file);
    };
  };

  const editLectureButtonHandler = lecture => {
    setEditMode(true); // Enable edit mode
    setCurrentLectureId(lecture.lectureId); // Set the current lecture ID
    setTitle(lecture.title); // Pre-fill title
    setDescription(lecture.description); // Pre-fill description
    setVideoPrev(lecture.video); // Pre-fill video preview
  };
  // const CourseId = 1;
  // const courseTitle = 'React';
  return (
    <Modal
      isOpen={isOpen}
      onClose={closeHandler}
      size="full"
      scrollBehavior="outside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{courseTitle}</ModalHeader>
        <ModalCloseButton />
        <ModalBody p="16">
          <Grid templateColumns={['1fr', '3fr 1fr']}>
            <Box px={['0', '16']}>
              <Box my="5">
                <Heading>{courseTitle}</Heading>
                <Heading size={'sm'} opacity={0.4}>
                  {id}.
                </Heading>
              </Box>
              <Heading size="lg">Lectures</Heading>
              {lectures.map((ele, i) => (
                <VideoCard
                  key={ele._id}
                  title={ele.title}
                  description={ele.description}
                  video={ele.video.url}
                  num={i + 1}
                  lectureId={ele._id}
                  courseId={id}
                  deleteButtonHandler={deleteButtonHandler}
                  editLectureButtonHandler={editLectureButtonHandler}
                />
              ))}
            </Box>
            {/* {user && user.role === 'instructor' && ( */}
            <Box>
              <form
                onSubmit={e =>
                  addButtonHandler(
                    e,
                    id,
                    title,
                    description,
                    video,
                    isEditMode,
                    currentLectureId
                  )
                }
              >
                <VStack spacing={'4'}>
                  <Heading size={'md'}>
                    {isEditMode ? 'Edit Lecture' : 'Add Lecture'}
                  </Heading>
                  <Input
                    type={'text'}
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="title"
                  />
                  {lectureClientError.titleEmpty && (
                    <span style={{ color: 'red' }}>
                      {lectureClientError.titleEmpty}
                    </span>
                  )}
                  {lectureClientError.titlelength && (
                    <span style={{ color: 'red' }}>
                      {lectureClientError.titlelength}
                    </span>
                  )}
                  <Input
                    type={'text'}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="description"
                  />
                  {lectureClientError.descriptionEmpty && (
                    <span style={{ color: 'red' }}>
                      {lectureClientError.descriptionEmpty}
                    </span>
                  )}
                  {lectureClientError.descriptionlength && (
                    <span style={{ color: 'red' }}>
                      {lectureClientError.descriptionlength}
                    </span>
                  )}
                  <Input
                    accept="video/mp4"
                    type={'file'}
                    onChange={changeVideoHandler}
                  ></Input>
                  {lectureClientError.video && (
                    <span style={{ color: 'red' }}>
                      {lectureClientError.video}
                    </span>
                  )}
                  {videoprev && (
                    <video
                      controlsList="nodownload"
                      controls
                      src={videoprev}
                    ></video>
                  )}

                  <Button
                    w="full"
                    type="submit"
                    colorScheme="purple"
                    isLoading={loading}
                  >
                    {isEditMode ? 'Update' : 'Add'} Lecture
                  </Button>
                </VStack>
              </form>
            </Box>
            {/* )} */}
          </Grid>
        </ModalBody>
        <ModalFooter>
          <Button onClick={closeHandler}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

function VideoCard({
  title,
  description,
  num,
  lectureId,
  courseId,
  video,
  deleteButtonHandler,
  editLectureButtonHandler,
}) {
  return (
    <Stack
      direction={['column', 'row']}
      my="8"
      borderRadius={'lg'}
      boxShadow={'0 0 10px rgba(107,70,193,0.5)'}
      justifyContent={['flex-start', 'space-between']}
      padding={['4', '8']}
    >
      <Box>
        <Heading size={'sm'}>{`${num} ${title}`}</Heading>
        <Text>{description}</Text>
      </Box>
      <Flex gap={'2'}>
        <Button
          color={'blue'}
          onClick={() =>
            editLectureButtonHandler({
              lectureId,
              title,
              description,
              video,
            })
          }
        >
          Edit
        </Button>
        <Button
          color={'red'}
          onClick={() => deleteButtonHandler(courseId, lectureId)}
        >
          <RiDeleteBin7Fill />
        </Button>
      </Flex>
    </Stack>
  );
}
