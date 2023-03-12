require('dotenv').config({ path: require('path').resolve(__dirname, '../functions/.env') })
const {AbbreviameJob} = require("../functions/app/abbreviame-job");

// Use this script to do changes to your prompt and check them against existing users.
// It will allow you to check the impact of your your change.

const USERS = [
    'user1', 'user2', 'user3'
]

const abbreviameJob = AbbreviameJob.create({ logger: console });

(async () => {
    try {
        for (let a = 0; a< USERS.length; a++) {
            const user = USERS[a]
            const data = await abbreviameJob.execute(user, 'es');
            console.log(user, data)
        }
    } catch (error) {
        console.error(error)
    }
})()
