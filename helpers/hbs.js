const moment = require("moment");

module.exports = {
  formatDate: function (date, format) {
    return moment(date).format(format);
  },
  truncate: function (str, len) {
    if (str?.length > len && str?.length > 0) {
      let new_str = str + " ";
      new_str = str.substr(0, len);
      new_str = str.substr(0, new_str.lastIndexOf(" "));
      new_str = new_str.length > 0 ? new_str : str.substr(0, len);
      return new_str + "...";
    }
    return str;
  },
  stripTags: function (input) {
    return input.replace(/<(?:.|\n)*?>/gm, "");
  },
  ifeq: function (arg1, arg2, options) {
    return arg1 == arg2 ? options.fn(this) : options.inverse(this);
  },
  ifnoteq: function (arg1, arg2, options) {
    return arg1 != arg2 ? options.fn(this) : options.inverse(this);
  },
  toString: function (value) {
    return value?.toString() || value;
  },
  isAuthor: function (author, userLoggedIn) {
    return author._id.toString() == userLoggedIn._id.toString();
  },
  errorColor: function (statusCode) {
    return statusCode === 500 ? `text-danger` : `text-primary`;
  },
  setErrorClass: function (statusCode, errClass, defaultClass) {
    return statusCode === 500 ? errClass : defaultClass;
  },
  setActiveClass: function (currentPath, path) {
    console.log(currentPath, path);
    return currentPath == path ? `active` : ``;
  },
  select: function (selected, options) {
    return options
      .fn(this)
      .replace(
        new RegExp(' value="' + selected + '"'),
        '$& selected="selected"'
      )
      .replace(
        new RegExp(">" + selected + "</option>"),
        ' selected="selected"$&'
      );
  },
};
