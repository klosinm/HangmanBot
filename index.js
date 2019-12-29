Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();
client.once('ready', () => {
    console.log('Ready!')
})

//number of guesses 
var numberofguess = 0;
// array of guessed letters
var guessedLetters = [];

//array of letters in word to guess
var lettersinWord = [];
var wordsLeft = [];
var blankLetters = [];

var i, k;
var c = 0;
var t = 0;

var wordToGuess = [];
var guess;
var Letterguess;

//get a message from server
client.on('message', message => {
    console.log(message.content);
    if (!message.author.bot) {
        //how to play
        if (message.content.toLocaleLowerCase().startsWith(`${prefix}info`)) {
            message.channel.send("\n`h/New Game |word|:` Starts a new game(double bar the word you want to be guessed!)\n`h/guess x:` Guess a letter in word (example, letter x) \n`h/hint:` Sends a random letter from puzzle with penality!\n`h/hint w/outp:` Sends a random letter from puzzle without penality!\n`h/game status:` Shares number of guesses made\n");
        }
       /* else if (message.content.toLocaleLowerCase().startsWith(`${prefix}quit`)){
            message.channel.send("Thanks for playing!")
                .then((() => process.abort()));   
        }*/
        //new game
        else if (message.content.toLocaleLowerCase().startsWith(`${prefix}new game`)) {
            //ERROR: not correct format in starting new game
            var n = String(message).indexOf("||", 12);
            if (String(message).indexOf("||") != 11 || n === -1) {
                message.reply("Not correct format in starting a game! Surround word/phrase by double bars \"||\"");
                return;
            }
           
            wordToGuess = String(message).substring(13, String(message).length - 2);
            guessedLetters = [];
            //putting guess in array
            for (var j = 0; j < wordToGuess.length; j++) {
                lettersinWord[j] = String(wordToGuess).substring(j, j + 1);
                wordsLeft[j] = String(wordToGuess).substring(j, j + 1);
                if (lettersinWord[j] === " ") {
                    blankLetters[j] = "   ";
                }
                else {
                    blankLetters[j] = " [ ] ";
                    t = 1;
                }
            }
          
            //ERROR: tries to play an empty word/phrase
            if (t != 1) {
                message.reply("Not correct format in starting a game! Cannot have people guess a blank statement!");
                return;
            }
           
            message.reply(`New Game!`);
            hangmanstatus(numberofguess, guessedLetters, blankLetters, message);
        }
        //game info, tells number of guesses, letters gotten
        else if (message.content.toLocaleLowerCase().startsWith(`${prefix}game status`)) {
            message.channel.send("`Hangman Game Info:` ");
            message.channel.send("Number of wrong guesses or hints used: " + numberofguess + "/10");
            hangmanstatus(numberofguess, guessedLetters, blankLetters, message);
        }
        //hint w/outp
        else if (message.content.toLocaleLowerCase().startsWith(`${prefix}hint w/outp`)) {
            if (wordToGuess.length === 0) {
                message.channel.send("Need a word to guess!");
            }
            else {
                hint(lettersinWord, guessedLetters, wordToGuess, message);
            }

            hangmanstatus(numberofguess, guessedLetters, blankLetters, message);
        }
        //hint
        else if (message.content.toLocaleLowerCase().startsWith(`${prefix}hint`)) {  
            if (wordToGuess.length === 0) {
                message.channel.send("Need a word to guess!");
            }
            else {
                hint(lettersinWord, guessedLetters, wordToGuess, message);
            }
          
            numberofguess = 1 + numberofguess;   
            hangmanstatus(numberofguess, guessedLetters, blankLetters, message);
        }
        //guess
        else if (message.content.toLocaleLowerCase().startsWith(`${prefix}guess`)) {
            if (wordToGuess.length === 0) {
                message.channel.send("Need a word to guess!");
                return;
            }
            if (String(message).substring(8, 9) === "") {
                message.channel.send("Need input of one letter!");          
            }
            else if (String(message).length > 9) {
                message.channel.send("Input only one letter please!");
            }
            else {
                Letterguess = String(message).substring(8, 9);
                searchifLetterisinWord(String(message).substring(8, 9), wordToGuess, guessedLetters, message);
            } 
            hangmanstatus(numberofguess, guessedLetters, blankLetters, message);
        }
    }
})

