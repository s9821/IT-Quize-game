
        // Quiz questions
        const quizQuestions = {
            easy: [
                {
                    question: "Which HTML tag is used to link an external JavaScript file?",
                    options: [
                        "&lt;script&gt;",
                        "&lt;js&gt;",
                        "&lt;javascript&gt;",
                        "&lt;link&gt;"
                    ],
                    answer: 0
                },
                {
                    question: "What does CSS stand for?",
                    options: [
                        "Computer Style Sheets",
                        "Creative Style Sheets",
                        "Cascading Style Sheets",
                        "Colorful Style Sheets"
                    ],
                    answer: 2
                },
                {
                    question: "Which symbol is used for single-line comments in JavaScript?",
                    options: [
                        "//",
                        "/*",
                        "#",
                        "--"
                    ],
                    answer: 0
                },
                {
                    question: "Which method adds new elements to the end of an array?",
                    options: [
                        "push()",
                        "pop()",
                        "shift()",
                        "unshift()"
                    ],
                    answer: 0
                },
                {
                    question: "What is the correct way to write an IF statement in JavaScript?",
                    options: [
                        "if (i == 5)",
                        "if i = 5",
                        "if i == 5 then",
                        "if i = 5 then"
                    ],
                    answer: 0
                }
            ],
            medium: [
                {
                    question: "What will be the output of: <code class='code-font'>console.log(2 + '2' - 1)</code>",
                    options: [
                        "21",
                        "3",
                        "22",
                        "NaN"
                    ],
                    answer: 1
                },
                {
                    question: "What does the 'this' keyword refer to in JavaScript?",
                    options: [
                        "The current function",
                        "The global object",
                        "The object that owns the executing code",
                        "The parent element in the DOM"
                    ],
                    answer: 2
                },
                {
                    question: "Which CSS property controls the space between elements' borders?",
                    options: [
                        "margin",
                        "padding",
                        "border-spacing",
                        "gap"
                    ],
                    answer: 0
                },
                {
                    question: "What is the purpose of the 'use strict' directive in JavaScript?",
                    options: [
                        "To enforce stricter type checking",
                        "To enable modern JavaScript features",
                        "To enforce better coding practices and catch common errors",
                        "To optimize code performance"
                    ],
                    answer: 2
                },
                {
                    question: "Which method is used to schedule a function to be called after a delay?",
                    options: [
                        "setImmediate()",
                        "setTimeout()",
                        "queueMicrotask()",
                        "process.nextTick()"
                    ],
                    answer: 1
                }
            ],
            hard: [
                {
                    question: "What is the output of: <code class='code-font'>console.log([] + [] + 'foo'.split(''))</code>",
                    options: [
                        "f,o,o",
                        "foo",
                        "f o o",
                        "TypeError"
                    ],
                    answer: 0
                },
                {
                    question: "What does the following CSS selector match: <code class='code-font'>div > p:first-child</code>",
                    options: [
                        "All p elements that are first children of their parent",
                        "All p elements that are first children of a div",
                        "The first p child of any div",
                        "All p elements that are direct children of a div and are first children"
                    ],
                    answer: 3
                },
                {
                    question: "What is the time complexity of accessing an element in a JavaScript object by its key?",
                    options: [
                        "O(1)",
                        "O(n)",
                        "O(log n)",
                        "O(n log n)"
                    ],
                    answer: 0
                },
                {
                    question: "Which HTML5 API allows web applications to store data locally in the user's browser?",
                    options: [
                        "WebSQL",
                        "IndexedDB",
                        "LocalStorage",
                        "All of the above"
                    ],
                    answer: 3
                },
                {
                    question: "What is the purpose of the Symbol data type in JavaScript?",
                    options: [
                        "To create unique property keys",
                        "To represent mathematical symbols",
                        "To optimize string comparisons",
                        "To enable operator overloading"
                    ],
                    answer: 0
                }
            ]
        };

        // Quiz state
        let currentQuestionIndex = 0;
        let score = 0;
        let timer;
        let timeLeft = 30;
        let quizStartTime;
        let selectedDifficulty = 'medium';
        let currentQuestions = [];

        // DOM elements
        const introScreen = document.getElementById('intro-screen');
        const quizContainer = document.getElementById('quiz-container');
        const resultsScreen = document.getElementById('results-screen');
        const startBtn = document.getElementById('start-btn');
        const nextBtn = document.getElementById('next-btn');
        const restartBtn = document.getElementById('restart-btn');
        const questionElement = document.getElementById('question');
        const optionsElement = document.getElementById('options');
        const currentQuestionElement = document.getElementById('current-question');
        const totalQuestionsElement = document.getElementById('total-questions');
        const scoreElement = document.getElementById('score-value');
        const finalScoreElement = document.getElementById('final-score');
        const correctAnswersElement = document.getElementById('correct-answers');
        const incorrectAnswersElement = document.getElementById('incorrect-answers');
        const timeTakenElement = document.getElementById('time-taken');
        const timeElement = document.getElementById('time');
        const progressFill = document.getElementById('progress-fill');
        const difficultySelect = document.getElementById('difficulty');

        // Event listeners
        startBtn.addEventListener('click', startQuiz);
        nextBtn.addEventListener('click', nextQuestion);
        restartBtn.addEventListener('click', restartQuiz);
        difficultySelect.addEventListener('change', (e) => {
            selectedDifficulty = e.target.value;
        });

        // Start the quiz
        function startQuiz() {
            quizStartTime = new Date();
            currentQuestions = [...quizQuestions[selectedDifficulty]];
            shuffleArray(currentQuestions);
            
            introScreen.classList.add('hidden');
            quizContainer.classList.remove('hidden');
            
            currentQuestionIndex = 0;
            score = 0;
            scoreElement.textContent = score;
            totalQuestionsElement.textContent = currentQuestions.length;
            
            showQuestion();
        }

        // Display the current question
        function showQuestion() {
            resetState();
            const currentQuestion = currentQuestions[currentQuestionIndex];
            currentQuestionElement.textContent = currentQuestionIndex + 1;
            
            questionElement.innerHTML = currentQuestion.question;
            
            currentQuestion.options.forEach((option, index) => {
                const button = document.createElement('button');
                button.classList.add('option', 'p-4', 'rounded-lg', 'text-left', 'mb-2');
                button.innerHTML = option;
                button.addEventListener('click', () => selectAnswer(index));
                optionsElement.appendChild(button);
            });
            
            startTimer();
            updateProgressBar();
        }

        // Reset the quiz state for the next question
        function resetState() {
            clearInterval(timer);
            timeLeft = 30;
            timeElement.textContent = timeLeft;
            nextBtn.classList.add('hidden');
            
            while (optionsElement.firstChild) {
                optionsElement.removeChild(optionsElement.firstChild);
            }
        }

        // Start the timer for the current question
        function startTimer() {
            timer = setInterval(() => {
                timeLeft--;
                timeElement.textContent = timeLeft;
                
                if (timeLeft <= 0) {
                    clearInterval(timer);
                    handleTimeOut();
                }
            }, 1000);
        }

        // Handle when time runs out
        function handleTimeOut() {
            const currentQuestion = currentQuestions[currentQuestionIndex];
            const options = optionsElement.querySelectorAll('.option');
            
            // Mark correct answer
            options[currentQuestion.answer].classList.add('correct');
            
            // Disable all options
            options.forEach(option => {
                option.style.pointerEvents = 'none';
            });
            
            // Show next button if not last question
            if (currentQuestionIndex < currentQuestions.length - 1) {
                nextBtn.classList.remove('hidden');
            } else {
                setTimeout(showResults, 1500);
            }
        }

        // Handle answer selection
        function selectAnswer(selectedIndex) {
            clearInterval(timer);
            const currentQuestion = currentQuestions[currentQuestionIndex];
            const options = optionsElement.querySelectorAll('.option');
            const isCorrect = selectedIndex === currentQuestion.answer;
            
            // Mark selected answer
            options[selectedIndex].classList.add(isCorrect ? 'correct' : 'incorrect');
            
            // Mark correct answer if wrong was selected
            if (!isCorrect) {
                options[currentQuestion.answer].classList.add('correct');
            } else {
                score++;
                scoreElement.textContent = score;
            }
            
            // Disable all options
            options.forEach(option => {
                option.style.pointerEvents = 'none';
            });
            
            // Show next button if not last question
            if (currentQuestionIndex < currentQuestions.length - 1) {
                nextBtn.classList.remove('hidden');
            } else {
                setTimeout(showResults, 1500);
            }
        }

        // Move to the next question
        function nextQuestion() {
            currentQuestionIndex++;
            showQuestion();
        }

        // Show the results screen
        function showResults() {
            quizContainer.classList.add('hidden');
            resultsScreen.classList.remove('hidden');
            
            const quizEndTime = new Date();
            const timeTaken = Math.floor((quizEndTime - quizStartTime) / 1000);
            
            finalScoreElement.textContent = score;
            correctAnswersElement.textContent = score;
            incorrectAnswersElement.textContent = currentQuestions.length - score;
            timeTakenElement.textContent = timeTaken;
        }

        // Restart the quiz
        function restartQuiz() {
            resultsScreen.classList.add('hidden');
            introScreen.classList.remove('hidden');
        }

        // Update progress bar
        function updateProgressBar() {
            const progress = ((currentQuestionIndex) / currentQuestions.length) * 100;
            progressFill.style.width = `${progress}%`;
        }

        // Fisher-Yates shuffle algorithm
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }
   