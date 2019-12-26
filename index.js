Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();
client.once('ready', () => {
    console.log('Ready!')
})

//possible letters for game
var letter = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

//number of guesses 
var numberofguess = 0;
// array of guessed letters
var guessedLetters = [];

//array of letters in word to guess
var lettersinWord = [];
var blankLetters = [];

var i;
var c = 0;

var wordToGuess = [];
var guess;
var Letterguess;

//get a message from server
client.on('message', message => {
    console.log(message.content);
    if (!message.author.bot) {
        //how to play
        if (message.content.toLocaleLowerCase().startsWith(`${prefix}help`)) {
            message.channel.send("Things I can do!\n`h/New Game |word|:` Starts a new game(double bar the word you want to be guessed)!\n`h/guess:` Guess a letter in word\n`h/hint:` Sends a random letter from puzzle with penality!\n`h/hint w/outp:` Sends a random letter from puzzle without penality!\n`h/game info:` Shares number of guesses made\n");
        }
        //new game
        else if (message.content.toLocaleLowerCase().startsWith(`${prefix}new game ||`)) {
            message.reply(`New Game!`)
                .then(sent => console.log(`Sent a reply to ${sent.author.username}`))
                .catch(console.error);
           
            wordToGuess = String(message).substring(13, String(message).length - 2);
            console.log("--------GUESSED WORD?: " + wordToGuess);

            //putting guess in array
            for (var j = 0; j < wordToGuess.length; j++) {
                lettersinWord[j] = String(wordToGuess).substring(j, j + 1);

                if (lettersinWord[j] === " ") {
                    blankLetters[j] = "   ";
                }
                else {
                    blankLetters[j] = " [ ] ";
                }
            }
            hangmanstatus(numberofguess, guessedLetters, blankLetters, message);
        }
        //game info, tells number of guesses, letters gotten
        else if (message.content.toLocaleLowerCase().startsWith(`${prefix}game info`)) {
            message.channel.send("`Hangman Game Info:` ");
            message.channel.send("Number of guesses used: " + numberofguess);
            hangmanstatus(numberofguess, guessedLetters, blankLetters, message);
            
        }
        //hint w/outp
        else if (message.content.toLocaleLowerCase().startsWith(`${prefix}hint w/outp`)) {
            var random = (Math.floor(Math.random() * wordToGuess.length));
            if (wordToGuess.length === 0) {
                message.channel.send("Need a word to guess!");
            }
            else {
                message.channel.send("This word has this letter in it (no penality): " + lettersinWord[random]);
                for (var w = 0; w < wordToGuess.length; w++) {
                    if (lettersinWord[w] === lettersinWord[random]) {
                        blankLetters[w] = lettersinWord[random];
                    }
                }
                hangmanstatus(numberofguess, guessedLetters, blankLetters, message);
            }
        }
        //hint
        else if (message.content.toLocaleLowerCase().startsWith(`${prefix}hint`)) {
            var random = (Math.floor(Math.random() * wordToGuess.length));
            if (wordToGuess.length === 0) {
                message.channel.send("Need a word to guess!");
            }
            else {
                message.channel.send("This word has this letter in it: " + lettersinWord[random]);
                for (var w = 0; w < wordToGuess.length; w++){
                    if (lettersinWord[w] === lettersinWord[random]) {
                        blankLetters[w] = lettersinWord[random];
                        guessedLetters.push(blankLetters[w]);
                    }
                }
                numberofguess = 1 + numberofguess;
                hangmanstatus(numberofguess, guessedLetters, blankLetters, message);
            }
        }
       
        //guess
        else if (message.content.toLocaleLowerCase().startsWith(`${prefix}guess`)) {
            if (wordToGuess.length === 0) {
                message.channel.send("Need a word to guess!");
            }
            else {
                Letterguess = String(message).substring(8, 9);
               // message = String(Letterguess);
                guessedLetters.push(Letterguess);
                searchifLetterisinWord(Letterguess, wordToGuess, message);
                hangmanstatus(numberofguess, guessedLetters, blankLetters, message);
                win(blankLetters, message);
            } 
        }
    }
})

//Checking if guessed word pallet is full, to see if word 
//has been guessed or not
function win(blankLetters, message) {
    var winornot = 0;
    for (var j = 0; j < blankLetters.length; j++) {
        if (blankLetters[j] != " [ ] ") {
            winornot = winornot + 1;
        }
    }
    if (blankLetters.length === winornot) {
        message.channel.send("Won!");
        console.log("--------won, " + winornot);
    }
    else {
        console.log("--------Hasn't won yet, " + winornot);
    }
}

//returns image on hangman, word: [],[],[],...
function hangmanstatus(numberofguess, guessedLetters, blankLetters, message) {
    if (numberofguess == 0) {

        message.channel.send("0");
        message.channel.send({ files: ["./images/hangman0.png"] }, "word");

    /* message.channel.send("-----------");
     message.channel.send("|           |");
     message.channel.send("|");
     message.channel.send("|");
     message.channel.send("|");
     message.channel.send("-----------");*/
    }
    else if (numberofguess == 1) {
        message.channel.send({ files: ["./images/hangman1.png"] });
    }
    else if (numberofguess == 2) {
        message.channel.send({ files: ["./images/hangman2.png"] });
    }
    else if (numberofguess == 3) {
        message.channel.send({ files: ["./images/hangman3.png"] });
    }
    else if (numberofguess == 4) {
        message.channel.send({ files: ["./images/hangman4.png"] });
    }
    else if (numberofguess == 5) {
        message.channel.send({ files: ["./images/hangman5.png"] });
    }
    else if (numberofguess == 6) {
        message.channel.send({ files: ["./images/hangman6.png"] });
    }
    else if (numberofguess == 5) {
        message.channel.send({ files: ["./images/hangman5.png"] });
    }
    else if (numberofguess == 7) {
        message.channel.send({ files: ["./images/hangman7.png"] });
    }
    else if (numberofguess == 8) {
        message.channel.send({ files: ["./images/hangman8.png"] });
    }
    else if (numberofguess == 9) {
        message.channel.send({ files: ["./images/hangman9.png"] });
    }
    else if (numberofguess == 10) {
        message.channel.send({ files: ["./images/hangman10.png"] });
    }  
    message.channel.send("Word: " + blankLetters);
    message.channel.send("Guessed Letters: " + guessedLetters);
}


//h/guess a 
function searchifLetterisinWord(guess, wordToGuess, message) {
    var letter = String(guess).substring(0, 1);
    c = 0;
    console.log("--------Length of word to guess , " + wordToGuess + ", is: " + wordToGuess.length);
    console.log("--------Guess is: " + letter);
    console.log("--------word to guess as array: " + lettersinWord);
    console.log("");

    for (i = 0; i < wordToGuess.length; i++) {  
      
        console.log("--------c before loop: " + c);
        if (letter.toLocaleLowerCase().startsWith(lettersinWord[i])) {
            c = 1;
            //putting guessed word in array of guessed words
            blankLetters[i] = letter;
            console.log("--------Guessed words: " + guessedLetters);
        }
    }
    //result
    if (c === 1) {
        message.channel.send("`" + letter + "` is in word!");  
    }
    else {
        message.channel.send("Not a letter!");
        numberofguess = 1 + numberofguess;
     }
}

client.login(token);