function hint(lettersinWord, guessedLetters, wordToGuess, message) {
    var random = (Math.floor(Math.random() * (wordsLeft).length));
    
    message.channel.send("This word has this letter in it: " + wordsLeft[random]);
    var wordholder = wordsLeft[random];
    
    //add letter to anyplace letter shows up in answer
    for (var w = 0; w < String(wordToGuess).length; w++) {
        if (lettersinWord[w] === wordsLeft[random]) {   
            blankLetters[w] = wordsLeft[random];
        }
    }

    //get rid of letters guessed in array of letters left
    wordsLeft.splice(wordsLeft.indexOf(wordholder), 1);
    //add letters to array of letters used
    guessedLetters.push(wordholder);
} 

//Checking if guessed word pallet is full, to see if word has been guessed or not
function win(blankLetters, message) {
    var winornot = 0;
    //see if won
    for (var j = 0; j < blankLetters.length; j++) {
        if (blankLetters[j] != " [ ] ") {
            winornot = winornot + 1;
        }
    }
    if (blankLetters.length === winornot) {
        return 1;
    }
}

//returns image on hangman, word: [],[],[],...
function hangmanstatus(numberofguess, guessedLetters, blankLetters, message) {
    var g = 0;
    //see if won
    if (win(blankLetters, message) === 1) {
        g = 1;
        message.channel.send("WON!")
        message.channel.send({ files: ["./images/won.png"] })
            .then((() => message.channel.send("Word was: " + wordToGuess + "!")))
       
    }
    else if (numberofguess == 0) {
        message.channel.send({ files: ["./images/hangman0.png"] });
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
    //see if lost
    else if (numberofguess == 10) {
        g = 1;
        message.channel.send("`GAME OVER    `");
        message.channel.send({ files: ["./images/gameover.png"] })
            .then((() => message.channel.send("Word was: " + wordToGuess)))
            .then((() => localStorage.clear()));
    }
    if (g != 1) {
        message.channel.send("`HANGMAN    ` ")
            .then((() => message.channel.send("Word: " + blankLetters)))
            .then((() => message.channel.send("Guessed Letters: " + guessedLetters ))); 
    }
}


function letterused(Letterguess, guessedLetters, message) {
    //see if letter has already been guessed
    for (k = 0; k < String(guessedLetters).length; k++) {
        if (guessedLetters[k] === Letterguess) {
            return 1;
        }
    }
}


//h/guess  
function searchifLetterisinWord(Letterguess, wordToGuess, guessedLetters, message) {
    c = 0;
    p = 0;

    if (letterused(Letterguess, guessedLetters, message) != 1){
        for (i = 0; i < wordToGuess.length; i++) {
            if (Letterguess.toLocaleLowerCase().startsWith(lettersinWord[i])) {
                c = 1;
                //putting guessed word in array of guessed words
                blankLetters[i] = Letterguess;
                wordsLeft.splice(wordsLeft.indexOf(Letterguess), 1);
                console.log("words left: " + wordsLeft);
            }
        }

        //result
        if (c === 1) {
            message.channel.send("`" + Letterguess + "` is in word!");
            guessedLetters.push(Letterguess);
           
        }
        else {
            message.channel.send("Not a letter!");
            numberofguess = 1 + numberofguess;
            guessedLetters.push(Letterguess);
        }
    }
    else {
        message.channel.send("Letter already guessed!");
    }
}

console.log("--------GUESSED WORD: " + wordToGuess);
console.log("--------lankletters: " + blankLetters);
console.log("--------wordsLeft: " + wordsLeft);

client.login(token);