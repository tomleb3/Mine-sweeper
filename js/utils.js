
function getRandomInteger(min, max) {
    return (Math.floor(Math.random() * (max - min)) + min);
}


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


// This function returns a mat with nulls at specified dimensions
function getMat(rowsCount, colsCount) {
    var mat = [];
    for (var i = 0; i < rowsCount; i++) {
        mat[i] = [];
        for (var j = 0; j < colsCount; j++) {
            mat[i][j] = null;
        }
    }
    return mat;
}


////// get mat copy -

function copyMat(mat) {
    var newMat = [];
    for (var i = 0; i < mat.length; i++) {
        newMat[i] = [];
        for (var j = 0; j < mat[0].length; j++) {
            newMat[i][j] = mat[i][j];
        }
    }
    return newMat;
}


////// get mat with random numbers -

function randomNumsMat(rows, cols, min, max) {
    var matName = [];
    for (var i = 0; i < rows; i++) {
        matName[i] = [];
        for (var j = 0; j < cols; j++) {
            matName[i][j] = Math.floor(Math.random() * (max - min)) + min;
        }
    }
    return matName;
}


////// count neighbors -

function countNeighbors(rowIdx, colIdx, mat, neighbor) {
    var neighborsCount = 0;
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= mat[i].length) continue;
            if (i === rowIdx && j === colIdx) continue;
            if (mat[i][j] === neighbor) neighborsCount++;
        }
    }
    return neighborsCount;
}


////// get full time -

function getTime() {
    return new Date().toString().split(' ')[4];
}


////// play sound -

function playSound(src) {
    var sound = new Audio(src);
    sound.pause();
    sound.currentTime = 0;
    sound.play();
}