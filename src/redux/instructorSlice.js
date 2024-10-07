import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../config/axios';

export const createCourse = createAsyncThunk(
  'courses/createCourse',
  async (formData, { rejectWithValue }) => {
    // console.log(formData.keyword, formData.category);
    try {
      const response = await axios.post('/api/v1/createcourse', formData, {
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

export const getInstructorCourse = createAsyncThunk(
  'courses/getInstructorCourse',
  async () => {
    console.log('getting called');
    // console.log(formData.keyword, formData.category);
    try {
      const response = await axios.get('/api/v1/instructorCourse', {
        headers: { Authorization: localStorage.getItem('token') },
      });
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err.response.data);
    }
  }
);
export const deleteCourseByInstructor = createAsyncThunk(
  'courses/deleteCourseByInstructor',
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

export const deleteLectureByInstructer = createAsyncThunk(
  'courses/deleteLectureByInstructer',
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

export const editLectureByInstructer = createAsyncThunk(
  'courses/editLectureByInstructer',
  async (formData, { rejectWithValue }) => {
    // console.log(formData.keyword, formData.category);
    try {
      const response = await axios.put(
        `/api/v1/editlecture?courseId=${formData.get(
          'id'
        )}&lectureId=${formData.get('lectureId')}`,
        formData,
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

export const addLecture = createAsyncThunk(
  'courses/addLecture',
  async (formData, { rejectWithValue }) => {
    console.log(formData);
    // console.log(formData.keyword, formData.category);
    try {
      const response = await axios.post(
        '/api/v1/course/' + formData.get('id'),
        formData,
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
const instructorSlice = createSlice({
  name: 'courses',
  initialState: {
    loading: false,
    error: null,
    message: null,
    users: [],
    courses: [],
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
    builder.addCase(createCourse.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createCourse.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    });
    builder.addCase(createCourse.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.error.message;
    });
    builder.addCase(getInstructorCourse.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getInstructorCourse.fulfilled, (state, action) => {
      state.loading = false;
      state.courses = action.payload;
    });
    builder.addCase(getInstructorCourse.rejected, (state, action) => {
      state.loading = false;
      // state.error = action.payload.error.message;
    });
    builder.addCase(deleteCourseByInstructor.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteCourseByInstructor.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    });
    builder.addCase(deleteCourseByInstructor.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.error.message;
    });

    builder.addCase(addLecture.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addLecture.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    });
    builder.addCase(addLecture.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.error.message;
    });
    builder.addCase(deleteLectureByInstructer.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteLectureByInstructer.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    });
    builder.addCase(deleteLectureByInstructer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.error.message;
    });
    builder.addCase(editLectureByInstructer.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(editLectureByInstructer.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    });
    builder.addCase(editLectureByInstructer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.error.message;
    });
  },
});

export const { clearError, clearMessage } = instructorSlice.actions;

export default instructorSlice.reducer;
