export const quizData = [
  {
    id: 1,
    question: "What does the 'DOM' stand for in web development?",
    options: [
      "Document Object Model",
      "Data Object Management",
      "Digital Ordinal Map",
      "Document Orientation Method",
    ],
    answer: 0,
  },
  {
    id: 2,
    question: "Which keyword is used to declare a variable in ES6?",
    options: ["var", "let", "constant", "val"],
    answer: 1,
  },
  {
    id: 3,
    question: "What is an IIFE in JavaScript?",
    options: [
      "Internal Integrated Function Entity",
      "Immediately Invoked Function Expression",
      "Initial Instance Flow Execution",
      "Interactive Interface For Emails",
    ],
    answer: 1,
  },
  {
    id: 4,
    question:
      "Which method is used to add a new element to the end of the DOM?",
    options: ["push()", "append()", "appendChild()", "insertAfter()"],
    answer: 2,
  },
  {
    id: 5,
    question: "What is the purpose of the 'async' keyword?",
    options: [
      "To make a function run synchronously",
      "To define an asynchronous function",
      "To accelerate script execution",
      "To handle CSS animations",
    ],
    answer: 1,
  },
];

export const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(function () {
      resolve(quizData);
    }, 300);
  });
};

export const processQuizData = (data, callback) => {
  console.log("Processing questions...");
  callback(data);
};

export const calculateScore = (currentScore, points) => {
  return currentScore + points;
};
