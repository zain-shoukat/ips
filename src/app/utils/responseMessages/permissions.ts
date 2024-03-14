import { StatusCodes } from 'http-status-codes';

export const PERMISSION_CREATED = Object.freeze({
  message: 'PERMISSION_CREATED',
  code: StatusCodes.OK,
});

export const PERMISSION_UPDATED = Object.freeze({
  message: 'PERMISSION_UPDATED',
  code: StatusCodes.OK,
});

export const PERMISSIONS_NOT_FETCHED = Object.freeze({
  message: 'PERMISSIONS_NOT_FETCHED',
  code: StatusCodes.BAD_REQUEST,
});

export const PERMISSION_NOT_CREATED = Object.freeze({
  message: 'PERMISSION_NOT_CREATED',
  code: StatusCodes.BAD_REQUEST,
});

export const PERMISSIONS_FETCHED = Object.freeze({
  message: 'PERMISSIONS_FETCHED',
  code: StatusCodes.OK,
});

export const PERMISSION_DELETED = Object.freeze({
  message: 'PERMISSION_DELETED',
  code: StatusCodes.OK,
});

export const SINGLE_PERMISSION_FETCHED = Object.freeze({
  message: 'SINGLE_PERMISSION_FETCHED',
  code: StatusCodes.OK,
});

export const PERMISSION_FAILURE = Object.freeze({
  message: 'PERMISSION_FAILURE',
  code: StatusCodes.BAD_REQUEST,
});
