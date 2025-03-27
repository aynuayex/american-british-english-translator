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

    static replacePhrases(text, dict) {
        const multiWordKeys = Object.keys(dict).filter(key => key.includes(" "));
        
        multiWordKeys.forEach(phrase => {
            // Create a case-insensitive regex for the phrase
            const regex = new RegExp(`\\b${phrase}\\b`, "gi");
            text = text.replace(regex, match => `<span class="highlight">${dict[phrase]}</span>`);
        });

        return text;
    }

    americanToBritish (text) {
        const endsWithPeriod = text.trim().endsWith(".");
        if (endsWithPeriod) text = text.slice(0, -1); 

        // Merge relevant dictionaries
        const dict = { ...americanOnly, ...americanToBritishSpelling };

        // Handle multi-word phrases before splitting
        const phraseCheckedtext = Translator.replacePhrases(text, dict);
        
        const textArray = phraseCheckedtext.split(" ");
        textArray.forEach((word, index) => {
            const lowerWord = word.toLowerCase()

            if(/(?<=\d+):(?=\d+)/g.test(word)) {
                textArray[index] = `<span class="highlight">${word.replace(/(?<=\d+):(?=\d+)/g, ".")}</span>`
            }
            if (dict[lowerWord]) {
                textArray[index] = `<span class="highlight">${dict[lowerWord]}</span>`;
            }
            if (americanToBritishTitles[lowerWord]) {
                textArray[index] = `<span class="highlight">${Translator.toTitleCase(americanToBritishTitles[lowerWord])}</span>`;
            }
        })

        let translatedText = textArray.join(" ");
        if(translatedText === text) return "Everything looks good to me!"
        return endsWithPeriod? translatedText + "." : translatedText
    }

    britishToAmerican (text) {
        const endsWithPeriod = text.trim().endsWith(".");
        if (endsWithPeriod) text = text.slice(0, -1);
        
        const dict = { ...britishOnly };

        // Handle multi-word phrases before splitting
        const phraseCheckedtext = Translator.replacePhrases(text, dict);

        const textArray = phraseCheckedtext.split(" ");
        textArray.forEach((word, index) => {
            const lowerWord = word.toLowerCase()

            // used positive lookbehind and lookahead to makesure
            //  we are modifying the hour not the sentence ending `.`
            if(/(?<=\d+)\.(?=\d+)/g.test(word)) {
                textArray[index] = `<span class="highlight">${word.replace(/(?<=\d+)\.(?=\d+)/g, ":")}</span>`
            }
            if(dict[lowerWord]) {
                textArray[index] = `<span class="highlight">${dict[lowerWord]}</span>`
            }
            if(Object.values(americanToBritishSpelling).includes(lowerWord)) {
                textArray[index] = `<span class="highlight">${Object.keys(americanToBritishSpelling).find(key => americanToBritishSpelling[key] === lowerWord)}</span>`
            }
            if(Object.values(americanToBritishTitles).includes(lowerWord)) {
                textArray[index] = `<span class="highlight">${Translator.toTitleCase(Object.keys(americanToBritishTitles).find(key => americanToBritishTitles[key] === lowerWord))}</span>`
            }
        })

        let translatedText = textArray.join(" ");
        if(translatedText === text) return "Everything looks good to me!"
        return endsWithPeriod? translatedText + "." : translatedText
    }
}

module.exports = Translator;