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
            const lowerWord = word.toLowerCase()
            if(/(?<=\d+):(?=\d+)/g.test(word)) {
                textArray[index] = `<span class="highlight">${word.replace(/(?<=\d+):(?=\d+)/g, ".")}</span>`
            }
            if(Object.keys(americanOnly).includes(lowerWord)) {
                textArray[index] = `<span class="highlight">${americanOnly[lowerWord]}</span>`
            }
            if(Object.keys(americanToBritishSpelling).includes(lowerWord)) {
                textArray[index] = `<span class="highlight">${americanToBritishSpelling[lowerWord]}</span>`
            }
            if(Object.keys(americanToBritishTitles).includes(lowerWord)) {
                textArray[index] = `<span class="highlight">${Translator.toTitleCase(americanToBritishTitles[lowerWord])}</span>`
            }
        })
        
        if(textArray.join(" ") === text) return "Everything looks good to me!"
        return textArray.join(" ")
    }

    britishToAmerican (text) {
        const textArray = text.split(" ");

        textArray.forEach((word, index) => {
            const lowerWord = word.toLowerCase()
            // used positive lookbehind and lookahead to makesure
            //  we are modifying the hour not the sentence ending `.`
            if(/(?<=\d+)\.(?=\d+)/g.test(word)) {
                textArray[index] = `<span class="highlight">${word.replace(/(?<=\d+)\.(?=\d+)/g, ":")}</span>`
            }
            if(Object.keys(britishOnly).includes(lowerWord)) {
                textArray[index] = `<span class="highlight">${britishOnly[lowerWord]}</span>`
            }
            if(Object.values(americanToBritishSpelling).includes(lowerWord)) {
                textArray[index] = `<span class="highlight">${Object.keys(americanToBritishSpelling).find(key => americanToBritishSpelling[key] == lowerWord)}</span>`
            }
            if(Object.values(americanToBritishTitles).includes(lowerWord)) {
                textArray[index] = `<span class="highlight">${Translator.toTitleCase(Object.keys(americanToBritishTitles).find(key => americanToBritishTitles[key] == lowerWord))}</span>`
            }
        })

        if(textArray.join(" ") === text) return "Everything looks good to me!"
        return textArray.join(" ")
    }
}

module.exports = Translator;