const {getDatabase} = require("../database/database");
const {getKey} = require("./get-key");
exports.setCache = (username, language, content) => {
  const database = getDatabase();
  const cacheRef = database.collection("cache");
  cacheRef.doc(getKey(language, username)).set({content});
};
