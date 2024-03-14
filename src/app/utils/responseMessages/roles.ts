import { StatusCodes } from 'http-status-codes';

export const ROLE_CREATED = Object.freeze({
  message: 'ROLE_CREATED',
  code: StatusCodes.OK,
});

export const ROLE_UPDATED = Object.freeze({
  message: 'ROLE_UPDATED',
  code: StatusCodes.OK,
});

export const ROLES_NOT_FETCHED = Object.freeze({
  message: 'ROLES_NOT_FETCHED',
  code: StatusCodes.BAD_REQUEST,
});

export const ROLE_NOT_CREATED = Object.freeze({
  message: 'ROLE_NOT_CREATED',
  code: StatusCodes.BAD_REQUEST,
});

export const ROLES_FETCHED = Object.freeze({
  message: 'ROLES_FETCHED',
  code: StatusCodes.OK,
});

export const ROLE_DELETED = Object.freeze({
  message: 'ROLE_DELETED',
  code: StatusCodes.OK,
});

export const SINGLE_ROLE_FETCHED = Object.freeze({
  message: 'SINGLE_ROLE_FETCHED',
  code: StatusCodes.OK,
});

export const ROLE_FAILURE = Object.freeze({
  message: 'ROLE_FAILURE',
  code: StatusCodes.BAD_REQUEST,
});
