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
   /*
    message.reply('Hey, I\'m a reply!')
        .then(sent => console.log(`Sent a reply to ${sent.author.username}`))
        .catch(console.error);
    
    var i;

    for (i = 0; i < 3; i++) {
        message.channel.send("Hi! " + i);
    }
    */
    
    if (message.content.startsWith(`${prefix}What\'s this?`)) //!kick
    {
       
        if ((Math.floor(Math.random() * 10)) % 2 == 0) {
            message.channel.send("OWO?");
        }
        else {
            message.channel.send("Who knows!?");
        }
    
    }

    if (message.content.includes('owo') && !message.author.bot) {
        message.channel.send("what\'s this?");
    }
    if (message.content.includes("whats this") && !message.author.bot) {
        message.channel.send("OwO");
    }


})


client.login(token);