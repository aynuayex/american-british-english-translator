const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
    // using static method because we can't use `this` inside forEach 
    // since it does not refer to the class instance
    static toTitleCase(str) {
        return str.replace(/\b\w/, char => char.toUpperCase());
    }
    
    americanToBritish (text) {
        const textArray = text.split(" ");

        textArray.forEach((word, index) => {
            if(word.includes(":")) {
                textArray[index] = `<span class="highlight">${word.replace(/:/, ".")}</span>`
            }
            if(Object.keys(americanOnly).includes(word)) {
                textArray[index] = `<span class="highlight">${americanOnly[word]}</span>`
            }
            if(Object.keys(americanToBritishSpelling).includes(word)) {
                textArray[index] = `<span class="highlight">${americanToBritishSpelling[word]}</span>`
            }
            if(Object.keys(americanToBritishTitles).includes(word.toLowerCase())) {
                textArray[index] = `<span class="highlight">${Translator.toTitleCase(americanToBritishTitles[word.toLowerCase()])}</span>`
            }
        })
        if(textArray.join(" ") === text) return "Everything looks good to me!"
        return textArray.join(" ")
    }

    britishToAmerican (text) {
        const textArray = text.split(" ");

        textArray.forEach((word, index) => {
            if(word.includes(".")) {
                textArray[index] = `<span class="highlight">${word.replace(/\./, ":")}</span>`
            }
            if(Object.keys(britishOnly).includes(word)) {
                textArray[index] = `<span class="highlight">${britishOnly[word]}</span>`
            }
            if(Object.values(americanToBritishSpelling).includes(word)) {
                textArray[index] = `<span class="highlight">${Object.keys(americanToBritishSpelling).find(key => americanToBritishSpelling[key] == word)}</span>`
            }
            if(Object.values(americanToBritishTitles).includes(word.toLowerCase())) {
                textArray[index] = `<span class="highlight">${Translator.toTitleCase(Object.keys(americanToBritishTitles).find(key => americanToBritishTitles[key] == word.toLowerCase()))}</span>`
            }
        })
        if(textArray.join(" ") === text) return "Everything looks good to me!"
        return textArray.join(" ")
    }
}

module.exports = Translator;