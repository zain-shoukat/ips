import { StatusCodes } from 'http-status-codes';

export const DATA_FETCHED = Object.freeze({
  message: 'USER_DATA_FETCHED',
  code: StatusCodes.OK,
});


export const USER_CREATED = Object.freeze({
  message: 'USER_CREATED',
  code: StatusCodes.OK,
});


export const USER_EXISTED = Object.freeze({
  message: 'USER_EXISTED',
  code: StatusCodes.OK,
});

export const FETCHING_FAILURE = Object.freeze({
  message: 'FETCHING_FAILURE',
  code: StatusCodes.NOT_FOUND,
});

export const UPDATING_FAILURE = Object.freeze({
  message: 'UPDATING_FAILURE',
  code: StatusCodes.BAD_REQUEST,
});

export const SINGLE_USER_DATA_FETCHED = Object.freeze({
  message: 'SINGLE_USER_DATA_FETCHED',
  code: StatusCodes.OK,
});

export const USER_UPDATED = Object.freeze({
  message: 'USER_UPDATED',
  code: StatusCodes.OK,
})

export const USER_DELETED = Object.freeze({
  message: 'USER_DELETED',
  code: StatusCodes.OK,
})

export const USER_NOT_DELETED = Object.freeze({
  message: 'USER_NOT_DELETED',
  code: StatusCodes.BAD_REQUEST,
})

export const USER_NOT_FETCHED = Object.freeze({
  message: 'USER_NOT_FETCHED',
  code: StatusCodes.BAD_REQUEST,
});