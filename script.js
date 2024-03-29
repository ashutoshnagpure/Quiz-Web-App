/**
 * Author:- Ashutosh Nagpure
 * Date:- 2024-02-19
 * Day:- CURRENT_WEEKDAY
 * Topic :- Quiz Web-App
 */

const questions = [
    {     //question 1
        question: "Which is largest animal in the world ?",
        answers: [
            {text: "Shark", correct : false},
            {text: "Blue Whale", correct : true},
            {text: "Elephant", correct : false},
            {text: "Cat", correct : false},
        ]
    },
    {         // question 2
        question: "What is the capital of India?",
        answers: [
            {text: "New Delhi", correct : true},
            {text: "Goa", correct : false},
            {text: "Nagpur", correct : false},
            {text: "Mumbai", correct : false},
        ]
    },
    {     // question 3
        question: "Who is the current Prime Minister of India?",
        answers: [
            {text: "Nitin Gadkari", correct : false},
            {text: "Rahul gandhi", correct : false},
            {text: "Narendra Modi", correct : true},
            {text: "Nehru", correct : false},
        ]

    },
    { // question 4
        question: "Who heads the RBI?",
        answers: [
            {text: "Governer", correct : true},
            {text: "Cm", correct : false},
            {text: "Pm", correct : false},
            {text: "Army minister", correct : false},
        ]
    },
    {  // question 5
        question: "Who is the current President of India?",
        answers: [
            {text: "Nitin Gadkari", correct : false},
            {text: "Narendra Modi", correct : false},
            {text: "Droupadi Murmu", correct : true},
            {text: "Rahul gandhi", correct : false},
        ]

    }

];

const questionElement = document.querySelector("#question");
const answerButtons = document.querySelector("#answer-button");
const nextButton = document.querySelector("#next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHtml = "Next"; 
    showQuestion();
}

function showQuestion(){
    resetstate();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML= answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}


function resetstate(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }

}




function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetstate();
    questionElement.innerHTML = ` You scored ${score} out of ${questions.length}!`
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
};


nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
showQuestion();