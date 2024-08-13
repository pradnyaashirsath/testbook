let currentQuestion = 0;
let score = 0;
let totalQuestions = 10;
let selectedCategory = '';
let userName = '';
let timer;
let timeLeft = 10;

const questions = {
    pipes: [
        { question: "Three taps A, B, and C can fill a tank in 12, 15, and 20 hours respectively. If A is open all the time and B & C are open for one hour each alternatively, the tank will be full in:", options: ["6 hrs", "20 hrs", "7 hrs", "15.2 hrs"], correct: 3 },
        { question: "If two pipes A and B can fill a tank in 15 minutes and 10 minutes respectively, how long will it take to fill the tank together?", options: ["6 minutes", "8 minutes", "7 minutes", "5 minutes"], correct: 2 },
        // Add more questions here...
    ],
    probability: [
        { question: "What is the probability of getting a sum of 7 when two dice are thrown?", options: ["1/6", "1/3", "5/36", "1/12"], correct: 1 },
        // Add more questions here...
    ],
    age: [
        { question: "If the present age of the father is 3 times the age of his son and after 5 years it will be twice, find the present age of the son.", options: ["5 years", "10 years", "15 years", "20 years"], correct: 2 },
        // Add more questions here...
    ],
    profit: [
        { question: "A man sells an article at 5% loss. If he had sold it for Rs. 50 more, he would have gained 5%. The cost price of the article is:", options: ["Rs. 1000", "Rs. 500", "Rs. 750", "Rs. 800"], correct: 1 },
        // Add more questions here...
    ]
};

function startQuiz() {
    userName = document.getElementById("name").value;
    if (userName === '') {
        alert("Please enter your name!");
        return;
    }
    document.getElementById("home").style.display = "none";
    document.getElementById("category").style.display = "block";
}

function loadQuiz(category) {
    selectedCategory = category;
    currentQuestion = 0;
    score = 0;
    document.getElementById("category").style.display = "none";
    document.getElementById("quiz").style.display = "block";
    document.getElementById("quiz-category").innerText = category.charAt(0).toUpperCase() + category.slice(1);
    nextQuestion();
}

function nextQuestion() {
    if (currentQuestion >= totalQuestions) {
        endQuiz();
        return;
    }
    
    clearInterval(timer);
    document.getElementById("next-question").style.display = "none";
    document.querySelectorAll('#options button').forEach(button => {
        button.classList.remove('correct', 'wrong');
    });
    
    const question = questions[selectedCategory][currentQuestion];
    document.getElementById("question-number").innerText = `Question ${currentQuestion + 1}`;
    document.getElementById("question-text").innerText = question.question;
    document.getElementById("option1").innerText = question.options[0];
    document.getElementById("option2").innerText = question.options[1];
    document.getElementById("option3").innerText = question.options[2];
    document.getElementById("option4").innerText = question.options[3];
    
    timeLeft = 10;
    document.getElementById("time").innerText = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time").innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
    
    currentQuestion++;
}

function submitAnswer(selectedOption) {
    clearInterval(timer);
    const question = questions[selectedCategory][currentQuestion - 1];
    
    if (question.correct === selectedOption) {
        score++;
        document.getElementById(`option${selectedOption}`).classList.add('correct');
    } else {
        document.getElementById(`option${selectedOption}`).classList.add('wrong');
        document.getElementById(`option${question.correct}`).classList.add('correct');
    }
    
    setTimeout(nextQuestion, 1000);
}

function endQuiz() {
    document.getElementById("quiz").style.display = "none";
    document.getElementById("result").style.display = "block";
    
    document.getElementById("result-name").innerText = `Name: ${userName}`;
    document.getElementById("total-time").innerText = `${100 - (10 * totalQuestions)}`; // Adjust based on timing logic
    document.getElementById("attempted").innerText = totalQuestions;
    document.getElementById("correct").innerText = score;
    document.getElementById("wrong").innerText = totalQuestions - score;
    document.getElementById("percentage").innerText = (score / totalQuestions) * 100;
}

function startAgain() {
    document.getElementById("result").style.display = "none";
    document.getElementById("home").style.display = "block";
}

function goHome() {
    document.getElementById("result").style.display = "none";
    document.getElementById("home").style.display = "block";
}
