import {
  Container,
  Heading,
  Textarea,
  VStack,
  Input,
  Box,
  FormLabel,
  Button,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from '../../config/axios';
import toast from 'react-hot-toast';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';

export default function RequestCourse() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');
  // const validationSchema = Yup.object({
  //   name: Yup.string().min(6, 'name too short').required('Required'),
  //   email: Yup.string().email('Invalid email format').required('Required'),
  //   course: Yup.string()
  //     .min(6, 'course description too short')
  //     .required('Required'),
  // });
  const handleFormSubmit = async e => {
    e.preventDefault();
    const formData = {
      name,
      email,
      course,
    };
    try {
      const response = await axios.post('/api/v1/courseRequest', formData);
      console.log(response);
      toast.success('Course request sent successfully');
      setName('');
      setEmail('');
      setCourse('');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container h="92vh">
      <VStack h={'full'} justifyContent={'center'} spacing={'16'}>
        <Heading>Request New course</Heading>
        <form style={{ width: '100%' }} onSubmit={handleFormSubmit}>
          <Box>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              required
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="abc"
            ></Input>
          </Box>
          <Box>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              required
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="email"
            ></Input>
          </Box>
          <Box>
            <FormLabel htmlFor="course">Course</FormLabel>
            <Textarea
              required
              id="course"
              value={course}
              onChange={e => setCourse(e.target.value)}
              placeholder="Explain the course..."
            ></Textarea>
          </Box>
          <Button type="submit" my="4" colorScheme="blue">
            Submit
          </Button>
          <Box my="4">
            See available courses...!{' '}
            <Link to="/courses">
              <Button colorScheme={'blue'} variant="link">
                Click here
              </Button>{' '}
            </Link>
          </Box>
        </form>
      </VStack>
    </Container>
    // <div style={{ marginTop: '100px' }}>
    //   <Formik
    //     initialValues={{ name: '', email: '', course: '' }}
    //     validationSchema={validationSchema} // Using Yup schema for validation
    //     onSubmit={values => {
    //       console.log(values);
    //     }}
    //   >
    //     {({ isSubmitting }) => (
    //       <Form>
    //         <div>
    //           <label>name</label>
    //           <Field type="text" name="name" />
    //           <ErrorMessage name="name" component="div" />
    //         </div>
    //         <div>
    //           <label>Email</label>
    //           <Field type="email" name="email" />
    //           <ErrorMessage name="email" component="div" />
    //         </div>
    //         <div>
    //           <label>Password</label>
    //           <Field type="text" name="course" />
    //           <ErrorMessage name="course" component="div" />
    //         </div>
    //         <button type="submit" disabled={isSubmitting}>
    //           Submit
    //         </button>
    //       </Form>
    //     )}
    //   </Formik>
    // </div>
  );
}
