import {combineReducers} from 'redux';
import auth from '../redux/authSlice';
import profile from '../redux/profileSlice';
import dashboard from '../redux/dashboardSlice';

export default combineReducers({
  auth,
  profile,
  dashboard,
});
