const { checkSchema } = require("express-validator");

const createStorySchema = checkSchema({
  title: {
    notEmpty: {
      errorMessage: "Title is required",
    },
  },
  status: {
    notEmpty: {
      errorMessage: "Status is required",
    },
  },
  body: {
    notEmpty: {
      errorMessage: "Body is required",
    },
    isLength: {
      errorMessage: "Body should be at least 7 chars long",
      options: { min: 7 },
    },
  },
});

module.exports = createStorySchema;
