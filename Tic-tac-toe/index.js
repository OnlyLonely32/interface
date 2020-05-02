"use strict";

var sizeSquare = 3,
    player = 'X',
    boxes = [],
    filled = 0;

document.getElementById("start").onclick = function () {
    newGame();
}

function newGame() {
    // sizeSquare = +(prompt('Field size', 3));
    let modalDialog = document.getElementById("dialog");
    let sizeSquare = document.getElementById("fieldSize");
    sizeSquare = + sizeSquare.value;
    modalDialog.classList.remove("dialog__active");
    showTable();
}

function showTable() {
    boxes = [
        [sizeSquare],
        [sizeSquare]
    ];
    var table = document.createElement('table');
    table.setAttribute('border', 1);
    table.setAttribute('cellspacing', 0);
    
    for (var i = 0; i < sizeSquare; i++) {
        boxes[i] = [];
        var row = document.createElement('tr');
        table.appendChild(row);
        for (var j = 0; j < sizeSquare; j++) {
            var cell = document.createElement('td');
            cell.classList.add(i, j);
            cell.addEventListener('click', record);
            row.appendChild(cell);
            boxes[i][j] = null;
        }
    }
    table.classList.add("field");
    document.getElementById("tictactoe").appendChild(table);
    
}

function record() {
    var cell = event.target;
    var arr = cell.className.split(" ");
    readingClassList(arr);
}

function readingClassList(arr) {
    var i = +arr[0];
    var j = +arr[1];
    if (arr[1] === undefined)
        j = i;
    turn(i, j);       
}

function turn(i, j) {
    if (boxes[i][j] === null) {
        filled++;
        boxes[i][j] = player === 'X' ? 'X' : 'O';
        
        event.target.style.background = player === 'X' ? "url('./img/cross.svg') center center no-repeat #fff"  : "url('./img/circle.svg') center center no-repeat #fff";
        event.target.textContent = player === 'X' ? 'X' : 'O';
        
        if (checkWin(player)) {
            document.getElementById("player").textContent = 'Win Player ' + player;
            startGame();
            return;
        } else if (filled === sizeSquare * sizeSquare) {
            startGame() 
            return;
        }
        player = boxes[i][j] === 'X' ? 'O' : 'X';
        document.getElementById("player").textContent = 'Player ' + player;
               
    }
    console.log(boxes[i][j]);
}

function startGame() {
    setTimeout(function () {
        alert('New Game?');
        window.location.reload();
    }, 0);
}

function checkWin(player) {
    var diagonal = 0;
    var diagonal1 = 0;
    for (var i = 0; i < sizeSquare; i++) {
        var horizont = 0;
        var vertical = 0;
        if (boxes[i][i] === player) diagonal++;
        if (boxes[i][sizeSquare - 1 - i] === player) diagonal1++;
        for (var j = 0; j < sizeSquare; j++) {
            if (boxes[i][j] === player) horizont++;
            if (boxes[j][i] === player) vertical++;
        }
        if (horizont === sizeSquare || vertical === sizeSquare) return true;
    }
    if (diagonal === sizeSquare || diagonal1 === sizeSquare) return true;
    return false;
}
