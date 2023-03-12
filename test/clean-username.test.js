const {cleanUsername} = require("../functions/app/clean-username");


console.log(cleanUsername('hola que tal estas'))
console.log(cleanUsername('@itorv'))
console.log(cleanUsername('itorvitorvitorvitorvitorvitorvitor' +
    'vitorvitorvitorvitorvitorvitorvitorvitorvitorvitorvitorvitorvitor' +
    'vitorvitorvitorvitorvitorvitorvitorvitorvitorvitorvitorvitorvitor' +
    'vitorvitorvitorvitorvitorvitorvitorvitorvitorvitorvitorvitorvitor' +
    'vitorvitorvitorvitorvitorvitorvitorvitorviitorvitorvitorvitorvtor' +
    'vitorvitorvitorv'))
