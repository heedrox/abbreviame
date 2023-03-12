const limitLength = (username) =>
    username.length >= 100 ?
        username.substring(0, 100) :
        username;

const getFirstWord = (username) => {
  return (username.indexOf(" ") >= 0) ?
      username.substring(0, username.indexOf(" ")) :
      username;
};

const removeAt = (username) => username.replace("@", "");

exports.cleanInput = (username) =>
  removeAt(limitLength(getFirstWord(username)));
