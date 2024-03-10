// import PropTypes from 'prop-types'
// import Header from './Header'
// import MultipleChoiceOptions from './MultipleChoiceOptions'
// import React, {useEffect, useState} from 'react'


// const Questions = ( {questions, buttonColor, optionColors, currentQuestion,handleOptionClick} ) => {

//       // State to hold the filtered array
//   const [question, setQuestion] = useState();

//     return (
//         // <div>
//         //     <div>
//         //         <Header title='ChatGPT Trivia' topic="Movies" difficulty="Easy" question="Who won the Oscar for Best Actor for Dallas Buyer's Club"/>
//         //     </div>
//         //     <MultipleChoiceOptions optionA="Robert De Niro" optionB="Ryan Gosling" optionC="Woody Harrelson" optionD="Matthew Mcconaughey"/>
//         // </div>
//         <>
//         {/* {questions.map((Question) => ( */}
//         {/* <div> */}
//             {/* <div>
//                 <Header topic={Question.topic} difficulty={Question.difficulty} question={Question.question}/>
//             </div> */}
//             {questions[currentQuestion].options.map((option, index) => (
//             <button
//                 key={index}
//                 style={{ backgroundColor: optionColors[index] }}
//                 onClick={() => handleOptionClick(index)}
//             >
//             {option}
//             </button>
//       ))}
//             {/* < MultipleChoiceOptions buttonColor={buttonColor} optionA={Question.optionA} optionB={Question.optionB} optionC={Question.optionC} optionD={Question.optionD} correctAnswer={Question.correctAnswer} nextButtonClicked={nextButtonClicked}/> */}
//         {/* </div>
//         ))} */}
//         </>
//     )
// } 

// export default Questions

import PropTypes from 'prop-types'
import Header from './Header'
import MultipleChoiceOptions from './MultipleChoiceOptions'
import React, { useEffect, useState } from 'react'

const Questions = ({ questions, buttonColor, optionColors, setOptionColors, currentQuestion}) => {
  // State to hold the filtered array
//   const [question, setQuestion] = useState();

// const [optionColors, setOptionColors] = useState(Array(4).fill('beige')); // Assuming 4 options

const handleOptionClick = (optionIndex, currentQuestion) => {
    console.log("questions-----")
    console.log(currentQuestion)

    console.log(questions[currentQuestion])
    const newOptionColors = [...optionColors];
    if (questions[currentQuestion].options[optionIndex] === questions[currentQuestion].correctAnswer) {
      newOptionColors[optionIndex] = 'green'; // Correct answer turns green
    } else {
      newOptionColors[optionIndex] = 'red'; // Incorrect answer turns red
    }
    // setOptionColors(newOptionColors);
  };

console.log("option colors")
console.log(optionColors)
    // Check if questions is truthy before rendering
    if (!questions || !questions.length) {
        console.log('null')
        return null; // or render a loading spinner or message
      }
    

  return (
    <>
      {questions.map((question, index) => (
        <div key={index}>
          <div>
            <Header topic={question.topic} difficulty={question.difficulty} question={question.question} />
          </div>
          {question.options.map((option, optionIndex) => (
            <button
              key={optionIndex}
              style={{ backgroundColor: optionColors[optionIndex] }}
              onClick={() => handleOptionClick(optionIndex, index)}
            >
              {option}
            </button>
          ))}
        </div>
      ))}
    </>
  )
}

Questions.propTypes = {
  questions: PropTypes.array.isRequired,
  buttonColor: PropTypes.string,
  optionColors: PropTypes.array,
  currentQuestion: PropTypes.number,
  handleOptionClick: PropTypes.func.isRequired
}

export default Questions


