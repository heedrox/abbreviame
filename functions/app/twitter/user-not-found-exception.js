exports.UserNotFoundException = class UserNotFoundException extends Error {
  /**
     * User not found
     * @param {String} username
     */
  constructor(username) {
    super();
    this.username = username;
  }
};
