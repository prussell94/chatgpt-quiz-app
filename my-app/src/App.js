// export default App
import React, { useState, useEffect } from 'react';
import QuizGenerator from './Components/QuizGenerator';

const QuizApp = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [optionColors, setOptionColors] = useState(Array(4).fill('lightssteelblue'));
  const [isAnswered, setIsAnswered] = useState(false);
  const [totalCorrectAnswers, setTotalCorrectAnswers] = useState(0);
  const [currentQuestion, setcurrentQuestion] = useState('');
  const [allQuestions, setAllQuestions] = useState('');
  const [startPage, setStartPage] = useState(true);
  const [data, setData] = useState('[]');
  const [quizGenerated, setQuizGenerated] = useState(false);

  // useEffect(() => {
  //   setAllQuestions(prevQuestions => [...prevQuestions, currentQuestion]);
  // }, [currentQuestion]);


  const resetButtonColors = () => {
    setOptionColors(Array(4).fill('lightsteelblue'));
  };

  const handleOptionClick = (selectedOptionIndex) => {
    if (!isAnswered) {
      const isCorrect = currentQuestion.choices[selectedOptionIndex+1] === currentQuestion.answer.correctAnswer;
      console.log("user anwer ----")
      console.log(currentQuestion.choices[selectedOptionIndex+1])
      console.log("correct answer-------")
      console.log(currentQuestion.answer.correctAnswer)
      const newOptionColors = Array(4).fill('gray'); // Disable all buttons
      newOptionColors[selectedOptionIndex] = isCorrect ? 'green' : 'red';

      setOptionColors(newOptionColors);
      setIsAnswered(true);
      if (isCorrect) {
        setTotalCorrectAnswers(totalCorrectAnswers + 1);
      }
    }
  };

  const handleNextQuestionClick = () => {
    // Increment the current question index
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  
    // Check if there are more questions available
    if (currentQuestionIndex + 1 < allQuestions.length) {
      // If yes, update the current question state with the next question
      setcurrentQuestion(allQuestions[currentQuestionIndex + 1]);
      
      // Reset option colors and answer state for the new question
      setOptionColors(Array(4).fill('lightsteelblue'));
      setIsAnswered(false);
    } else {
      // If there are no more questions, handle accordingly (e.g., show a message)
      console.log("No more questions available");
    }
  };

  const handleQuizGenerated = (questions) => {
    console.log('questions------')
    console.log(questions)
    console.log(typeof(questions))
    let allQuestionsArray = [];
  
    // Parse the JSON string only if it's not empty
    if (questions) {
      let questionObject;
      console.log("number of questions -----");

      console.log("qqqq")
      console.log(allQuestions)

      console.log(questions)

      // setAllQuestions(questions)

      if(questions.length > 1) {
        const firstQuestion=questions[currentQuestionIndex];
        const questionObject = JSON.parse(firstQuestion);

        setcurrentQuestion(questionObject);
        // setAllQuestions(questionObject);

        for (let i = 0; i < questions.length; i++) {
          console.log(i);
          allQuestionsArray.push(JSON.parse(questions[i]))
          // setAllQuestions(JSON.parse(questions[1]))
        }

        setAllQuestions(allQuestionsArray)
        console.log("all questions array first entry")
        console.log(allQuestionsArray[0])

      } else {
        const questionObject = JSON.parse(questions);
        setcurrentQuestion(questionObject);
      }

      questionObject = JSON.parse(questions[1]);

      setCurrentQuestionIndex(0);
      setOptionColors(Array(4).fill('lightssteelblue'));
      setIsAnswered(false);
      setTotalCorrectAnswers(0);
      setStartPage(false);
      setQuizGenerated(true);

      resetButtonColors();
    }

  };

  // let questionObject = JSON.parse(currentQuestion);

  return (
<div>
    <QuizGenerator resetButtonColors={resetButtonColors} onQuizGenerated={handleQuizGenerated} />
    <div className="container">
      {quizGenerated ? (
        <>
          <div id="question-header">
          <h3>{currentQuestion?.choices[0]}</h3>
          {/* <h3>{allQuestions[0]?.choices[0]}</h3> */}
          {/* <h3>{questionObject.question}</h3> */}
            {/* <h3>{currentQuestion[currentQuestionIndex]?.question}</h3> Use optional chaining to prevent errors if currentQuestion is undefined */}
          </div>
          {currentQuestion?.choices.slice(1).map((option, index) => ( // Use optional chaining here as well if needed
              <div class="buttonDiv">
                <button class="mcOption"
                  key={index}
                  style={{ backgroundColor: optionColors[index] }}
                  onClick={() => handleOptionClick(index)}
                  disabled={isAnswered}
                >
                  {option}
                </button>
              </div>
            ))}
            {isAnswered && (
              <button onClick={handleNextQuestionClick} className="next-question">Next Question</button>
            )}
        </>
      ) : (
        <div id="opening-container">
          <h2>Use the filter to the left to create a new quiz</h2>
        </div>
      )}
    </div>
  </div>
  );
};

export default QuizApp;

