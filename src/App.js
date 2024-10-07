import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Layout/Header';
import Courses from './components/Courses/Courses';
import Footer from './components/Layout/Footer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ForgetPassword from './components/Auth/ForgetPassword';
import ResetPassword from './components/Auth/ResetPassword';
import Contact from './components/Contact/Contact';
import RequestCourse from './components/RequestCourse/RequestCourse';
import About from './components/About/About';
import Subscribe from './components/payments/Subscribe';
import PaymentSuccess from './components/payments/PaymentSuccess';
import PaymentFail from './components/payments/PaymentFail';
import NotFound from './components/Layout/NotFound';
import CoursePage from './components/CoursePage/CoursePage';
import Profile from './components/Profile/Profile';
import ChangePassword from './components/Profile/ChangePassword';
import UpdateProfile from './components/Profile/UpdateProfile';
import Dashboard from './components/Admin/DashBoard/Dashboard';
// import CreateCourse from './components/Admin/CreateCourse/CreateCourse';

// import CoursesAdmin from './components/Admin/CousesAdmin/AdminCourses';
import AdminCourses from './components/Admin/CousesAdmin/AdminCourses';
import Users from './components/Admin/Users/Users';
import { useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { clearError, clearMessage, getMyProfile } from './redux/usersSlice';
import PrivateRoute from './components/PrivateRoute';
import Forbidden from './components/Forbidden';
import AuthorizeRoute from './components/AuthorizeRoute';
import Loader from './components/Layout/Loader';
import InstructorDashboard from './components/Instructer/InstructorDashboard';
import InstructorCreateCourse from './components/Instructer/InstructorCreateCourse';
import InstructorCourses from './components/Instructer/InstructorCourse';
import RequestedCourse from './components/RequestedCourses';
import NotApproved from './components/NotApproved';
import ApproveInstructor from './components/Admin/ApproveInstrctor/ApproveInstructor';
// import { redirect } from 'react-router-dom';

function App() {
  // window.addEventListener('contextmenu', e => {
  //   e.preventDefault();
  // });

  const { isAuthenticated, user, message, error, loading } = useSelector(
    state => state.user
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (message) {
      console.log('inside app useEffect');
      toast.success(message);
      dispatch(clearMessage());
    }
  }, [dispatch, error, message]);

  useEffect(() => {
    dispatch(getMyProfile());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header isAuthenticated={isAuthenticated} user={user} />
          <Routes>
            {/* normal routes */}
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route
              path="/course/:id"
              element={
                <PrivateRoute>
                  <CoursePage user={user} />
                </PrivateRoute>
              }
            />
            <Route path="/about" element={<About />} />
            <Route
              path="/login"
              element={
                // <PrivateRoute

                // >
                <Login />
                // </PrivateRoute>
              }
            />
            <Route path="/register" element={<Register />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <Profile user={user}/>
                </PrivateRoute>
              }
            />
            <Route
              path="/changepassword"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <ChangePassword />
                </PrivateRoute>
              }
            />
            <Route
              path="/updateprofie"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <UpdateProfile />
                </PrivateRoute>
              }
            />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/requestcourse" element={<RequestCourse />} />
            <Route
              path="/subscribe"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <Subscribe user={user} />
                </PrivateRoute>
              }
            />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payment-fail" element={<PaymentFail />} />
            <Route path="*" element={<NotFound />} />
            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <AuthorizeRoute permittedRoles={['admin']}>
                    <Dashboard />
                  </AuthorizeRoute>
                </PrivateRoute>
              }
            />
            <Route
              path="/instructor/dashboard"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <AuthorizeRoute permittedRoles={['instructor']}>
                    <InstructorDashboard />
                  </AuthorizeRoute>
                </PrivateRoute>
              }
            />
            {/* <Route
              path="/admin/createcourse"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <AuthorizeRoute permittedRoles={['admin']}>
                    <CreateCourse />
                  </AuthorizeRoute>
                </PrivateRoute>
              }
            /> */}
            <Route
              path="/instructor/createcourse"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <AuthorizeRoute permittedRoles={['instructor']}>
                    <InstructorCreateCourse />
                  </AuthorizeRoute>
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/coursesadmin"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <AuthorizeRoute permittedRoles={['admin']}>
                    <AdminCourses />
                  </AuthorizeRoute>
                </PrivateRoute>
              }
            />
            <Route
              path="/instructor/courses"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <AuthorizeRoute permittedRoles={['instructor']}>
                    <InstructorCourses />
                  </AuthorizeRoute>
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <AuthorizeRoute permittedRoles={['admin']}>
                    <Users />
                  </AuthorizeRoute>
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/approveinstructor"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <AuthorizeRoute permittedRoles={['admin']}>
                    <ApproveInstructor />
                  </AuthorizeRoute>
                </PrivateRoute>
              }
            />
            <Route path="/forbidden" element={<Forbidden />} />
            <Route
              path="/admin/requestCourses"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <AuthorizeRoute permittedRoles={['admin']}>
                    <RequestedCourse />
                  </AuthorizeRoute>
                </PrivateRoute>
              }
            />

            <Route
              path="/instructor/requestCourses"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <AuthorizeRoute permittedRoles={['instructor']}>
                    <RequestedCourse />
                  </AuthorizeRoute>
                </PrivateRoute>
              }
            />
            <Route path="/not-approved" element={<NotApproved />} />
          </Routes>

          <Footer />
          <Toaster />
        </>
      )}
    </>
  );
}

export default App;
