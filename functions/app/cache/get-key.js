const {md5} = require("../md5/md5");
exports.getKey = (language, username) =>
  md5(`${language}_${username}`);
