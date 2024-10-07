import { Grid, Box, Heading, Text, VStack, Container } from '@chakra-ui/react';
// import IntroVedio from '../../assets/videos/Intro.mp4';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { getCourseLectures } from '../../redux/courseSlice';
import Loader from '../Layout/Loader';
// import {Ri}

export default function CoursePage({ user }) {
  const [lectureNumber, setLectureNumber] = useState(0);
  // const lectureTitle = 'Lecture Title';
  const dispatch = useDispatch();
  const parmas = useParams();
  const { lectures, loading } = useSelector(state => state.course);
  console.log(lectures);
  useEffect(() => {
    const formData = {
      id: parmas.id,
    };
    dispatch(getCourseLectures(formData));
  }, [dispatch, parmas.id]);
  // console.log(user);
  if (
    user.subscription.status !== 'active' &&
    user.role !== 'admin' &&
    user.role !== 'instructor'
  ) {
    return <Navigate to="/subscribe" />;
  }
  if (user.role === 'instructor' && user.isApproved === false) {
    return <Navigate to="/not-approved" />;
  }

  //lectures sample
  // const lectures = [
  //   {
  //     _id: 'dfsf',
  //     title: 'Sample 1',
  //     description: 'js variable',
  //     video: {
  //       url: 'video.mp4',
  //     },
  //   },
  //   {
  //     _id: 'kjhg',
  //     title: 'Sample 2',
  //     description: 'js data type',
  //     video: {
  //       url: 'video.mp4',
  //     },
  //   },
  // ];

  if (loading) {
    return <Loader />;
  }
  return (
    <Grid minH={'90vh'} templateColumns={['1fr', '3fr 1fr']} m={'50px'}>
      {lectures && lectures.length > 0 ? (
        <>
          <Box>
            <video
              width={'100%'}
              controls
              controlsList="nodownload noremoteplayback"
              disablePictureInPicture
              disableRemotePlayback
              src={lectures[lectureNumber].video.url}
            ></video>
            <Heading>{`${lectureNumber + 1}. ${
              lectures[lectureNumber].title
            }`}</Heading>
            {/* <Heading m={'4'}>Description</Heading> */}
            <Text
              m={'4'}
              textAlign={'left'}
            >{`Description : ${lectures[lectureNumber].description}`}</Text>
          </Box>
          <VStack>
            {lectures.map((ele, i) => (
              <button
                key={ele._id}
                style={{
                  width: '100%',
                  padding: '1rem',
                  textAlign: 'center',
                  margin: 0,
                  borderBottom: '1px solid rgba(0,0,0,0.2)',
                }}
                onClick={() => setLectureNumber(i)}
              >
                <Text>
                  {i + 1}. {ele.title}
                </Text>
              </button>
            ))}
          </VStack>
        </>
      ) : (
        <Container
          h="100vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Heading>No lectures Added</Heading>
        </Container>
      )}
    </Grid>
  );
}
