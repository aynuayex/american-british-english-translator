const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');

const {americanToBritish, britishToAmerican } = new Translator();

suite('Unit Tests', () => {
    suite("American to British English translation tests", () => {
        test("Translate Mangoes are my favorite fruit. to British English", () => {
            assert.equal(americanToBritish("Mangoes are my favorite fruit."), "Mangoes are my <span class=\"highlight\">favourite</span> fruit.")
        })
        test("Translate I ate yogurt for breakfast. to British English", () => {
            assert.equal(americanToBritish("I ate yogurt for breakfast."), "I ate <span class=\"highlight\">yoghurt</span> for breakfast.")
        })
        test("Translate We had a party at my friend's condo. to British English", () => {
            assert.equal(americanToBritish("We had a party at my friend's condo."), "We had a party at my friend\'s <span class=\"highlight\">flat</span>.")
        })
        test("Translate Can you toss this in the trashcan for me? to British English", () => {
            assert.equal(americanToBritish("Can you toss this in the trashcan for me?"), "Can you toss this in the <span class=\"highlight\">bin</span> for me?")
        })
        test("Translate The parking lot was full. to British English", () => {
            assert.equal(americanToBritish("The parking lot was full."), "The <span class=\"highlight\">car park</span> was full.")
        })
        test("Translate Like a high tech Rube Goldberg machine. to British English", () => {
            assert.equal(americanToBritish("Like a high tech Rube Goldberg machine."), "Like a high tech <span class=\"highlight\">Heath Robinson device</span>.")
        })
        test("Translate To play hooky means to skip class or work. to British English", () => {
            assert.equal(americanToBritish("To play hooky means to skip class or work."), "To <span class=\"highlight\">bunk off</span> means to skip class or work.")
        })
        test("Translate No Mr. Bond, I expect you to die. to British English", () => {
            assert.equal(americanToBritish("No Mr. Bond, I expect you to die."), "No <span class=\"highlight\">Mr</span> Bond, I expect you to die.")
        })
        test("Translate Dr. Grosh will see you now. to British English", () => {
            assert.equal(americanToBritish("Dr. Grosh will see you now."), "<span class=\"highlight\">Dr</span> Grosh will see you now.")
        })
        test("Translate Lunch is at 12:15 today. to British English", () => {
            assert.equal(americanToBritish("Lunch is at 12:15 today."), "Lunch is at <span class=\"highlight\">12.15</span> today.")
        })

    })

    suite("British to American English translation tests", () => {
        test("Translate We watched the footie match for a while. to American English", () => {
            assert.equal(britishToAmerican("We watched the footie match for a while."), "We watched the <span class=\"highlight\">soccer</span> match for a while.")
        })
        test("Translate Paracetamol takes up to an hour to work. to American English", () => {
            assert.equal(britishToAmerican("Paracetamol takes up to an hour to work."), "<span class=\"highlight\">Tylenol</span> takes up to an hour to work.")
        })
        test("Translate First, caramelise the onions. to American English", () => {
            assert.equal(britishToAmerican("First, caramelise the onions."), "First, <span class=\"highlight\">caramelize</span> the onions.")
        })
        test("Translate I spent the bank holiday at the funfair. to American English", () => {
            assert.equal(britishToAmerican("I spent the bank holiday at the funfair."), "I spent the <span class=\"highlight\">public holiday</span> at the <span class=\"highlight\">carnival</span>.")
        })
        test("Translate I had a bicky then went to the chippy. to American English", () => {
            assert.equal(britishToAmerican("I had a bicky then went to the chippy."), "I had a <span class=\"highlight\">cookie</span> then went to the <span class=\"highlight\">fish-and-chip shop</span>.")
        })
        test("Translate I've just got bits and bobs in my bum bag. to American English", () => {
            assert.equal(britishToAmerican("I've just got bits and bobs in my bum bag."), "I've just got <span class=\"highlight\">odds and ends</span> in my <span class=\"highlight\">fanny pack</span>.")
        })
        test("Translate The car boot sale at Boxted Airfield was called off. to American English", () => {
            assert.equal(britishToAmerican("The car boot sale at Boxted Airfield was called off."), "The <span class=\"highlight\">swap meet</span> at Boxted Airfield was called off.")
        })
        test("Translate Have you met Mrs Kalyani? to American English", () => {
            assert.equal(britishToAmerican("Have you met Mrs Kalyani?"), "Have you met <span class=\"highlight\">Mrs.</span> Kalyani?")
        })
        test("Translate Prof Joyner of King's College, London. to American English", () => {
            assert.equal(britishToAmerican("Prof Joyner of King's College, London."), "<span class=\"highlight\">Prof.</span> Joyner of King's College, London.")
        })
        test("Translate Tea time is usually around 4 or 4.30. to American English", () => {
            assert.equal(britishToAmerican("Tea time is usually around 4 or 4.30."), "Tea time is usually around 4 or <span class=\"highlight\">4:30</span>.")
        })
    })

    suite("Highlight translation tests", () => {
        test("Highlight translation in Mangoes are my favorite fruit.", () => {
            assert.include(americanToBritish("Mangoes are my favorite fruit."), "<span class=\"highlight\">favourite</span>")
        })
        test("Highlight translation in I ate yogurt for breakfast.", () => {
            assert.include(americanToBritish("I ate yogurt for breakfast."), "<span class=\"highlight\">yoghurt</span>")
        })
        test("Highlight translation in We watched the footie match for a while.", () => {
            assert.include(britishToAmerican("We watched the footie match for a while."), "<span class=\"highlight\">soccer</span>")
        })
        test("Highlight translation in Paracetamol takes up to an hour to work.", () => {
            assert.include(britishToAmerican("Paracetamol takes up to an hour to work."), "<span class=\"highlight\">Tylenol</span>")
        })
    })

});
