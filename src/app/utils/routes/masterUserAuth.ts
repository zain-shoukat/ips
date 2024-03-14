import { API_ROUTE, MS_BASE_PATH } from './base.js';
const BASE = MS_BASE_PATH + API_ROUTE + '/auth';

const SIGN_UP = 'sign-up';

const SIGN_IN = 'sign-in';

const OTP_VERIFY = 'otp/verify';

const OTP_RESEND = 'otp/resend';

const FORGOT_PASSWORD = 'forgot-password';

const UPDATE_PASSWORD = 'update-password';

export {
  BASE,
  SIGN_UP,
  SIGN_IN,
  FORGOT_PASSWORD,
  UPDATE_PASSWORD,
  OTP_VERIFY,
  OTP_RESEND
};
