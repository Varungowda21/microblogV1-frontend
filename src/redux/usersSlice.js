import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../config/axios';

export const fetchLoginInfo = createAsyncThunk(
  'users/fetchLoginInfo',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // console.log('i f p');
      // console.log(email, password);
      const response = await axios.post('/api/v1/login', { email, password });
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue({
        error: err.response.data,
      });
    }
  }
);
export const register = createAsyncThunk(
  'users/register',
  async (formData, { rejectWithValue }) => {
    try {
      // console.log('i f p');
      // console.log(email, password);
      const response = await axios.post('/api/v1/register', formData);
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue({
        error: err.response.data,
      });
    }
  }
);

export const getMyProfile = createAsyncThunk('users/getMyProfile', async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token is required');
    }
    // console.log('inside my profile');
    const response = await axios.get('/api/v1/profile', {
      headers: { Authorization: localStorage.getItem('token') },
    });
    // console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err.response.data);
    // return rejectWithValue({
    //   error: err.response.data,
    // });
    // return rejectWithValue({
    //   error: err.response ? err.response.data : err.message,
    // });
  }
});

export const updateProfile = createAsyncThunk(
  'users/updateProfile',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.put('/api/v1/updateprofile', formData, {
        headers: { Authorization: localStorage.getItem('token') },
      });
      return response.data;
    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue({
        error: err.response.data,
      });
    }
  }
);

export const changePassword = createAsyncThunk(
  'users/changePassword',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.put('/api/v1/changepassword', formData, {
        headers: { Authorization: localStorage.getItem('token') },
      });
      return response.data;
    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue({
        error: err.response.data,
      });
    }
  }
);
export const updateProfilePic = createAsyncThunk(
  'users/updateProfilePic',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.put('/api/v1/updateprofilepic', formData, {
        headers: { Authorization: localStorage.getItem('token') },
      });
      return response.data;
    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue({
        error: err.response.data,
      });
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'users/forgotPassword',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/v1/forgot-password', formData);
      return response.data;
    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue({
        error: err.response.data,
      });
    }
  }
);
export const resetPassword = createAsyncThunk(
  'users/resetPassword',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        '/api/v1/reset-password/' + formData.token,
        formData
      );
      return response.data;
    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue({
        error: err.response.data,
      });
    }
  }
);

export const removeFromMyLearning = createAsyncThunk(
  'users/removeFromMyLearning',
  async formData => {
    // console.log(formData.keyword, formData.category);
    try {
      const response = await axios.delete(
        '/api/v1/delete-from-learning?id=' + formData.id,
        {
          headers: { Authorization: localStorage.getItem('token') },
        }
      );
      return response.data;
    } catch (err) {
      console.log(err.response.data);
    }
  }
);

export const buySubscription = createAsyncThunk(
  'users/buySubscription',
  async () => {
    console.log('i b sub');
    try {
      console.log('i s p');
      // console.log(email, password);
      const response = await axios.get('/api/v1/subscribe', {
        headers: { Authorization: localStorage.getItem('token') },
      });
      console.log(response.data);
      return response.data.subscriptionId;
    } catch (err) {
      console.log(err.response.data);
      // return rejectWithValue({
      //   error: err.response.data,
      // });
    }
  }
);

export const cancelSubscription = createAsyncThunk(
  'users/cancelSubscription',
  async () => {
    console.log('i c sub');
    try {
      console.log('i  c ');
      // console.log(email, password);
      const response = await axios.delete('/api/v1/subscribe/cancel', {
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

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    loading: false,
    isAuthenticated: false,
    user: null,
    error: null,
    message: null,
    subscriptionId: null,
  },

  reducers: {
    clearError: state => {
      state.error = null;
    },
    clearMessage: state => {
      state.message = null;
    },
    logOut: state => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      state.message = null;
      state.subscriptionId = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchLoginInfo.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchLoginInfo.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
    });
    builder.addCase(fetchLoginInfo.rejected, (state, action) => {
      // console.log('inside reject');
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload.error.message;
    });
    builder.addCase(getMyProfile.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getMyProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    });
    builder.addCase(getMyProfile.rejected, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    });
    builder.addCase(register.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload.error.message;
    });
    builder.addCase(updateProfile.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.message = action.payload.message;
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.error.message;
    });
    builder.addCase(changePassword.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(changePassword.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.message = action.payload.message;
    });
    builder.addCase(changePassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.error.message;
    });
    builder.addCase(updateProfilePic.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateProfilePic.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.message = action.payload.message;
    });
    builder.addCase(updateProfilePic.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.error.message;
    });
    builder.addCase(forgotPassword.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.error.message;
    });
    builder.addCase(resetPassword.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.error.message;
    });
    builder.addCase(removeFromMyLearning.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(removeFromMyLearning.fulfilled, (state, action) => {
      console.log('i f');
      state.loading = false;
      state.message = action.payload.message;
    });
    builder.addCase(removeFromMyLearning.rejected, (state, action) => {
      console.log('i r');
      state.loading = false;
      state.error = action.payload.error.message;
    });
    builder.addCase(buySubscription.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(buySubscription.fulfilled, (state, action) => {
      state.loading = false;
      state.subscriptionId = action.payload;
    });
    builder.addCase(buySubscription.rejected, (state, action) => {
      state.loading = false;
      // state.error = action.payload.error.message;
    });

    builder.addCase(cancelSubscription.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(cancelSubscription.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message
    });
    builder.addCase(cancelSubscription.rejected, (state, action) => {
      state.loading = false;
      // state.error = action.payload.error.message;
    });
  },
});

export const { clearError, clearMessage, logOut } = usersSlice.actions;

export default usersSlice.reducer;
