const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();

//possible letters for game
var letter = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];


//number of guesses 
var numberofguess;
// array of guessed letters
var guessedLetters = [];

client.once('ready', () => {
    console.log('Ready!')
})


var i;
var j;
var wordToGuess = [];
var guess;

//get a message from server
client.on('message', message => {
    console.log(message.content);
   /* message.reply('Hey, I\'m a reply!')
     .then(sent => console.log(`Sent a reply to ${sent.author.username}`))
     .catch(console.error);*/
    
    if (!message.author.bot) {
       
       // message.channel.send(message.content);

         if (message.content.toLocaleLowerCase().startsWith(`${prefix}help`)) {
            message.channel.send("Things I can do!\n`h/New Game:` Starts a new game!\n`h/hint:` Sends a random letter from puzzle with penality!\n`/h hint w/p:` Sends a random letter from puzzle without penality!\n");
         }
        /*
         else if (message.content.toLocaleLowerCase().startsWith(`${prefix}new game`)) {
            // message.reply(`New Game! Will go to your DMS and ask for puzzle phrase!`)
            message.reply(`New Game! Respond with your word with a spoiler tag please!`)
              .then(sent => console.log(`Sent a reply to ${sent.author.username}`))
                .catch(console.error);    
         }
         */
         else if (message.content.toLocaleLowerCase().startsWith(`${prefix}new game ||`)) {
             // message.reply(`New Game! Will go to your DMS and ask for puzzle phrase!`)
             message.reply(`New Game!`)
                 .then(sent => console.log(`Sent a reply to ${sent.author.username}`))
                 .catch(console.error);

             wordToGuess = String(message).substring(13, String(message).length - 2);
             message.channel.send("GUESSED WORD?: " + wordToGuess);
         }
        
        
        
       
        searchifLetterisinWord(message, wordToGuess);

        
        
        //message.channel.send('Full Hangman!', { files: ["./images/FullHangman.png"] });
       // message.channel.send('_ _ _ _ _');
    }

   
})

function searchifLetterisinWord(guess, wordtoGuess) {

    for (i = 0; i < 26; i++) {
        if (guess.content.toLocaleLowerCase().startsWith(letter[i])) {

           
            guess.channel.send("Letter! : " + letter[i]);
            wordToGuess[i] = letter[i];
            guess.channel.send("Word to guess: " + wordToGuess);

            /*
             for (j = 0; j < message.length; j++) {
                //if this letter never shows up
                 if (message.indexOf("p") === -1) {
                     message.channel.send("Not a letter! ");
                 }
              } 
            */
        }
    }
}


client.login(token);