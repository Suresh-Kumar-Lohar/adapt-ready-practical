const { STATUS_CODES } = require('./constants');

class ResponseHandler {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  sender(code, message, data, success) {
    this.res.status(code).json({
      message: message || '',
      data: data || {},
      success,
    });
  }

  success(message, data, success = true) {
    this.sender(STATUS_CODES.SUCCESS, message, data, success);
  }

  badRequest(message, data, success = false) {
    this.sender(STATUS_CODES.BAD_REQUEST, message, data, success);
  }

  notFound(message, data, success = false) {
    this.sender(STATUS_CODES.NOT_FOUND, message, data, success);
  }

  internalServerError(message = 'Internal Server Error!', data, success = false) {
    this.sender(STATUS_CODES.SERVER_ERROR, message, data, success);
  }
}

module.exports = ResponseHandler;
