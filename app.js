/*Here is the logic: two players roll a die simultaneously and whoever gets to the target point first wins. 
The hold button holds the count on a die in the current score as players are allowed to roll a multiple times as long as 
they do not roll a 1 which makes them lose the current score and initiates the next turn*/
var currentScore, score, activePlayer, ayo, gameOn;
score = [0,0];
currentScore = 0;
activePlayer = 0;
gameOn = true;


//I want to create an init function that clears all the value on the screen and also hides the die on start
function initAll(){
    //This clears the all the scores 
    document.querySelector('#score-0').textContent = '0';
    document.querySelector('#score-1').textContent = '0';
    init();
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active'); 
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner'); 
    document.querySelector('.player-0-panel').classList.add('active'); 
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    score = [0,0];
    activePlayer = 0;
};
function init(){
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';
    document.querySelector('.dice').style.visibility = 'hidden';
    currentScore = 0;
};
initAll();
function nextPlayer(){
    //this clears the current score and makes the die invisible when it's the next player's turn
    init();
    /*if (activePlayer==0) {
        activePlayer = 1;
    } else {activePlayer = 0;
    }; alt for the code below*/
       activePlayer === 0? activePlayer = 1 : activePlayer = 0;

    //This changes the inerface to the active player
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
};
//Activating the roll die button and causing it to change the die image in the centre
document.querySelector('.btn-roll').addEventListener('click', function(){
    if (gameOn){
        //generating the die count
        var dice = Math.floor(Math.random()*6) + 1;
        //displaying the die count
        var dieAnchor = document.querySelector('.dice');
        dieAnchor.src = "dice-" + dice + ".png";
        document.querySelector('.dice').style.visibility = 'visible';
        
        if (dice!==1){
            //showing the count result in the current-score board
            currentScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = currentScore;
        } else { 
            nextPlayer();   
        }
    }
});

//The Newgame button
document.querySelector('.btn-new').addEventListener('click', function(){
    gameOn = true;
    initAll();
});

//The hold button which transfers the current score to the scoreboard and initiates the next player
document.querySelector('.btn-hold').addEventListener('click', function(){
    if (gameOn && currentScore >=1){
        //Adding the current score to the global score board
        score[activePlayer] += currentScore;
        
        //Printing the score to the board
        document.querySelector('#score-' + activePlayer).textContent = score[activePlayer];
    
        //Setting the target point for the winner of the game
        var targetScore = document.querySelector('.input').value;
        if (targetScore){
            winScore = targetScore;
        } else {
            winScore = 20;
        }
        if (score[activePlayer] >= winScore) {
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        document.querySelector('.dice').style.visibility = 'hidden';
        gameOn = false;
        } else {     
        nextPlayer();
        }
    }
});
