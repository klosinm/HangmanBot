//primary bot code will go here

//checking that discord.js is in files
const Discord = require('discord.js');

const {prefix, token}= require('./config.json');

const client = new Discord.Client();


client.once('ready', () => {
    console.log('Ready!')
})

//get a message from server
client.on('message', message => {
    //post message in terminal 
    console.log(message.content);
})


client.login(token);