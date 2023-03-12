exports.TooFewTweetsException = class TooFewTweetsException extends Error {
  /**
   * Too Few Tweets exception for the required calculations
   * @param {number} numTweets
   */
  constructor(numTweets) {
    super();
    this.numTweets = numTweets;
  }
};
