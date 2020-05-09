"use strict";

document.getElementById("back").onclick = () => {
    $('#dialog').fadeOut();
    setTimeout(() =>{
        window.location.href = "../index.html";
    }, 400)
}

var sizeSquare = 3,
    player = 'X',
    boxes = [],
    filled = 0,
    emptyCell = [],
    gameMode = 0,
    str,arr,newemptyCell;

document.getElementById("startWithFriend").onclick = function () {
    $('#dialog').fadeOut();
    setTimeout(() =>{
        gameMode = 0;
        newGame();
    }, 400)
}

document.getElementById("startWithBot").onclick = function () {
    $('#dialog').fadeOut();
    setTimeout(() =>{
        gameMode = 1;
        newGame();
    }, 400)
}

function newGame() {
    // sizeSquare = +(prompt('Field size', 3));
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
            if( gameMode == 0){
                // for player
                cell.classList.add(i, j);
                
            } else
            if( gameMode == 1){// for bot
                str = i === j ? i : new String(i + "/" + j);
                cell.classList.add(str);
                
            }
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
    if( gameMode === 0){
        // for player
        arr = cell.className.split(" ");
    } else
    if( gameMode === 1){
        // for bot
        arr = cell.className.split("/");
    }   

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
        if( gameMode === 0){
            // for player
            boxes[i][j] = player === 'X' ? 'X' : 'O';
            event.target.style.background = player === 'X' ? "url('./img/cross.svg') center center no-repeat #fff"  : "url('./img/circle.svg') center center no-repeat #fff";        
        } else
        if( gameMode === 1){
            // for bot
            boxes[i][j] = 'X';
            event.target.style.background = "url('./img/cross.svg') center center no-repeat #fff";
        }   

        if( gameMode === 1){
            newemptyCell = emptyCell.filter(x=> x!== emptyCell.find(x => x.i === i && x.j ===j))
            emptyCell = newemptyCell;

        }
        event.target.textContent = player === 'X' ? 'X' : 'O';
        
        if (checkWin(player)) {
            document.getElementById("player").textContent = 'Win Player ' + player;
            startGame();            
            return;
        } else if (filled === sizeSquare * sizeSquare) {
            startGame() 
            return;
        }
        

        if( gameMode === 0){
            // for player
            player = boxes[i][j] === 'X' ? 'O' : 'X';
        } else
        if( gameMode === 1){
            // for bot
            goBot();
        }  
        document.getElementById("player").textContent = 'Player ' + player;     
    }
}

function startGame() {
    setTimeout(()=>{window.location.reload();},3000);

}

function goBot(){
    setTimeout(function () {
        var namerand = emptyCell[Math.floor(Math.random() * emptyCell.length)];
        var i = namerand.i;
        var j = namerand.j;
        str = i === j ? i: new String(i + "/" + j);
        boxes[i][j] = 'O';
        document.getElementsByClassName(str)[0].style.background = "url('./img/circle.svg') center center no-repeat #fff";
        emptyCell = emptyCell.filter(x => x !== namerand);
        if (checkWin('O')) {
            document.getElementById("player").textContent = 'Win Player ' + 'O';
            startGame();
            return;
        } else if (filled === sizeSquare * sizeSquare) {
            window.location.reload();
            return;
        }
    }, 300);
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
