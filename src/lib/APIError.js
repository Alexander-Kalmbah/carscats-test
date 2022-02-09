import { now, secure32 } from './secure';

const APIError = class extends Error {
  constructor(code = 500, name = '500 | INTERNAL SERVER', msg = 'UNKNOWN ERROR', errors = []) {
    super(msg);

    this.key = secure32();

    this.code = code;
    this.name = name;
    this.time = now();
    this.errors = errors.map(error => `${error}`);
  };


  static BadRequest(...errors) {
    return new APIError(400, '400 | BAD REQUEST', 'FAILURE', errors);
  };

  static Unauthorized(...errors) {
    return new APIError(401, '401 | UNAUTHORIZED', 'FAILURE', errors);
  };

  static Forbidden(...errors) {
    return new APIError(403, '403 | FORBIDDEN', 'FAILURE', errors);
  };

  static NotFound(...errors) {
    return new APIError(404, '404 | NOT FOUND', 'FAILURE', errors);
  };

  static MethodNotAllowed(...errors) {
    return new APIError(405, '405 | METHOD NOT ALLOWED', 'FAILURE', errors);
  };

  // TODO
};