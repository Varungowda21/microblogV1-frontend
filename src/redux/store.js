import { configureStore } from '@reduxjs/toolkit';
// import { userReducer } from './reducers/userReducer'
import userReducer from './usersSlice';
import couresReducer from './courseSlice';
import adminReducer from './adminSlice';
import instructorSlice from './instructorSlice';

const store = configureStore({
  // reducer:{
  //   user:userReducer
  // }
  reducer: {
    user: userReducer,
    course: couresReducer,
    admin: adminReducer,
    instructor: instructorSlice,
  },
});

export default store;
