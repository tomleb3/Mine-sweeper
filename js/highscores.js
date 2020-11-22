'use strict';

function initHighScores() {
    var scoreLabels = document.querySelectorAll('.the-score');
    for (var i = 0; i < scoreLabels.length; i++) {
        if (isNaN(localStorage[i + 'sec'])) localStorage[i + 'sec'] = 0;
        scoreLabels[i].innerText = localStorage[i + 'sec'] + 's';
    }
    document.querySelector('footer span').innerText = localStorage[gGame.difficulty + 'sec'] + 's';
}

function checkHighScores() {
    if (localStorage[gGame.difficulty + 'sec'] > gGame.secsPassed || localStorage[gGame.difficulty + 'sec'] === '0') {
        localStorage[gGame.difficulty + 'sec'] = gGame.secsPassed;
    }
    initHighScores();
}

function clearHighscores() {
    localStorage.clear();
    initHighScores();
    playSound('res/click.mp3');
    initGame();
}