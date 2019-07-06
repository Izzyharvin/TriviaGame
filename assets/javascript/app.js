$(document).ready(function(){
    // event listeners
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click' , '.option', trivia.guessChecker);   
  })
  
  var trivia = {
    // trivia headings
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 30,
    timerOn: false,
    timerId : '',
    // questions options and answers data
    questions: {
      q1: 'What song did Wiz Khalifia made that the Steelers celebrate too?',
      q2: 'What movie Wiz Khalifa was in that presented him in High School?',
      q3: 'What is Wiz Khalifa group is called?',
      q4: 'Who did Wiz Khalifa have a son by?',
      q5: 'What city was Wiz Khalifa born?',
      q6: 'What album did Wiz Khalifa make in 2019?',
      q7: 'Which one of these people is in his group?'
    },
    options: {
      q1: ['Never Been', 'Taylor Gang', 'Black and Yellow', 'Wassup'],
      q2: ['Uncle Drew', 'Mac and Devin Goes to High School', 'The Culture High', 'Gang of Roses 2'],
      q3: ['Taylor Way', 'Music Gang', 'Hood Fame', 'Taylor Gang'],
      q4: ['Gabrille Union', 'Rihanna', 'Amber Rose', 'Jasmine Tookes'],
      q5: ['Pittsburgh','New Orleans','Atlanta','San Fransico'],
      q6: ['Fly Times Vol. 1: The Good Fly Young','Cabin Fever','Deal or No Deal','Star Power'],
      q7: ['Snoop Dogg', 'Currency', 'Lil Wayne','Drake']
    },
    answers: {
      q1: 'Black and Yellow',
      q2: 'Mac and Devin Goes to High School',
      q3: 'Taylor Gang',
      q4: 'Amber Rose',
      q5: 'Pittsburgh',
      q6: 'Fly Times Vol. 1: The Good Fly Young',
      q7: 'Currency'
    },
    // trivia methods
    // method to initialize game
    startGame: function(){
      // restarting game results
      trivia.currentSet = 0;
      trivia.correct = 0;
      trivia.incorrect = 0;
      trivia.unanswered = 0;
      clearInterval(trivia.timerId);
      
      // show game section
      $('#game').show();
      
      //  empty last results
      $('#results').html('');
      
      // show timer
      $('#timer').text(trivia.timer);
      
      // remove start button
      $('#start').hide();
  
      $('#remaining-time').show();
      
      // ask first question
      trivia.nextQuestion();
      
    },
    // method to loop through and display questions and options 
    nextQuestion : function(){
      
      // set timer to 30 seconds each question
      trivia.timer = 30;
       $('#timer').removeClass('last-seconds');
      $('#timer').text(trivia.timer);
      
      // keep timer at same pace
      if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);
      }
      
      // get all the questions then get the current questions
      var questionContent = Object.values(trivia.questions)[trivia.currentSet];
      $('#question').text(questionContent);
      
      // an array user options for the current question
      var questionOptions = Object.values(trivia.options)[trivia.currentSet];
      
      // create trivia in the html
      $.each(questionOptions, function(index, key){
        $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
      })
      
    },
    // method to counter and count unanswered if timer runs out
    timerRunning : function(){
      // if timer still has time left and there are still questions left to ask
      if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
        $('#timer').text(trivia.timer);
        trivia.timer--;
          if(trivia.timer === 4){
            $('#timer').addClass('last-seconds');
          }
      }
      // time has ran out and all the questions has been finished answer, run result
      else if(trivia.timer === -1){
        trivia.unanswered++;
        trivia.result = false;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
      }
      // when questions all been answer, show results
      else if(trivia.currentSet === Object.keys(trivia.questions).length){
        
        // adds results of game (correct, incorrect, unanswered) to the page
        $('#results')
          .html('<h3>Thank you for playing!</h3>'+
          '<p>Correct: '+ trivia.correct +'</p>'+
          '<p>Incorrect: '+ trivia.incorrect +'</p>'+
          '<p>Unaswered: '+ trivia.unanswered +'</p>'+
          '<p>Please play again!</p>');
        
        // hide game section
        $('#game').hide();
        
        // show start button to begin a new game after game is done
        $('#start').show();
      }
      
    },
    // method to evaluate the option clicked
    guessChecker : function() {
      
      // timer ID
      var resultId;
      
      // the answer to the question
      var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
      
      // if the answer is right to the question
      if($(this).text() === currentAnswer){
        // turn button green
        $(this).addClass('btn-success').removeClass('btn-info');
        
        trivia.correct++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Correct Answer!</h3>');
      }
      // if choosen the wrong answer
      else{
        // turn button clicked red
        $(this).addClass('btn-danger').removeClass('btn-info');
        
        trivia.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Better luck next time! '+ currentAnswer +'</h3>');
      }
      
    },
    // method to remove previous question results and options
    guessResult : function(){
      
      // increment to next question set
      trivia.currentSet++;
      
      // remove the options and results
      $('.option').remove();
      $('#results h3').remove();
      
      // next question
      trivia.nextQuestion();
       
    }
  
  }