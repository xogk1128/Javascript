let i = 0;
let j = 0;
let winningScore = 3;
let gameOver = false;

let select = document.getElementById('winScore');
select.addEventListener('change', function(e){
    winningScore = parseInt(this.value);
    reset();
})


const p1Score = document.getElementById('player1');
const p2Score = document.getElementById('player2');

const first = document.getElementById('first');
first.addEventListener('click', function(e){
    if(!gameOver){
        p1Score.innerText = ++i;
        if(i==winningScore){
            gameOver = true;
            p1Score.classList.add('has-text-success');
            p2Score.classList.add('has-text-danger');
    
            first.disabled = true;
            second.disabled = true;
        }
    }
});
const second = document.getElementById('second');
second.addEventListener('click', function(e){
    p2Score.innerText = ++j;
    if(j==winningScore){
        gameOver = true;
        p1Score.classList.add('has-text-danger');
        p2Score.classList.add('has-text-success');
        
        first.disabled = true;
        second.disabled = true;
    }
});

const resetBtn = document.getElementById('reset');
resetBtn.addEventListener('click', reset);

function reset(){
    gameOver = false;
    p1Score.innerText = i = 0;
    p2Score.innerText = j = 0;

    p1Score.classList.remove('has-text-success', 'has-text-danger');
    p2Score.classList.remove('has-text-success', 'has-text-danger');
    
    first.disabled = false;
    second.disabled = false;
}