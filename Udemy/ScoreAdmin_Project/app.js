let winningScore = 3;
let gameOver = false;

const p1 = {
    score : 0,
    button : document.getElementById('first'),
    display : document.getElementById('player1')
}

const p2 = {
    score : 0,
    button : document.getElementById('second'),
    display : document.getElementById('player2')
}

function updateScore(player, opponent){
    if(!gameOver){
        player.score += 1;
        if(player.score==winningScore){
            gameOver = true;
            player.display.classList.add('has-text-success');
            opponent.display.classList.add('has-text-danger');
    
            player.button.disabled = true;
            opponent.button.disabled = true;
        }
    }
    player.display.textContent = player.score;
}

let select = document.getElementById('winScore');
select.addEventListener('change', function(e){
    winningScore = parseInt(this.value);
    reset();
});

p1.button.addEventListener('click', function(e){
    updateScore(p1, p2);
});
p2.button.addEventListener('click', function(e){
    updateScore(p2, p1);
});

const resetBtn = document.getElementById('reset');
resetBtn.addEventListener('click', reset);

function reset(){
    gameOver = false;

    for(let p of [p1,p2]){
        p.score = 0;
        p.display.textContent = 0;
        p.display.classList.remove('has-text-success', 'has-text-danger');
        p.button.disabled = false;
    }
}