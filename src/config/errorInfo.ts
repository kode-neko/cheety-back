/* eslint-disable no-underscore-dangle */
enum ErrorCodes {
  USER_EXISTS = 'USER_EXISTS',
  SERVER_ERROR = 'SERVER_ERROR',
  ATHENTICATION_ERROR = 'AUTH_ERROR',
  PARAMS_NOT_VALID = 'PARAMS_NOT_VALID',
  AUTHORIZATION_ERROR = 'AUTHORIZATION_ERROR',
}

interface IError {
  code: number,
  name: string
}

const errorInfo: Record<ErrorCodes, IError> = {
  [ErrorCodes.USER_EXISTS]: {
    code: 409,
    name: ErrorCodes.USER_EXISTS,
  },
  [ErrorCodes.SERVER_ERROR]: {
    code: 500,
    name: ErrorCodes.SERVER_ERROR,
  },
  [ErrorCodes.ATHENTICATION_ERROR]: {
    code: 403,
    name: ErrorCodes.ATHENTICATION_ERROR,
  },
  [ErrorCodes.PARAMS_NOT_VALID]: {
    code: 400,
    name: ErrorCodes.PARAMS_NOT_VALID,
  },
  [ErrorCodes.AUTHORIZATION_ERROR]: {
    code: 401,
    name: ErrorCodes.AUTHORIZATION_ERROR,
  },
};

class ErrorServer extends Error {
  private _code: number;

  private _debug: string;

  constructor(name: ErrorCodes, debug = '') {
    const errorType = errorInfo[name];
    super(errorType.name);
    this._code = errorType.code;
    this._debug = debug;
  }

  public get code(): number {
    return this._code;
  }

  public set code(value: number) {
    this._code = value;
  }

  public get debug(): string {
    return this._debug;
  }

  public set debug(value: string) {
    this._debug = value;
  }
}

export {
  ErrorCodes,
  errorInfo,
  ErrorServer,
};
