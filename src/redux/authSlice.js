import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {AUTH_API} from '../consts/api';

export const loginAction = createAsyncThunk(
  'auth/loginAction',
  async ({username, password, isRememberMe, onFailed}) => {
    try {
      const data = await axios.post(AUTH_API.LOGIN, {
        username,
        password,
        device_id: 'qwertyuiop',
      });
      return {
        token: data.data.data.access_token,
        username: isRememberMe ? username : '',
        password: isRememberMe ? password : '',
        rememberMe: isRememberMe,
      };
    } catch (err) {
      if (__DEV__) {
        console.log('err', err.response);
      }
      onFailed(err.response.data.message);
      throw new Error(err);
    }
  },
);

export const forgotPasswordAction = createAsyncThunk(
  'auth/forgotPasswordAction',
  async ({email, onSuccess, onFailed}) => {
    try {
      await axios.post(AUTH_API.FORGOT_PASSWORD, {email});
      onSuccess();
    } catch (err) {
      onFailed();
      throw new Error(err);
    }
  },
);

export const registerAction = createAsyncThunk(
  'auth/registerAction',
  async ({
    email,
    username,
    password,
    confirm_password,
    device_id,
    full_name,
    nick_name,
    phone,
    gender,
    nip,
    company_id,
    photo,
    birth_date,
    religion_id,
    onSuccess,
    onFailed,
  }) => {
    const createFormData = (photo, body) => {
      const data = new FormData();
      if (photo) {
        data.append('foto_wajah', {
          name: photo.fileName,
          uri:
            Platform.OS === 'android'
              ? photo.uri
              : photo.uri.replace('file://', ''),
          type: photo.type,
        });
      }

      Object.keys(body).forEach(key => {
        data.append(key, body[key]);
      });

      return data;
    };

    const data = createFormData(photo, {
      email,
      username,
      password,
      confirm_password,
      device_id: 'qwertyuiop',
      gender,
      full_name,
      nick_name,
      phone,
      nip,
      company_id,
      birth_date,
      religion_id,
    });

    console.log('data', data);

    try {
      await axios.post(AUTH_API.REGISTER_STAFF, data);
      onSuccess();
    } catch (err) {
      if (__DEV__) {
        console.log('err register', err.response);
      }
      if (err.response.data.errors) {
        if (err.response.data.errors.email) {
          onFailed(err.response.data.errors.email[0]);
          throw new Error(err);
        }

        if (err.response.data.errors.phone) {
          onFailed(err.response.data.errors.phone[0]);
          throw new Error(err);
        }

        if (err.response.data.errors.username) {
          onFailed(err.response.data.errors.username[0]);
          throw new Error(err);
        }
      }

      onFailed(err.response.data.message);
      throw new Error(err);
    }
  },
);

export const submitOtpAction = createAsyncThunk(
  'auth/submitOtpAction',
  async ({email, otp, onSuccess, onFailed}) => {
    try {
      await axios.post(AUTH_API.SUBMIT_OTP, {email, otp});
      onSuccess();
    } catch (err) {
      if (__DEV__) {
        console.log('err', err.response);
      }
      onFailed(err.response.data.message);
      throw new Error(err);
    }
  },
);

export const loginSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    login: false,
    landing: true,
    rememberMeData: {
      remember: false,
      username: '',
      password: '',
    },
    user: {
      name: '',
      mobile: '',
      token: '',
    },
    error: null,
  },
  reducers: {
    loginAction: state => {
      state.login = true;
    },
    logoutAction: state => {
      state.login = false;
    },
    landingAction: state => {
      state.landing = false;
    },
  },
  extraReducers: {
    //Login
    [loginAction.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [loginAction.fulfilled]: (state, action) => {
      state.user.token = action.payload.token;
      state.rememberMeData = {
        username: action.payload.username,
        password: action.payload.password,
        remember: action.payload.rememberMe,
      };
      state.login = true;
      state.loading = false;
    },
    [loginAction.rejected]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    //Forgot Password
    [forgotPasswordAction.pending]: (state, action) => {
      state.loading = true;
    },
    [forgotPasswordAction.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [forgotPasswordAction.rejected]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    //Register
    [registerAction.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [registerAction.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [registerAction.rejected]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    //OTP
    [submitOtpAction.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [submitOtpAction.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [submitOtpAction.rejected]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const {logoutAction, landingAction} = loginSlice.actions;

export default loginSlice.reducer;
