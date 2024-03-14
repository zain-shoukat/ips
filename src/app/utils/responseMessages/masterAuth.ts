import { StatusCodes } from 'http-status-codes';

export const PASSWORD_VALIDATION_FAILED = Object.freeze({
  message:
    'Password is not acceptable. Please choose a stronger or longer password.',
  code: StatusCodes.NOT_ACCEPTABLE,
});

export const PASSWORD_CONFIRMED_FAILURE = Object.freeze({
  message:
    'Password and confirm password do not match. Please make sure they are the same.',
  code: StatusCodes.NOT_ACCEPTABLE,
});

export const SIGN_UP_FAILURE = Object.freeze({
  message:
    'Sign-up failure. Unable to create a new user account.',
  code: StatusCodes.NOT_ACCEPTABLE,
});

export const SIGN_IN_FAILURE = Object.freeze({
  message:
    'Sign-in failure. Unable to sign in due to some reason.',
  code: StatusCodes.NOT_ACCEPTABLE,
});

export const GENERAL_FAILURE = Object.freeze({
  message:
    'Something went wrong, or a comet hit our planet!',
  code: StatusCodes.NOT_ACCEPTABLE,
});

export const USER_EXISTED = Object.freeze({
  message:
    'User already exists. Choose a different email address.',
  code: StatusCodes.CONFLICT,
});

export const INVALID_CREDS = Object.freeze({
  message:
    'Invalid email or password. Please check your credentials and try again.',
  code: StatusCodes.UNAUTHORIZED,
});

export const INVALID_OTP = Object.freeze({
  message: 'Invalid otp. Please try again.',
  code: StatusCodes.UNAUTHORIZED,
});

export const INVALID_USER = Object.freeze({
  message: 'Invalid user or user not found.',
  code: StatusCodes.BAD_REQUEST,
});

export const SIGN_UP_SUCCESS = Object.freeze({
  message: 'SIGN_UP_SUCCESS',
  code: StatusCodes.OK,
});

export const PASSWORD_VALID = Object.freeze({
  message: 'password validated.',
  code: StatusCodes.OK,
});

export const SIGN_IN_SUCCESS = Object.freeze({
  message: 'SIGN_IN_SUCCESS',
  code: StatusCodes.OK,
});

export const OTP_VERIFIED = Object.freeze({
  message: 'OTP_VERIFIED',
  code: StatusCodes.OK,
});

export const OTP_RESEND = Object.freeze({
  message: 'OTP_RESEND',
  code: StatusCodes.OK,
});

export const FORGOT_PASSWORD = Object.freeze({
  message: 'FORGOT_PASSWORD',
  code: StatusCodes.OK,
});

export const UPDATE_PASSWORD = Object.freeze({
  message: 'Password updated successfully.',
  code: StatusCodes.OK,
});
