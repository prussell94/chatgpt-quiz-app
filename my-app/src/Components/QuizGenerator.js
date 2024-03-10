import React, { useState, useEffect } from 'react';

const QuizGenerator = ({ resetButtonColors, onQuizGenerated }) => {
  const [selectedTopic, setSelectedTopic] = useState('');

  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedNumberOfQuestions, setSelectedNumberOfQuestions] = useState(0);
  const [quizGenerated, setQuizGenerated] = useState(false);
  const [quiz, setQuiz] = useState([]);
  const [formData, setFormData] = useState({
    topic: '',
    difficulty: '',
    numberOfQuestions: '',
  });
  const [returnedQuestions, setReturnedQuestions] = useState([]);
  
  const originalQuestions = [
    {
      id: 1,
      order_id: 1,
      question: "Who won the Oscar for Best Actor for Dallas Buyer's Club",
      options: ["Robert De Niro", "Ryan Gosling", "Woody Harrelson", "Matthew Mcconaughey"],
      correctAnswer: "Matthew Mcconaughey",
      topic: "Film",
      difficulty: "Easy"
    },
    {
      id: 2,
      order_id: 2,
      question: "Which 1993 film grossed the largest box office performance at that time?",
      options: ["Pulp Fiction", "Jurassic Park", "Titanic", "Toy Story"],
      correctAnswer: "Jurassic Park",
      topic: "Film",
      difficulty: "Easy"
    },
    {
      id: 3,
      order_id: 3,
      question: "Which movie included the popular quote 'you talkin' to me'?",
      options: ["Taxi Driver", "Raging Bull", "Mean Streets", "Mulholland Drive"],
      correctAnswer: "Taxi Driver",
      topic: "Film",
      difficulty: "Easy"
    },     {
        id: 4,
        order_id: 4,
        question: "What is the capital of Turkey",
        options: ["Istanbul", "Ankara", "Belgrade", "Zagreb"],
        correctAnswer: "Ankara",
        topic: "Geography",
        difficulty: "Easy"
      }
  ];

//   useEffect(() => {
//     // Fetch questions from the backend
//     fetch('/api/questions')
//       .then(response => response.json())
//       .then(data => {
//         // Set the fetched questions in the state
//         setQuizQuestions(data);
//         // Pass the fetched questions to the parent component
//         onQuizGenerated(data);
//       })
//       .catch(error => console.error('Error fetching questions:', error));
//   }, []); // Empty dependency array to run the effect only once

  const handleChange = (e) => {
    const { name, value } = e.target; 
    setFormData({ ...formData, [name]: value });
    setSelectedSelection(name, value);
  };

  const handleAsyncSubmit = (e) => {
    e.preventDefault();
  
    fetch('/api/submit-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => {
      if (response.ok) {
        return response.json(); // Parse the response body
      } else {
        throw new Error('Error submitting form response not ok: ' + response.statusText);
      }
    })
    .then(body => {
      // Handle success
      console.log('Form submitted successfully!');
      console.log('Response body:', body);

      // Set state variables
      setQuiz(body);
      setReturnedQuestions(body);
      setQuizGenerated(true);
      onQuizGenerated(body);
      resetButtonColors();
    })
    .catch(error => {
      // Handle error
      console.error('Error submitting form:', error.message);
    });
  };

  // const handleAsyncSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await fetch('/api/submit-form', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     if (response.ok) {
  //       // Handle success, e.g., show a success message
  //       console.log('Form submitted successfully!');
  //       const body = await response.json(); // Get the response body
  //       console.log("response-----from-----form----submit------")
  //       console.log(response)
  //       // console.log(JSON.parse(body))
  //       console.log(body)  
  

  //       // const filteredQuiz = body.filter(question => {
  //       //     return (
  //       //       question.topic === selectedTopic &&
  //       //       question.difficulty === selectedDifficulty
  //       //     );
  //       //   })

  //       console.log("can parse json?")
  //       // console.log(JSON.parse(body)['question'])
  //       // Shuffle the filtered questions array
  //       // const shuffledQuiz = [...filteredQuiz].sort(() => Math.random() - 0.5);
  
  //       // const selectedQuestions = shuffledQuiz.slice(0, selectedNumberOfQuestions);
  //       setQuiz(body);
  //       setReturnedQuestions(body);
  //       setQuizGenerated(true);
  //       onQuizGenerated(body);
  //       resetButtonColors();

  //   } else {
  //       // Handle error responses
  //       console.error('Error submitting form response not ok:', response.statusText);
  //     }
  //   } catch (error) {
  //     console.error('Error submitting form:', error.message);
  //   }
  // };

  const setSelectedSelection = (name, value) => {
    if(name === 'topic') {
        setSelectedTopic(value)
    } else if( name === 'difficulty') {
        setSelectedDifficulty(value)
    } else if(name === 'numberOfQuestions') {
        setSelectedNumberOfQuestions(value)
    }
  }


  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    const filteredQuiz = originalQuestions.filter(question => {
      return (
        question.topic === selectedTopic &&
        question.difficulty === selectedDifficulty
      );
    });
  
    // Shuffle the filtered questions array
    const shuffledQuiz = [...filteredQuiz].sort(() => Math.random() - 0.5);
  
    const selectedQuestions = shuffledQuiz.slice(0, selectedNumberOfQuestions);
    console.log("selected questions-------")
    console.log(selectedQuestions)
    console.log(JSON.parse(selectedQuestions))
    setQuiz(selectedQuestions);
    setQuizGenerated(true);
    onQuizGenerated(selectedQuestions);
  };

  return (
    <div>
      <div className="filter">
        <form onSubmit={handleAsyncSubmit}>
          <div className="filter-row">
            <label>
              Topic:
              <div className="filter-options">
              <select name="topic" value={selectedTopic} onChange={handleChange}>
                <option value="">Select Topic</option>
                  <option value="Film">Film</option>
                  <option value="Geography">Geography</option>
                  <option value="Science">Science</option>
                  <option value="History">History</option>
                  <option value="Sports">Sports</option>
                </select>
              </div>
            </label>
          </div>
          <div className="filter-row">
            <label>
              Difficulty:
              <div className="filter-options">
                <select name="difficulty" value={selectedDifficulty} onChange={handleChange}>
                  <option value="">Select Difficulty</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </label>
          </div>
          <div className="filter-row">
            <label>
              Number of Questions:
              <div className="filter-options">
                <select name="numberOfQuestions" value={selectedNumberOfQuestions} onChange={handleChange}>
                  <option value="">Select Number of Questions</option>
                  <option value="1">1</option>
                  <option value="3">3</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                </select>
              </div>
            </label>
          </div>
          <button id="generateQuizButton" type="submit">Generate Quiz</button>
        </form>
      </div>
      {quizGenerated && <p>Quiz generated with {quiz.length} questions.</p>}
    </div>
  );
};

export default QuizGenerator;