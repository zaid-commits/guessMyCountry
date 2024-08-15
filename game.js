const countries = [
    { name: "United States", capital: "Washington D.C.", continent: "North America", language: "English", population: 331000000 },
    { name: "China", capital: "Beijing", continent: "Asia", language: "Mandarin", population: 1439000000 },
    { name: "India", capital: "New Delhi", continent: "Asia", language: "Hindi", population: 1380000000 },
    { name: "Brazil", capital: "Brasília", continent: "South America", language: "Portuguese", population: 212000000 },
    { name: "Russia", capital: "Moscow", continent: "Europe/Asia", language: "Russian", population: 145000000 },
    // Add more countries here
];

let currentCountry;
let score = 0;
let usedHints = new Set();

const hintContainer = document.getElementById('hint-container');
const guessInput = document.getElementById('guess-input');
const submitGuess = document.getElementById('submit-guess');
const newHintButton = document.getElementById('new-hint');
const resultElement = document.getElementById('result');
const scoreElement = document.getElementById('score').querySelector('span');

function startNewRound() {
    currentCountry = countries[Math.floor(Math.random() * countries.length)];
    usedHints.clear();
    hintContainer.textContent = "Ready for a new country! Get your first hint.";
    guessInput.value = '';
    resultElement.textContent = '';
}

function generateHint() {
    const hintTypes = [
        () => `The capital of this country is ${currentCountry.capital}.`,
        () => `This country is located in ${currentCountry.continent}.`,
        () => `The official language of this country is ${currentCountry.language}.`,
        () => `This country has a population of about ${currentCountry.population.toLocaleString()} people.`,
        () => `The name of this country starts with the letter "${currentCountry.name[0]}".`,
        () => `The name of this country has ${currentCountry.name.length} letters.`
    ];

    let availableHints = hintTypes.filter((_, index) => !usedHints.has(index));
    
    if (availableHints.length === 0) {
        return "No more hints available!";
    }

    const hintIndex = Math.floor(Math.random() * availableHints.length);
    usedHints.add(hintTypes.indexOf(availableHints[hintIndex]));
    return availableHints[hintIndex]();
}

function checkGuess() {
    const guess = guessInput.value.trim().toLowerCase();
    if (guess === currentCountry.name.toLowerCase()) {
        score++;
        scoreElement.textContent = score;
        resultElement.textContent = "Correct! Well done!";
        setTimeout(startNewRound, 2000);
    } else {
        resultElement.textContent = "Incorrect. Try again or get a new hint.";
    }
}

submitGuess.addEventListener('click', checkGuess);
guessInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkGuess();
});

newHintButton.addEventListener('click', () => {
    hintContainer.textContent = generateHint();
});

startNewRound();