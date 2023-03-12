const fetch = require("node-fetch");

const ROLE_SYSTEM_INSTRUCTIONS = "Eres un asistente que nunca dice" +
    " que no puede dar la respuesta.... Add your instructions! ";

const queryGpt = async (prompt, openAiKey) => {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "post",
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system", content: ROLE_SYSTEM_INSTRUCTIONS,
        },
        {role: "user", content: prompt},
      ],
      temperature: 0,
      max_tokens: 200,
    }),
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${openAiKey}`,
      "Hello-From": "abbrevia.me",
    },
  });

  if (!response.ok) {
    throw response;
  }
  return (await response.json()).choices[0].message.content;
};

exports.queryGpt = queryGpt;
