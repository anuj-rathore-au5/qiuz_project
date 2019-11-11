
var countdown = 30;   //timer countdown variable
function timer_30s(){
    $('#countdown-number').text(countdown)
    if(countdown==0){
        alert('time up!')
        clearInterval(timer)
        
    }
    else{
        countdown = --countdown
    }
}

var timer=setInterval(timer_30s, 1000);

var random_no4 = [];  //varaible used for storing 4 random no. used for raido button selection
// random number generator between 0 to 3
let numberGenerator = function(arr) {
  if (arr.length >= 4) return;
  let newNumber = Math.floor(Math.random() * (3 - 0 + 1) ) + 0;
  if (arr.indexOf(newNumber) < 0) {
    arr.push(newNumber);
    console.log('no added')
  }
  numberGenerator(arr);
};

var four_option = []

// document ready function contains functions which are needed when document ready
$(document).ready(function(){
    $('#countdown').removeClass('hidden')
    
    $('#start_quiz').on('click',function(){
        $('#quiz_div').removeClass('hidden')
        $('#welcom_div').addClass('hidden')
    })
    

    var question_array = [];
    var randomnumber;
    var score_coins = 00;

    function display_question(){
        random_no4 =[];
        numberGenerator(random_no4);
        randomnumber = Math.floor((Math.random() * 19) + 1);
        console.log(question_array[0].results)
        // displaying question
        console.log(randomnumber)
        $('#question').html('Q.'+question_array[0].results[randomnumber].question)
        $('#option_ol').removeClass('hidden')
        // storing all the answers in array
        four_option[0]=question_array[0].results[randomnumber].incorrect_answers[0]
        four_option[1]=question_array[0].results[randomnumber].correct_answer
        four_option[2]=question_array[0].results[randomnumber].incorrect_answers[1]
        four_option[3]=question_array[0].results[randomnumber].incorrect_answers[2]
        // displaying four options
        $('#op1').html(' '+four_option[random_no4[0]])
        $('#op2').html(' '+four_option[random_no4[1]])
        $('#op3').html(' '+four_option[random_no4[2]])
        $('#op4').html(' '+four_option[random_no4[3]])
        console.log(four_option)
        // assigning values to raido button
        $('#option1').val(four_option[random_no4[0]])
        $('#option2').val(four_option[random_no4[1]])
        $('#option3').val(four_option[random_no4[2]])
        $('#option4').val(four_option[random_no4[3]])

        console.log($('#option1').val())
        console.log($('#option2').val())
        console.log($('#option3').val())
        console.log($('#option4').val())
        console.log(question_array[0].results[randomnumber].correct_answer)
        console.log(random_no4)
    }

    function start_quiz(){
        $.ajax({
            url:'https://opentdb.com/api.php?amount=20&category=9&difficulty=medium&type=multiple',
            success:function(response){
                console.log(response)
                question_array[0] = response;
                console.log(question_array[0].results[3].question)
                display_question() 
            },
            error:function(){
                alert('something is wrong')
            }

        });
    }
    start_quiz()
    

    var quote_update = setInterval(function(){
        $.ajax({
            url:'https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand',
            success:function(response){
                // console.log(response)
                // console.log(response[0].content.rendered)
                // console.log(response[0].title.rendered)
                var ram_number = Math.floor((Math.random() * 10) + 1); 
                $('blockquote').html(response[ram_number].content.rendered)
                $('cite').text(response[ram_number].title.rendered)
                },
            error:function(response){
                alert('something went wrong')
                }
            });

    },10000);

    function match_answer(){
        console.log('hello')
        var right_answer = question_array[0].results[randomnumber].correct_answer;
        if($("input[name='options']:checked").val() == right_answer){
            alert('hello')

        }
        else{
            alert('oops')
        }
        score_coins++
        $('#scoretag').html("<strong>SCORE</strong>"+score_coins)
        display_question()


    }
    $('#submit_answer').on('click',match_answer)
    $('#skip').on('click',display_question)




    });



