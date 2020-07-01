# Word Finder
Word Finder is a simple HTML5 game in which a player tries to score as many points as possible by forming words within a 2-minute time limit.

Word lists were downloaded from [Word Game Dictionary](https://www.wordgamedictionary.com/word-lists/).

## Motivation
I love word games! Scrabble, Boggle, Bananagrams, crossword puzzles—you name it. In particular, I play a lot of word games against friends on my phone. I created this game as a one-player desktop alternative while I wait for my friends to finally make their moves. 

One of the main issues I had was choosing letter frequencies for the tiles. At first I set random letters using: 
```js
String.fromCharCode(65+Math.floor(Math.random() * 26))
```
Which works, but without enough vowels or too many Zs and Qs, the game gets boring pretty quick. So simply weighting letters evenly was not a good idea. Instead, I found English letter frequency data online ([here](http://pi.math.cornell.edu/~mec/2003-2004/cryptography/subs/frequencies.html)), then calculated the cumulative frequencies. To generate a weighted random letter, the function picks a random number between 0 and 100. It then loops over the values in the cumulative frequencies array, comparing them to the random number. The letter corresponding to the first value greater than the random number is chosen. 
```js
function generateCumArray() {
  let sum = 0
  for (let i = 0; i < frequencies.length; i++) {
    sum += frequencies[i]
    cumFrequencies.push(sum)
  }
}

function generateRandomLetter() {
  let random = Math.random() * 100
  for (let i = 0; i < alphabet.length; i++) {
    if  (cumFrequencies[i] > random) {
      return alphabet[i]
    }
  }
}
```
Done. But the most difficult part for me was figuring out how to determine the Moore neighbors of a selected cell. Okay, so that getNeighbours function is horrendous and inefficient. I need to rework it, but I'm still learning, so I will come back to it in the future!

All in all, I had a lot of fun making this game. Thanks for playing!

## Room For Improvement
* Levels with increasing difficulty. Frequency of common letters/vowels lessens, shorter time. Points threshold needed to advance to next level.
* Word Mole was a favorite of mine on my Crackberry. I would love to see if I could implement some of its features, such as having the submitted word repopulate into new letters. Wildcards?
* I originally planned on adding my own sound effects to this game, and I may revisit the idea when I get more comfortable with Audacity.
* Full mobile and touchscreen support - allow swiping.
