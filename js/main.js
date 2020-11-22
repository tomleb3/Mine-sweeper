'use strict';

const F_NEUTRAL = '🙂';
const F_DEAD = '🤯';
const F_WIN = '😎';
const F_MOVE = '😲';
const MINE = '💣';
const FLAG = '🚩';

var gBoard;
var gTimer;

var gGame = {
    isOn: false,
    isOver: false,
    firstTurn: true,
    shownCount: 0,         //// needed for: checking win
    secsPassed: 0,        //// needed for: timer
    difficulty: 0,       //// needed for: localstorage (highscores)
    minesLeft: 2,
    livesLeft: 3
};

var gLevel = {
    SIZE: 4,
    MINES: 2,
    EMPTY: 14
};


console.table(gBoard);

function initGame() {

    document.querySelector('h2 span').innerText = gLevel.MINES;
    document.querySelector('h3').innerText = '';
    var elHeart = document.querySelector('header p');
    elHeart.innerText = (gGame.difficulty) ? '❤️'.repeat(3) : '❤️';

    gGame.livesLeft = 3;
    gGame.shownCount = 0;
    gGame.isOver = false;
    gGame.firstTurn = true;

    timerStop();
    initHighScores();
    setTableHead();

    gBoard = buildBoard();
    renderBoard();

    console.table(gBoard); //// for testing
}


function setTableHead(status = F_NEUTRAL) {
    document.querySelector('thead tr').innerHTML = `<th colspan="${gLevel.SIZE}"> </th>`;
    document.querySelector('thead tr th').innerText = status;
}


function buildBoard() {
    var board = [];
    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = [];
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = {
                pos: 'cell' + i + j,    //// needed for: determening which cell was clicked
                isShown: false,        //// needed for: first move isn't a bomb rule..
                isMine: false,
                isFlagged: false
            };
        }
    }
    return board;
}


function boardSize(difficulty, size, mines) {
    var elHearts = document.querySelector('header p');
    difficulty ? elHearts.innerText = '❤️❤️❤️' : elHearts.innerText = '❤️';

    gGame.difficulty = difficulty;
    gLevel.SIZE = size;
    gLevel.MINES = mines;
    gLevel.EMPTY = (gLevel.SIZE * gLevel.SIZE) - gLevel.MINES;
    playSound('res/click.mp3');
    initGame();
}


function placeMines(minesCount) {
    for (var i = 0; i < minesCount; i++) {
        var randI = getRandomInteger(0, gLevel.SIZE);
        var randJ = getRandomInteger(0, gLevel.SIZE);
        if (!gBoard[randI][randJ].isMine && !gBoard[randI][randJ].isShown)
            gBoard[randI][randJ].isMine = true;
        else {
            i--;
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
            strHTML += '<td id="cells" class="cell' + pos +
                '" onclick="cellClicked(this)" oncontextmenu="placeFlag(this)"> </td>';
        }

        strHTML += '</tr>';
    }
    var elTable = document.querySelector('tbody');
    elTable.innerHTML = strHTML;
}


function cellClicked(elCell) {
    if (gGame.isOver) return;
    console.log(elCell); //// for testing
    closeNav();
    elCell.style = 'background-color: #C0C0C0; box-shadow: inset 4px 4px 3px black';
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (elCell.className === gBoard[i][j].pos) {
                if (gBoard[i][j].isMine) clickedMine(elCell, i, j);        //// event lose-game / lose-life
                else if (gGame.shownCount++ === gLevel.SIZE ** 2 - gLevel.MINES) gameWon();        //// event win
                else {
                    gBoard[i][j].isShown = true;
                    timerStart();

                    var minesCount = countNeighbors(i, j);
                    if (minesCount > 0)
                        elCell.innerText = countNeighbors(i, j);
                    else {
                        // TODO: recursive cellClicked call for auto-open (expandShown ?)
                        expandShown(elCell, i, j);
                    }
                }
            }
        }
    }
    // make sure first turn isn't a bomb -
    if (gGame.firstTurn) {
        placeMines(gLevel.MINES);
        gGame.firstTurn = false;
        cellClicked(elCell);
    }

}


function clickedMine(elCell, i, j) {
    var elHearts = document.querySelector('header p');
    if (gGame.difficulty) {
        if (!gBoard[i][j].isShown) {
            switch (--gGame.livesLeft) {
                case 2:
                    gBoard[i][j].isShown = true;
                    elCell.innerText = MINE;
                    elHearts.innerText = '💔❤️❤️';
                    break;
                case 1:
                    gBoard[i][j].isShown = true;
                    elCell.innerText = MINE;
                    elHearts.innerText = '💔💔❤️';
                    break;
                case 0:
                    elHearts.innerText = '💔💔💔';
                    gameOver();
                    break;
            }
        }
    }
    else {
        elHearts.innerText = '💔';
        gameOver();
    }
}


function expandShown(elCell, cell_i, cell_j) {
    // TODO: recursive cellClicked call for auto-open
    if (!elCell.innerText) {
        // for (var i=0;i<
    }
}


function placeFlag(elCell) {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (elCell.className === gBoard[i][j].pos) {
                if (!gBoard[i][j].isShown) {
                    var elMineCount = document.querySelector('h2 span');
                    if (!gBoard[i][j].isFlagged) {
                        if (elMineCount.innerText > 0)
                            elMineCount.innerText--;
                        else return
                        elCell.innerText = FLAG;
                        gBoard[i][j].isFlagged = true;
                    }
                    else {
                        if (elMineCount.innerText >= 0)
                            elMineCount.innerText++;
                        else return
                        elCell.innerText = '';
                        gBoard[i][j].isFlagged = false;
                    }
                }
            }
        }
    }
}


function timerStart() {
    if (!gGame.isOn) {
        gGame.isOn = true;
        document.querySelector('h3').innerText = 'Time - '
        gTimer = setInterval(function () {
            gGame.secsPassed++;
            document.querySelector('h3').innerText = 'Time - ' + gGame.secsPassed + 's';
        }, 1000);
    }
}

function timerStop() {
    gGame.isOn = false;
    gGame.secsPassed = 0;
    clearInterval(gTimer);
    gTimer = null;
}