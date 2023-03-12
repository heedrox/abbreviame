# Abbreviame

Originally: A proof of concept to know if an AI can answer any question about any user reading all their timeline.

At the end: Get an abbreviated description made by an AI of you based on your latest tweets.  What do other users perceive from what you tweet? 

# What you can do with this

You can do several things, like:
- Replicate original abbrevia.me service.
- Pivot original abbrevia.me for other use cases, e.g. a service for corporates.
- Use it for other questions. Actually, the code was prepared to accept other questions, beyond the original one. 
  It was never used in production, but you can send an "anotherQuestion" parameter in your query :scream:
  Be creative! For example, you can say: "Specify 10 keywords that match this user."

Some limits you must be aware of:
- Twitter apps have a rate limit. Check what does this mean for your use case.
- OpenAI has a max quota of 120 $. If you expect to spend more, fill the form you will find in their site soon.

# Installation & local execution

If you have any question or you find a bug, please, let me know. If you want to contribute, go ahead and do it.

You can adapt this code to use any database or server. In my case, I use firebase,
so this is a guide to make it work in firebase.

- Create a firebase project in https://console.firebase.google.com

- Add it as default in your project:
```shell
firebase use --add
```

- Inside functions folder
```shell
cd functions
```

- Copy .env-example file to .env
```shell
cp .env-example .env
```

- Edit ".env" file and add your own API keys (from twitter and openAI)

- Use node 16. I usually use NVM in order to use different node versions.
```shell
nvm use
```

- Install dependencies
```shell
npm install
```

- Change the ROLE_SYSTEM and the prompt, in following files:
  - functions/app/gpt/query-gpt-chat.js (ROLE_SYSTEM_INSTRUCTIONS variable)
  - functions/app/prompt.js (PROMPTS variable)

- In your root folder again
```shell
cd ..
```

- Add a "service-account.json" for firebase database connection.

- Run an emulator
```shell
firebase emulators:start
```

The rest of this, I leave it to you!

# License

MIT License. Read [LICENSE.md](LICENSE.md)

It is not mandatory to notify me if you use this code, but it would be great to know that you use it.

