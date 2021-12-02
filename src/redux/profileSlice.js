import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {AUTH_API, DASHBOARD_API} from '../consts/api';
import {createFormData} from '../utils/utils';

export const getProjectAction = createAsyncThunk(
  'profile/getProjectAction',
  async ({onSuccess}, {getState}) => {
    try {
      const res = await axios.get(DASHBOARD_API.GET_PROJECT_LIST, {
        headers: {
          Authorization: `Bearer ${getState().auth.user.token}`,
        },
      });

      const {data} = res;
      onSuccess(data.return);
      return data.return;
    } catch (err) {
      throw new Error(err);
    }
  },
);

export const getProfileAction = createAsyncThunk(
  'profile/getProfileAction',
  async (_, {getState}) => {
    try {
      const res = await axios.get(DASHBOARD_API.GET_PROFILE, {
        headers: {
          Authorization: `Bearer ${getState().auth.user.token}`,
        },
      });

      const {data} = res;

      console.log('get profile', data);

      return {
        userOffice: data.return.user_office,
        userProfile: data.return.user_profile,
        userEmployee: data.return.user_employee,
      };
    } catch (err) {
      throw new Error(err);
    }
  },
);

export const getEmployeeAction = createAsyncThunk(
  'employee/getEmployeeAction',
  async ({unique_code, onSuccess, onFailed}, {getState}) => {
    try {
      const res = await axios.post(AUTH_API.GET_STAFF, {
        unique_code,
      });
      const {data} = res;

      onSuccess(data.return);
      return {
        userEmployee: data.return,
      };
    } catch (err) {
      onFailed();
      throw new Error(err);
    }
  },
);

export const updateProfileAction = createAsyncThunk(
  'profile/postProfileAction',
  async (
    {
      password,
      gender,
      fullName,
      nickName,
      phone,
      countryId,
      stateId,
      cityId,
      address,
      postcode,
      religionId,
      birthDate,
      photo,
      onSuccess,
      onFailed,
    },
    {getState},
  ) => {
    try {
      const data = createFormData(photo, {
        password,
        confirm_password: password,
        gender,
        full_name: fullName,
        nick_name: nickName,
        phone,
        country_id: countryId,
        state_id: stateId,
        city_id: cityId,
        address,
        postcode,
        religion_id: religionId,
        birth_date: birthDate,
      });

      await axios.post(DASHBOARD_API.UPDATE_PROFILE, data, {
        headers: {
          Authorization: `Bearer ${getState().auth.user.token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      onSuccess();
    } catch (err) {
      console.log('err', err);
      console.log('err response', err.response);
      onFailed();
      throw new Error(err);
    }
  },
);

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    loading: false,
    userProfile: null,
    userOffice: null,
    userEmployee: null,
    project: [],
    projectSelected: '',
    error: null,
  },
  reducers: {
    selectProjectAction: (state, action) => {
      state.projectSelected = action.payload;
    },
  },
  extraReducers: {
    [getProfileAction.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [getProfileAction.fulfilled]: (state, action) => {
      state.userProfile = action.payload.userProfile;
      state.userOffice = action.payload.userOffice;
      state.userEmployee = action.payload.userEmployee;
      state.loading = false;
    },
    [getProfileAction.rejected]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [getProjectAction.pending]: (state, action) => {
      state.error = null;
    },
    [getProjectAction.fulfilled]: (state, action) => {
      state.loading = false;
      state.project = action.payload;
    },
    [getProjectAction.rejected]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [updateProfileAction.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [updateProfileAction.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    [updateProfileAction.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [getEmployeeAction.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [getEmployeeAction.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.userEmployee = action.payload.userEmployee;
    },
    [getEmployeeAction.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const {selectProjectAction} = profileSlice.actions;

export default profileSlice.reducer;
