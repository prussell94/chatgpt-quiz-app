import PropTypes from 'prop-types'
import Button from './Button'
import React, {useEffect, useState} from 'react'


const MultipleChoiceOptions = ( {buttonColor, optionA, optionB, optionC, optionD, correctAnswer, nextButtonClicked} ) => {
    const [currentColor, setCurrentColor] = useState(''); // Initialize with the current color

    const isCorrect = (correctAnswer, event) => {
    
        const option=event.target
        const computedStyles = window.getComputedStyle(option);
        const optionText = option.textContent
        console.log(correctAnswer)
        console.log(optionText)
        if(optionText==correctAnswer) {
            option.style.backgroundColor='green'
        } else {
            option.style.backgroundColor='red'
        }
      }

    return (
        <div id="mcContainer">
            <button className="mcOptions" onClick={(event) => isCorrect(correctAnswer, event)} buttonColor={buttonColor}>{optionA}</button>
            <button className="mcOptions" onClick={(event) => isCorrect(correctAnswer, event)} buttonColor={buttonColor}>{optionB}</button>
            <button className="mcOptions" onClick={(event) => isCorrect(correctAnswer, event)} buttonColor={buttonColor}>{optionC}</button>
            <button className="mcOptions" onClick={(event) => isCorrect(correctAnswer, event)} buttonColor={buttonColor}>{optionD}</button>
        </div>
    )
  }

  export default MultipleChoiceOptions