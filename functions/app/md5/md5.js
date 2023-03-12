const crypto = require("crypto");

exports.md5 = (string) =>
  crypto.createHash("md5").update(string).digest("hex");
