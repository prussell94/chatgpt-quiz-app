    // $('button').click(function() {
    //     location.reload();
    // });
    function reload() {
        location.reload();
    }

    function filterQuiz() {
            event.preventDefault();    // prevent page from refreshing

            var form = document.getElementById("topic_container")

            var topic_value = document.getElementById('topic').value;
            var difficulty_value = document.getElementById('difficulty').value;
            // var difficulty_value = document.getElementById("difficulty").value;
            // var nofq_value = document.getElementById("nofq").value;

            $.ajax({
                url: '/filterQuiz',
                type: 'POST',
                datatype: 'json',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                // data: {'topic': topic_value, 'difficulty': difficulty_value, 'nofq': nofq_value},
                data: JSON.stringify({'topic': topic_value, 'difficulty': difficulty_value}),

                success: function(response) {
                    document.getElementById('topicDiv').innerHTML = JSON.parse(JSON.stringify(response)).topic
                    document.getElementById('difficultyDiv').innerHTML = JSON.parse(JSON.stringify(response)).difficulty
                    document.getElementById('questionDiv').innerHTML = JSON.parse(JSON.stringify(response)).questions.choices

                    correctAnswer = JSON.parse(JSON.stringify(response)).answer
                    // document.getElementById('answerDiv').innerHTML = correctAnswer

                    questions = JSON.parse(JSON.stringify(response)).questions
                                        
                    // Now, you can access individual questions in the array
                    // for (var i = 0; i < questions.length; i++) {
                    //     var question = questionsArray[i];
                    //     console.log("Question Choice:", question.choices[0]);
                    // }


                    // q1 =JSON.parse(JSON.stringify(response)).questions[0]["choices"]
                    // for (var key in q1) {
                    //     document.getElementById('answerDiv').innerHTML="cats"

                    //     if (myJsonObject.hasOwnProperty(key)) {
                    //         console.log(key);
                    //     }
                    // }

                    // outerJson = JSON.parse(JSON.stringify(response)).questions[0]

                    document.getElementById('buttonA').innerHTML = JSON.parse(JSON.stringify(response)).questions[0]["choices"][1]
                    document.getElementById('buttonB').innerHTML = JSON.parse(JSON.stringify(response)).questions[0]['choices'][2]
                    document.getElementById('buttonC').innerHTML = JSON.parse(JSON.stringify(response)).questions[0]['choices'][3]
                    document.getElementById('buttonD').innerHTML = JSON.parse(JSON.stringify(response)).questions[0]['choices'][4]

                    console.log("testing")
                    console.log(correctAnswer)
                    console.log(answerB)
                    if(correctAnswer.trim() == answerB.trim()) {
                        document.getElementById('buttonB').style.backgroundColor="#FF0000";
                    }

                    document.getElementById('answerDiv').innerHTML=answerB
                    // document.getElementById('buttonB').style.backgroundColor="#11BB00";




                    // document.getElementById('valueDiv').innerHTML = JSON.parse(JSON.stringify(response)).value
                    // document.getElementById('seasonDiv').innerHTML = JSON.parse(JSON.stringify(response)).season
                    // document.getElementById('aanswer').innerHTML = JSON.parse(JSON.stringify(response)).correctAnswer
                    // document.getElementById('aanswer').style.backgroundColor = "aqua"
                    // questionIdG = JSON.parse(JSON.stringify(response)).questionId
                    // correctAnswerG = JSON.parse(JSON.stringify(response)).correctAnswer
                    // filtered=true;

                    // set a variable such that we know that filtered has returned something, then when submit check if variable is present
                },
                error: function(error) {
                    console.log(error);
                }
            });
        }

    function nextQuestion() {
        event.preventDefault()


    }

    function checkAnswer(buttonId) {
        event.preventDefault();

        correctAnswer = document.getElementById('answerDiv').innerHTML = correctAnswer

        option = document.getElementById(buttonId).innerHTML

        if(correctAnswer == option) {
            document.getElementById(buttonId).style.backgroundColor="#11BB00";
        } else {
            document.getElementById(buttonId).style.backgroundColor="#BB3300";
        }

    }

    function showAns() {
      document.getElementById("answerH").style.display = "block";
    }
    function showAnsButton() {
        document.getElementById("showAnswer").style.display = "block";
        return false;
    }

    // var form = document.getElementById("")
    var answerButton = document.getElementById("answerForm");
    var showAnswerButton = document.getElementById("showAnswer");
    var submitAnswerButton = document.getElementById("submitAnswerButton")
    answerButton.addEventListener("click",function(e){ 
        showAnswerButton.style.display = "block"
        // submitAnswerButton.style.display = "none"
        // e.preventDefault();
    });
