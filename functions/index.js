const functions = require("firebase-functions");
const {AbbreviameJob} = require("./app/abbreviame-job");
const {UserNotFoundException} =
    require("./app/twitter/user-not-found-exception");
const {TooFewTweetsException} =
    require("./app/twitter/too-few-tweets-exception");
const {cleanInput} = require("./app/clean-input");
const {getCache} = require("./app/cache/get-cache");
const {setCache} = require("./app/cache/set-cache");
const {TwitterRateLimitException} =
    require("./app/twitter/twitter-rate-limit-exception");
const allowDomainCors = (request, response) => {
  response.set("Access-Control-Allow-Origin", "https://abbrevia.me");
  response.set("Access-Control-Allow-Headers", "*");
};

const abbreviameJob = AbbreviameJob.create({
  logger: functions.logger,
});

const doTheJob = async (
    request, response, username, language, anotherQuestion, openAiKey,
) => {
  try {
    const answer = await abbreviameJob.execute(
        username, language, anotherQuestion, openAiKey,
    );
    setCache(username, language, answer);
    functions.logger.info({
      username,
      state: "RESPONSE_OK",
      answer,
    });
    response.send({username, answer});
  } catch (error) {
    if (error instanceof UserNotFoundException) {
      functions.logger.info({
        username,
        state: "USER_NOT_FOUND",
      });
      response.status(404).send(null);
    } else if (error instanceof TooFewTweetsException) {
      functions.logger.error({
        username,
        state: "TOO_FEW_TWEETS_ERROR",
      });
      response.status(406).send(null);
    } else if (error instanceof TwitterRateLimitException) {
      functions.logger.error({
        username,
        state: "ERROR",
        error: error.toString() === "[object Object]" ?
                    error :
                    error.toString(),
      });
      response.status(529).send("{ error: \"twitter-rate-limit\" }");
    } else {
      functions.logger.error({
        username,
        state: "ERROR",
        error: error.toString() === "[object Object]" ?
                    error :
                    error.toString(),
      });
      response.status(500).send(null);
    }
  }
};

exports.abbreviameLimited =
    functions.https.onRequest(async (request, response) => {
      const username = cleanInput(request.query.username.trim());
      const rawApiKey = request.headers["x-openai-key"] ?
          request.headers["x-openai-key"].trim() :
          "";
      const queryApiKey = cleanInput(rawApiKey ? rawApiKey : "");
      const openAiKey = queryApiKey ? queryApiKey : process.env.OPENAI_API_KEY;
      const language = request.query.lang;
      const anotherQuestion = request.query.anotherQuestion;

      allowDomainCors(request, response);
      if (request.method === "OPTIONS") {
        response.status(200).send(null);
        return;
      }

      if (!username) {
        response.status(400).send(null);
        return;
      }
      if ((language !== "es") && (language !== "en")) {
        response.status(400).send(null);
        return;
      }

      const cacheData = await getCache(username, language);
      if (cacheData) {
        functions.logger.info({
          username,
          state: "RESPONSE_CACHED_OK",
          answer: cacheData,
        });
        response.send({username, answer: cacheData});
        return;
      }

      functions.logger.info({username, state: "START"});

      return await doTheJob(request, response,
          username, language, anotherQuestion, openAiKey);
    });
