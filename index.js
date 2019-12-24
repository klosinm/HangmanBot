const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();

//possible letters for game
var letter = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];


//number of guesses 
var numberofguess;
// array of guessed letters
var guessedLetters = [];

//array of letters in word to guess
var lettersinWord = [];

client.once('ready', () => {
    console.log('Ready!')
})


var i;
var j;
var wordToGuess = [];
var guess;
var Letterguess;

//get a message from server
client.on('message', message => {
    console.log(message.content);
   /* message.reply('Hey, I\'m a reply!')
     .then(sent => console.log(`Sent a reply to ${sent.author.username}`))
     .catch(console.error);*/
    
    if (!message.author.bot) {
       
       // message.channel.send(message.content);

         if (message.content.toLocaleLowerCase().startsWith(`${prefix}help`)) {
            message.channel.send("Things I can do!\n`h/New Game |word|:` Starts a new game (double bar the word you want to be guessed)!\n`h/hint:` Sends a random letter from puzzle with penality!\n`/h hint w/p:` Sends a random letter from puzzle without penality!\n");
         }
         else if (message.content.toLocaleLowerCase().startsWith(`${prefix}new game ||`)) {
             // message.reply(`New Game! Will go to your DMS and ask for puzzle phrase!`)
             message.reply(`New Game!`)
                 .then(sent => console.log(`Sent a reply to ${sent.author.username}`))
                 .catch(console.error);

             wordToGuess = String(message).substring(13, String(message).length - 2);
            console.log("--------GUESSED WORD?: " + wordToGuess);
         }
        else if (message.content.toLocaleLowerCase().startsWith(`${prefix}guess `)) {
            if (wordToGuess.length === 0) {
                message.channel.send("Need a word to guess!");
            }
            else {
                Letterguess = String(message).substring(8, 9);
                searchifLetterisinWord(Letterguess, wordToGuess);
            }
        }

       
       searchifLetterisinWord(message, wordToGuess);

        //message.channel.send('Full Hangman!', { files: ["./images/FullHangman.png"] });
       // message.channel.send('_ _ _ _ _');
    }

   
})

function searchifLetterisinWord(guess, wordtoGuess) {

    for (var j = 0; j < wordToGuess.length; j++){
        lettersinWord[j] = String(wordToGuess).substring(j, j + 1);
       
    }
    console.log("--------Length of word to guess , " + wordToGuess + ", is: " + wordToGuess.length);
    console.log("--------Guess is: " + String(guess).substring(0, 1));
    console.log("--------Guessed Letter is: " + lettersinWord);

    for (i = 0; i < wordToGuess.length; i++) {
        guess.channel.send("Letter: " + String(guess).substring(0, 1));
        if (guess.content.toLocaleLowerCase().startsWith(lettersinWord[i])) {
            guess.channel.send("Is in word!");

            //putting guessed word in array of guessed words
            guessedLetters[i] = String(guess).substring(0, 1);
            guess.channel.send("Guessed words: "  + guessedLetters);
        }
        else {
            guess.channel.send("Not a letter!");
        }
    }
}


client.login(token);