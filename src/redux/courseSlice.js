import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../config/axios';

export const getAllCourses = createAsyncThunk(
  'courses/getAllCourses',
  async formData => {
    console.log("getting called")
    console.log(formData.keyword, formData.category);
    try {
      const response = await axios.get(
        `/api/v1/getallcourses?keyword=${formData.keyword}&category=${formData.category}`
      );
      console.log(response.data)
      return response.data;
    } catch (err) {
      console.log(err.response.data);
    }
  }
);
export const addToMyLearning = createAsyncThunk(
  'courses/addToMyLearning',
  async (formData, { rejectWithValue }) => {
    // console.log(formData.keyword, formData.category);
    try {
      const response = await axios.post(
        '/api/v1/add-to-my-learning',
        formData,
        {
          headers: { Authorization: localStorage.getItem('token') },
        }
      );
      console.log(response);
      return response.data;
    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue({
        error: err.response.data,
      });
    }
  }
);

export const getCourseLectures = createAsyncThunk(
  'courses/getCourseLectures',
  async (formData, { rejectWithValue }) => {
    // console.log(formData.keyword, formData.category);
    try {
      const response = await axios.get('/api/v1/course/' + formData.id, {
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


const courseSlice = createSlice({
  name: 'courses',
  initialState: {
    loading: false,
    courses: [],
    error: null,
    message: null,
    lectures: [],
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
    builder.addCase(getAllCourses.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllCourses.fulfilled, (state, action) => {
      state.loading = false;
      state.courses = action.payload;
    });
    builder.addCase(getAllCourses.rejected, (state, action) => {
      state.loading = false;
      // state.error = action.payload.error.message;
    });
    builder.addCase(addToMyLearning.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addToMyLearning.fulfilled, (state, action) => {
      console.log('inside fullfill');
      state.loading = false;
      state.message = action.payload.message;
    });
    builder.addCase(addToMyLearning.rejected, (state, action) => {
      console.log('inside reject');
      state.loading = false;
      state.error = action.payload.error.message;
    });
    builder.addCase(getCourseLectures.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getCourseLectures.fulfilled, (state, action) => {
      console.log('inside fullfill');
      state.loading = false;
      state.lectures = action.payload.lectures;
    });
    builder.addCase(getCourseLectures.rejected, (state, action) => {
      console.log('inside reject');
      state.loading = false;
      state.error = action.payload.error.message;
    });
    
  },
});

export const { clearError, clearMessage } = courseSlice.actions;

export default courseSlice.reducer;
