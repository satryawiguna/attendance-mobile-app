const BASE_URL = 'https://app.attendance.smartbiz.id/api';
// const BASE_URL = 'http://192.168.100.9:321/api';
// const BASE_URL = 'http://192.168.100.7:8080/api';

export const AUTH_API = {
  LOGIN: `${BASE_URL}/login`,
  FORGOT_PASSWORD: `${BASE_URL}/forgot-password`,
  REGISTER_STAFF: `${BASE_URL}/register-staff`,
  SUBMIT_OTP: `${BASE_URL}/submit-otp`,
  GET_STAFF: `${BASE_URL}/get-staff`,
};

export const DASHBOARD_API = {
  ATTENDANCE_SUMMARY: `${BASE_URL}/attendance/summary`,
  GET_PROFILE: `${BASE_URL}/profile`,
  GET_SETTING: `${BASE_URL}/company-feature-setting`,
  GET_RECORD: `${BASE_URL}/attendance/category`,
  CHECKIN: `${BASE_URL}/attendance/checkin`,
  CHECKOUT: `${BASE_URL}/attendance/checkout`,
  GET_ATTEDANCE_CURRENT: `${BASE_URL}/attendance/current`,
  GET_PROJECT_LIST: `${BASE_URL}/master/project-list`,
  UPDATE_PROFILE: `${BASE_URL}/profile/update`,
  FACE_VERIFICATION: `${BASE_URL}/attendance/face-verify`,
};

export const PROFILE_API = {
  GET_STATE: `${BASE_URL}/state-list`,
  GET_CITY: `${BASE_URL}/city-list`,
  GET_COUNTRY: `${BASE_URL}/country-list`,
  GET_TNC: `${BASE_URL}/tnc`,
  GET_FAQ: `${BASE_URL}/faq`,
}

export const OTHER_API = {
  GET_COMPANY: `${BASE_URL}/company-list`,
}