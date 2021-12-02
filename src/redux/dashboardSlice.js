import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import dayjs from 'dayjs';
import {DASHBOARD_API} from '../consts/api';

export const checkInAction = createAsyncThunk(
  'dashboard/checkInAction',
  async ({onSuccess, onFailed}, {getState}) => {
    try {
      const data = {
        type: getState().dashboard.absentType,
        description: '-',
        longitude: getState().dashboard.postition.lng,
        latitude: getState().dashboard.postition.lat,
        temperature: 36,
        absent_category_id:
          getState().dashboard.absentCategoryId === 0 ||
          getState().dashboard.absentCategoryId === -1
            ? ''
            : getState().dashboard.absentCategoryId,
      };

      await axios.post(DASHBOARD_API.CHECKIN, data, {
        headers: {
          Authorization: `Bearer ${getState().auth.user.token}`,
        },
      });
      onSuccess();
    } catch (err) {
      console.log(err.response);
      onFailed();
      throw new Error(err);
    }
  },
);

export const checkOutAction = createAsyncThunk(
  'dashboard/checkOutAction',
  async ({onSuccess, onFailed}, {getState}) => {
    try {
      const data = {
        date: dayjs().format('YYYY-MM-DD'),
      };

      await axios.post(DASHBOARD_API.CHECKOUT, data, {
        headers: {
          Authorization: `Bearer ${getState().auth.user.token}`,
        },
      });
      onSuccess();
    } catch (err) {
      onFailed();
      throw new Error(err);
    }
  },
);

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    loading: false,
    shiftStart: false,
    absentCategoryId: 0,
    absentType: 'present',
    postition: {
      lat: 0,
      lng: 0,
    },
    error: null,
    time: 0,
    startShiftTime: null,
  },
  reducers: {
    shiftStartAction: state => {
      state.shiftStart = !state.shiftStart;
    },
    setAbsentCategoryIdAction: (state, {payload}) => {
      state.absentCategoryId = payload.categoryId;
      state.absentType = payload.absentType;
    },
    setGeoLocationAction: (state, {payload}) => {
      state.postition = {
        lat: payload.lat,
        lng: payload.lng,
      };
    },
    setTimeAction: (state, {payload}) => {
      state.time = payload;
    },
  },
  extraReducers: {
    [checkInAction.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [checkInAction.fulfilled]: (state, action) => {
      state.loading = false;
      state.startShiftTime = new Date();
    },
    [checkInAction.rejected]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [checkOutAction.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [checkOutAction.fulfilled]: (state, action) => {
      state.loading = false;
      state.startShiftTime = null;
    },
    [checkOutAction.rejected]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const {
  shiftStartAction,
  setAbsentCategoryIdAction,
  setGeoLocationAction,
  setTimeAction,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
