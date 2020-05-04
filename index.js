let tBtn = document.getElementById("tic-tac");
let gBtn = document.getElementById("gallows");

let main = document.getElementById("main");

tBtn.addEventListener("mouseover", function() {
 main.style.background = "url('./img//tic-tac.jpg') center center no-repeat #EEEEEE";
 main.style.opacity = "1"
});

tBtn.addEventListener("mouseleave", function() {
 main.style.opacity = "0"
});

gBtn.addEventListener("mouseover", function() {
 main.style.background = "url('./img/gallows.jpg') center center no-repeat #EEEEEE";
 main.style.opacity = "1"
});

gBtn.addEventListener("mouseleave", function() {
 main.style.opacity = "0"
});