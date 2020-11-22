'use strict';

function gameOver() {
    console.log('Game Over!');

    //// show all other mines (need loops to expose all)
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (gBoard[i][j].isMine) {
                // Selector: .cell1-11
                var elCell = document.querySelector('.cell' + i + j);
                elCell.innerText = MINE;
                elCell.style = 'background-color: #B21C00; box-shadow: inset 4px 4px 3px black';
            }
        }
    }

    setTableHead(F_DEAD);
    gGame.isOver = true;
    timerStop();
}


function gameWon() {
    console.log('Game Won!');

    setTableHead(F_WIN);
    checkHighScores();
    gGame.isOver = true;
    timerStop();
}