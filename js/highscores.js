'use strict';

function initHighScores() {
    for (var i = 0; i < 4; i++) {
        if (isNaN(localStorage[i + 'sec']))
            localStorage[i + 'sec'] = 0;
    }

    var scoreLabels = document.querySelectorAll('.the-score');
    for (var i = 0; i < 4; i++) {
        scoreLabels[i].innerText = localStorage[i + 'sec'] + 's';
    }

    document.querySelector('.score-text span').innerText = localStorage[gGame.difficulty + 'sec'] + 's';
}

function checkHighScores() {
    if (localStorage[gGame.secsPassed + 'sec'] > gGame.secsPassed || localStorage[gGame.difficulty + 'sec'] === '0') {
        localStorage[gGame.secsPassed + 'sec'] = gGame.secsPassed;
    }
    initHighScores();
}

function clearHighscores() {
    localStorage.clear();
    initHighScores();
    playClickSound();
    init();
}