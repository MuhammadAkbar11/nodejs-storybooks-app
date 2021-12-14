function ErrorResponse(statusCode, message, errors = {}) {
  this.statusCode = statusCode;
  this.message = message;
  this.errors = { ...errors };
  this.message = message || "Something went wrong";
  this.stack = new Error().stack;
}

ErrorResponse.prototype = Object.create(Error.prototype);
ErrorResponse.prototype.constructor = ErrorResponse;

module.exports = ErrorResponse;
