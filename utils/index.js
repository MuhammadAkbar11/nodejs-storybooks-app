const { NODE_ENV, DEV_MODE } = require("./contants");

module.exports = {
  consoleDev: function (value) {
    if (NODE_ENV === DEV_MODE) {
      return console.log(value);
    }
  },
};
