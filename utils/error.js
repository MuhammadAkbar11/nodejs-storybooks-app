function ErrorResponse({
  name,
  statusCode = 500,
  message,
  data = {},
  ...errors
}) {
  this.statusCode = statusCode;
  this.name = name;
  this.message = message || "Something went wrong";
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
