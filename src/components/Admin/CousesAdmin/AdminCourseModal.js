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
  ModalFooter,
} from '@chakra-ui/react';
import { RiDeleteBin7Fill } from 'react-icons/ri';


export default function AdminCourseModal({
  isOpen,
  onClose,
  deleteButtonHandler,
  id,
  courseTitle,
  lectures,
}) {


  const closeHandler = () => {
    onClose();
  };

  
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
                  num={i + 1}
                  lectureId={ele._id}
                  courseId={id}
                  deleteButtonHandler={deleteButtonHandler}
                />
              ))}
            </Box>
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
  deleteButtonHandler,
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
      <Button
        color={'red'}
        onClick={() => deleteButtonHandler(courseId, lectureId)}
      >
        <RiDeleteBin7Fill />
      </Button>
    </Stack>
  );
}
