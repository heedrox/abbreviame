const Twitter = require("twitter");

const NUM_TWEETS = 70;

// replace these values with your own Twitter API keys
const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

const getTweets = async (username) => new Promise((resolve, reject) => {
  const params = {
    screen_name: username,
    count: NUM_TWEETS,
    tweet_mode: "extended",
    exclude_replies: false,
  };
  const callback = (error, tweets) => error ?
      reject(error) :
      resolve(tweets.map((t) => t["full_text"]));

  client.get("statuses/user_timeline", params, callback);
});

exports.getTweets = getTweets;
