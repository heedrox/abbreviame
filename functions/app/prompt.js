const defaultQuestion = {
  "es": "¿Qué imagen proyecta este usuario y de qué" +
        "temas habla en general?",
  "en": "What image does this user project to other" +
        "users and what does the user talk about?",
};

const PROMPTS = {
  "es": `Estos son los últimos tweets de {username}: 
    {tweets}.
    Contesta esta pregunta: {question} Tu respuesta: `,
  "en": `These are {username}'s latest tweets: 
    {tweets}. Answer this question in English: {question}. Your answer: `,
};


const ensureLength = (text, length) =>
    (text.length <= length) ? text : text.substring(0, length);

exports.buildPrompt = (username, language, tweets, anotherQuestion) =>
  PROMPTS[language]
      .replace("{username}", username)
      .replace("{tweets}", ensureLength(
          tweets.map((t) => `- ${t}`).join("\n"),
          9450),
      )
      .replace("{question}", anotherQuestion ?
          anotherQuestion:
          defaultQuestion[language] );
