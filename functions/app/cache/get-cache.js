const {getDatabase} = require("../database/database");
const {getKey} = require("./get-key");

exports.getCache = async (username, language) => {
  const database = getDatabase();
  const cacheRef = database.collection("cache");
  return cacheRef.doc(getKey(language, username)).get().then((doc) => {
    const cacheData = doc.exists ? doc.data() : ({content: null});
    return cacheData.content;
  });
};
