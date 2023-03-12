exports.TwitterRateLimitException = class TwitterRateLimitException
  extends Error {
  /**
     * Twitter failed exception
     */
  constructor() {
    super();
  }
};
