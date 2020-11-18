'use strict';

const MINE = '💣';

var gBoard;
var gTimer;

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
    difficulty:0
};

var gLevel = {
    SIZE: 4,
    MINES: 2
};


console.table(gBoard);


function initGame() {
    // console.clear();
    initHighScores();
    clearInterval(gTimer);
    gTimer = null;
    gGame.secsPassed = 0;


    gBoard = buildBoard();
    placeMines(gLevel.MINES);
    console.table(gBoard); //// for testing

    renderBoard();

}


function buildBoard() {
    var board = [];
    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = [];
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = {
                pos: 'cell' + i + j,
                // minesAroundCount: 0,
                // isShown: false,
                isMine: false,
                isMarked: false
            };
        }
    }
    return board;
}


function boardSize(size) {
    var cells = document.querySelector('#cells').style;

    switch (size) {
        case 4:
            gLevel.MINES = 2;
            gGame.difficulty=0;
            break;
        case 8:
            gLevel.MINES = 12;
            gGame.difficulty=1;
            // cells.backgroundColor = 'red';      ToFix !!!
            break;
        case 12:
            gLevel.MINES = 30;
            gGame.difficulty=2;
            break;
    }

    gLevel.SIZE = size;
    playSound('res/click.mp3');
    initGame();
}


function placeMines(mines) {
    for (var i = 0; i < mines; i++) {
        var rand_i = getRandomInteger(0, gLevel.SIZE);
        var rand_j = getRandomInteger(0, gLevel.SIZE);
        if (!gBoard[rand_i][rand_j].isMine)
            gBoard[rand_i][rand_j].isMine = true;
        else {
            i--;
            continue;
        }
    }
}


function countNeighbors(rowIdx, colIdx) {
    var neighborsCount = 0;
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= gBoard[i].length) continue;
            if (i === rowIdx && j === colIdx) continue;
            if (gBoard[i][j].isMine) neighborsCount++;
        }
    }
    return neighborsCount;
}


function renderBoard() {
    var strHTML = '';
    for (var i = 0; i < gBoard.length; i++) {
        strHTML += '<tr>';

        for (var j = 0; j < gBoard[i].length; j++) {
            var pos = '' + i + j;
            strHTML += '<td id="cells" class="cell' + pos + '" onclick="cellClicked(this)"> </td>';
        }

        strHTML += '</tr>';
    }
    var elTable = document.querySelector('table');
    elTable.innerHTML = strHTML;
}


function cellClicked(elCell) {
    console.log(elCell); //// for testing
    elCell.style = 'box-shadow: inset 4px 4px 3px black';
    // console.log(countNeighbors());
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (elCell.className === gBoard[i][j].pos) {
                // gBoard[i][j].isShown = true;
                if (countNeighbors(i, j))
                    elCell.innerText = countNeighbors(i, j);
                else {
                    // TODO: recursive cellClicked call for auto-open
                }

                if (gBoard[i][j].isMine) gameOver();
            }
        }
    }

    timer();
}


function timer() {
    if (!gGame.isOn) {
        gGame.isOn = true;
        document.querySelector('h3').innerText = 'Time - '
        gTimer = setInterval(function () {
            gGame.secsPassed++;
            document.querySelector('h3').innerText = 'Time - ' + gGame.secsPassed + 's';
        }, 1000);
    }
}