// quiz.js - Simple quiz game about heritage

const quizData = [{
        question: "Which of the following is an ancient Indian manuscript?",
        options: ["Rigveda", "The Odyssey", "Magna Carta", "The Tale of Genji"],
        answer: "Rigveda",
    },
    {
        question: "What is the primary purpose of an artifact in cultural heritage?",
        options: [
            "Decoration",
            "Historical evidence",
            "Food",
            "Sport",
        ],
        answer: "Historical evidence",
    },
    {
        question: "Which famous site is known as the 'Lost City of the Incas'?",
        options: ["Machu Picchu", "Petra", "Taj Mahal", "Great Wall of China"],
        answer: "Machu Picchu",
    },
];

const quizContainer = document.getElementById("quizContainer");
const submitBtn = document.getElementById("submitBtn");
const result = document.getElementById("result");

function buildQuiz() {
    const output = quizData.map((item, index) => {
        const optionsHTML = item.options
            .map(
                (opt) =>
                `<label><input type="radio" name="q${index}" value="${opt}" aria-labelledby="q${index}label" /> ${opt}</label>`
            )
            .join("<br>");
        return `
        <div class="card" tabindex="0" aria-labelledby="q${index}label" role="group" aria-describedby="q${index}desc">
            <h3 id="q${index}label">${item.question}</h3>
            <div id="q${index}desc">${optionsHTML}</div>
        </div>
        `;
    });
    quizContainer.innerHTML = output.join("");
    submitBtn.disabled = true; // disable submit initially until selection is made
    addOptionListeners();
}

function addOptionListeners() {
    const allOptions = quizContainer.querySelectorAll('input[type="radio"]');
    allOptions.forEach((option) => {
        option.addEventListener("change", () => {
            submitBtn.disabled = false;
            result.textContent = ""; // Clear previous result when changing answers
        });
    });
}

function showResults() {
    let score = 0;
    quizData.forEach((item, index) => {
        const selectedOption = document.querySelector(`input[name=q${index}]:checked`);
        if (selectedOption && selectedOption.value === item.answer) {
            score++;
        }
    });
    result.textContent = `You scored ${score} out of ${quizData.length}.`;
    submitBtn.disabled = true; // disable submit after submission
}

// Initialize quiz
buildQuiz();

submitBtn.addEventListener("click", showResults);