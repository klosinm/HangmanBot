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

var i, k;
var p = 0;
var c = 0;

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
        else if (message.content.toLocaleLowerCase().startsWith(`${prefix}game status`)) {
            message.channel.send("`Hangman Game Info:` ");
            message.channel.send("Number of wrong guesses/hints used: " + numberofguess + "/10");
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
            console.log("--------message length: " +String(message).length);
            if (wordToGuess.length === 0) {
                message.channel.send("Need a word to guess!");
            }
            else if (String(message).length > 9) {
                message.channel.send("Input only one letter please!");
            }
            else {
                Letterguess = String(message).substring(8, 9);
                
                searchifLetterisinWord(String(message).substring(8, 9), wordToGuess, guessedLetters, message);
                win(blankLetters, numberofguess, wordToGuess, message);
            } 
            hangmanstatus(numberofguess, guessedLetters, blankLetters, message);
        }
    }
})

//Checking if guessed word pallet is full, to see if word 
//has been guessed or not
function win(blankLetters, numberofguess, wordToGuess, message) {
    var winornot = 0;
    //see if lost
    if (numberofguess == 10) {
        message.channel.send("GAME OVER");
        message.channel.send({ files: ["./images/hangman10.png"] })
            .then((() => message.channel.send("Word was: " + wordToGuess)))
            .then((() => process.abort()));
    }
    //see if won
    for (var j = 0; j < blankLetters.length; j++) {
        if (blankLetters[j] != " [ ] ") {
            winornot = winornot + 1;
        }
    }
    if (blankLetters.length === winornot) {
        message.channel.send("WON!")
            .then((() => process.abort()));
    }
}

//returns image on hangman, word: [],[],[],...
function hangmanstatus(numberofguess, guessedLetters, blankLetters, message) {
    if (numberofguess == 0) {
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
    
    message.channel.send("`HANGMAN    ` ")
        .then((() => message.channel.send("Word: " + blankLetters)))
        .then((() => message.channel.send("Guessed Letters: " + guessedLetters)));
}


//h/guess a 
function searchifLetterisinWord(Letterguess, wordToGuess, guessedLetters, message) {
    c = 0;
    p = 0;
    console.log("--------guessed letters lenght: " + String(guessedLetters).length);
    console.log("--------Length of word to guess , " + wordToGuess + ", is: " + wordToGuess.length);
    console.log("--------Guess is: " + Letterguess);
    console.log("--------word to guess as array: " + lettersinWord);
    console.log("");

    //see if letter has already been guessed
    for (k = 0; k < String(guessedLetters).length; k++){
        if (guessedLetters[k] === Letterguess) {
            message.channel.send("Letter already guessed!");
            p = 1;
        }
    }
    if(p != 1){
        for (i = 0; i < wordToGuess.length; i++) {
            if (Letterguess.toLocaleLowerCase().startsWith(lettersinWord[i])) {
                c = 1;
                //putting guessed word in array of guessed words
                blankLetters[i] = Letterguess;
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
}

client.login(token);