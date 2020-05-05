"use strict";

document.getElementById("back").onclick = () => {
    window.location = "../index.html";
}

var sizeSquare = 3,
    player = 'X',
    boxes = [],
    filled = 0,
    emptyCell = [],
    switchMenu = 1;

document.getElementById("startWithFriend").onclick = function () {
    newGame();
    switchMenu = 1;
}

document.getElementById("startWithBot").onclick = function () {
    newGame();
    switchMenu = 0;
}

function newGame() {
    let modalDialog = document.getElementById("dialog");
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
            var str = i === j ? i : new String(i + "/" + j);
            cell.classList.add(str);
            cell.addEventListener('click', record);
            row.appendChild(cell);
            boxes[i][j] = null;
            emptyCell.push({i, j});     
        }
    }
    table.classList.add("field");
    document.getElementById("tictactoe").appendChild(table);
}

function record() {
    var cell = event.target;
    var arr = cell.className.split("/");
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
        boxes[i][j] = 'X';
        event.target.style.background = "url('./img/cross.svg') center center no-repeat #fff";
        event.target.textContent = player === 'X' ? 'X' : 'O';
        var newemptyCell = emptyCell.filter(x=> x!== emptyCell.find(x => x.i === i && x.j ===j))
        emptyCell = newemptyCell;
        console.log(newemptyCell);
        if (checkWin(player)) {
            document.getElementById("player").textContent = 'Win Player ' + player;
            startGame();
            return;
        } else if (filled === sizeSquare * sizeSquare) {
            startGame();
            return;
        }
        document.getElementById("player").textContent = 'Player ' + player;
        it (switchMenu === 1)
        {goBot();}
    }
    console.log(boxes[i][j]);
}

function startGame() {
    setTimeout(()=>{window.location.reload();},3000);
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

function goBot(){
    setTimeout(function () {
        var namerand = emptyCell[Math.floor(Math.random() * emptyCell.length)];
        var i = namerand.i;
        var j = namerand.j;
        var str = i === j ? i: new String(i + "/" + j);
        console.log(str);
        boxes[i][j] = 'O';
        document.getElementsByClassName(str)[0].style.background = "url('./img/circle.svg') center center no-repeat #fff";
        console.log('i', i, 'j', j);
        emptyCell = emptyCell.filter(x => x !== namerand);
        if (checkWin('O')) {
            document.getElementById("player").textContent = 'Win Player ' + 'O';
            
            return;
        } else if (filled === sizeSquare * sizeSquare) {
            startGame();
            return;
        }
    }, 300);
}