'use strict';

function gameOver() {
    console.log('Game Over!');

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (gBoard[i][j].isMine) {
                document.querySelector('.cell' + i + j).innerText = MINE;
            }
        }
    }
}


function gameWon() {
    console.log('Game Won!');
}