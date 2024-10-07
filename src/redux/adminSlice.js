import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../config/axios';

// export const createCourse = createAsyncThunk(
//   'courses/createCourse',
//   async (formData, { rejectWithValue }) => {
//     // console.log(formData.keyword, formData.category);
//     try {
//       const response = await axios.post('/api/v1/createcourse', formData, {
//         headers: { Authorization: localStorage.getItem('token') },
//       });
//       console.log(response.data);
//       return response.data;
//     } catch (err) {
//       console.log(err.response.data);
//       return rejectWithValue({
//         error: err.response.data,
//       });
//     }
//   }
// );

export const deleteCourseByadmin = createAsyncThunk(
  'courses/deleteCourseByadmin',
  async (formData, { rejectWithValue }) => {
    // console.log(formData.keyword, formData.category);
    try {
      const response = await axios.delete('/api/v1/course/' + formData.id, {
        headers: { Authorization: localStorage.getItem('token') },
      });
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue({
        error: err.response.data,
      });
    }
  }
);

export const getAllUsers = createAsyncThunk('courses/getAllUsers', async () => {
  // console.log(formData.keyword, formData.category);
  try {
    const response = await axios.get('/admin/users', {
      headers: { Authorization: localStorage.getItem('token') },
    });
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err.response.data);
    // return rejectWithValue({
    //   error: err.response.data,
    // });
  }
});

export const deleteLectureByadmin = createAsyncThunk(
  'courses/deleteLectureByadmin',
  async (formData, { rejectWithValue }) => {
    // console.log(formData.keyword, formData.category);
    try {
      const response = await axios.delete(
        `/api/v1/deletelecture?courseId=${formData.courseId}&lectureId=${formData.lectureId}`,
        {
          headers: { Authorization: localStorage.getItem('token') },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue({
        error: err.response.data,
      });
    }
  }
);

export const getAdminStats = createAsyncThunk(
  'courses/getAdminStats',
  async () => {
    // console.log(formData.keyword, formData.category);
    try {
      const response = await axios.get('/api/v1/admin/stats', {
        headers: { Authorization: localStorage.getItem('token') },
      });
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err.response.data);
      // return rejectWithValue({
      //   error: err.response.data,
      // });
    }
  }
);

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (formData, { rejectWithValue }) => {
    // console.log(formData.keyword, formData.category);
    try {
      const response = await axios.delete('/admin/user/' + formData.id, {
        headers: { Authorization: localStorage.getItem('token') },
      });
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue({
        error: err.response.data,
      });
    }
  }
);

export const approveInstructor = createAsyncThunk(
  'user/approveInstructor',
  async (formData, { rejectWithValue }) => {
    // console.log(formData.keyword, formData.category);
    try {
      const response = await axios.put('/admin/approveInstructor', formData, {
        headers: { Authorization: localStorage.getItem('token') },
      });
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue({
        error: err.response.data,
      });
    }
  }
);

const adminSlice = createSlice({
  name: 'courses',
  initialState: {
    loading: false,
    error: null,
    message: null,
    users: [],
    usersCount: 0,
    subscriptionCount: 0,
    viewsCount: 0,
  },
  reducers: {
    clearError: state => {
      state.error = null;
    },
    clearMessage: state => {
      state.message = null;
    },
  },
  extraReducers: builder => {
    // builder.addCase(createCourse.pending, (state, action) => {
    //   state.loading = true;
    // });
    // builder.addCase(createCourse.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.message = action.payload.message;
    // });
    // builder.addCase(createCourse.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload.error.message;
    // });
    builder.addCase(deleteCourseByadmin.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteCourseByadmin.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    });
    builder.addCase(deleteCourseByadmin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.error.message;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.error.message;
    });
    builder.addCase(getAllUsers.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });

    builder.addCase(deleteLectureByadmin.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteLectureByadmin.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    });
    builder.addCase(deleteLectureByadmin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.error.message;
    });
    builder.addCase(deleteUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.error.message;
    });
    builder.addCase(approveInstructor.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(approveInstructor.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    });
    builder.addCase(approveInstructor.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.error.message;
    });
    builder.addCase(getAdminStats.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAdminStats.fulfilled, (state, action) => {
      state.loading = false;
      state.usersCount = action.payload.usersCount;
      state.subscriptionCount = action.payload.subscriptionCount;
      state.viewsCount = action.payload.viewsCount;
    });
    builder.addCase(getAdminStats.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.error.message;
    });
  },
});

export const { clearError, clearMessage } = adminSlice.actions;

export default adminSlice.reducer;
