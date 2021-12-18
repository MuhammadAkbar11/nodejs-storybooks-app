const { NODE_ENV, DEV_MODE } = require("./contants");

module.exports = {
  consoleDev: function (value) {
    if (NODE_ENV === DEV_MODE) {
      return console.log(value);
    }
  },
  // regex for search pattern
  rgx: pattern => new RegExp(`.*${pattern}.*`),
  // random select
  randomSelect: arr => {
    return arr[Math.floor(Math.random() * arr.length)];
  },
};
