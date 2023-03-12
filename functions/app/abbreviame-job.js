const {getTweets} = require("./twitter/get-tweets");
const {queryGpt} = require("./gpt/query-gpt-chat");
const {buildPrompt} = require("./prompt");
const {TwitterFailedException} = require("./twitter/twitter-failed-exception");
const {UserNotFoundException} = require("./twitter/user-not-found-exception");
const {TooFewTweetsException} = require("./twitter/too-few-tweets-exception");
const {TwitterRateLimitException} =
    require("./twitter/twitter-rate-limit-exception");

const MIN_NUM_TWEETS = 9;

exports.AbbreviameJob = {
  create: (dependencies = {}) => {
    const {
      logger,
    } = dependencies;

    /**
         * Checks if it is an error from twitter about user not being found
         * @param {Object} error
         * @return {boolean}
         */
    function isUserNotFound(error) {
      return error.length && error.length > 0 &&
                error[0].code && error[0].code === 34;
    }

    /**
         * Checks if it is an error from twitter about reate limit
         * @param {Object} error
         * @return {boolean}
         */
    function isRateLimit(error) {
      return error.length && error.length > 0 &&
                error[0].code && error[0].code === 88;
    }

    /**
         * gets tweets or throws error
         * @param {String} username
         * @return {Promise<unknown>}
         */
    async function getTweetsOrThrow(username) {
      try {
        return await getTweets(username);
      } catch (error) {
        if (isUserNotFound(error)) {
          throw new UserNotFoundException(username);
        }
        if (isRateLimit(error)) {
          throw new TwitterRateLimitException();
        }
        logger.error({
          state: "UNKNOWN_ERROR_RETRIEVING_TWEETS_FOUND",
          error,
        });
        throw new TwitterFailedException();
      }
    }

    const execute = async (username, language, anotherQuestion, openAiKey) => {
      const tweets = await getTweetsOrThrow(username);
      if (tweets.length <= MIN_NUM_TWEETS) {
        throw new TooFewTweetsException(tweets.length);
      }
      const prompt = buildPrompt(username, language, tweets, anotherQuestion);
      logger.info({
        username,
        state: "TWEETS_RETRIEVED",
        tweetsLength: tweets.length,
        promptLength: prompt.length,
      });
      return await queryGpt(prompt, openAiKey);
    };

    return {
      execute,
    };
  },
};
