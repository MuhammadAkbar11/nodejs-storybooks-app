function ErrorResponse({
  statusCode = 500,
  message = "Something went wrong",
  data = {},
  ...errors
}) {
  this.statusCode = statusCode;
  this.message = message;
  this.data = { ...data };
  this.message = message;
  this.stack = new Error().stack;

  this.errors = { ...errors };

  if (errors.kind === "ObjectId" || errors.statusCode) {
    this.statusCode = 404;
    this.message = "Product not found";
  }
}

ErrorResponse.prototype = Object.create(Error.prototype);
ErrorResponse.prototype.constructor = ErrorResponse;

module.exports = ErrorResponse;
