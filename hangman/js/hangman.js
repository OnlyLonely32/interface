let keyboard = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
let life = 0;
let word = '';
let success = 0;
let MAX_COUNT_WORDS = 999;

function initLevel(){
  $('.menu').css("display", "none");
  $('#reload').css("display", "block");
  drawWord();
  drawKeyboard();
}

function drawWord(){
  word = generateWord().toUpperCase();
  let html = '';
  for (let i = 0; i < word.length; i++){
    html += "<div class='char' id='" + i + "'>_</div>"
  }
  $('#word').html(html);
}

function generateWord(){
  return words[getRandomInt()];
}

function drawKeyboard(){
  let html = '';
  for (let i = 0; i < keyboard.length; i++){
    html += "<div class='char' onclick='choseLetter(this);' value='" + keyboard[i] + "'>" + keyboard[i]+ "</div>"
  }
  $('#panel_input').html(html);
}

function choseLetter(item){
  if (word.includes(item.getAttribute('value'))){
    insertLetter(item.getAttribute('value'));
  }
  else {
    life++;
    drawHangman();
  }
  checkStatus();
  removeLetter(item);
}


function insertLetter(litter){
  for (let i = 0; i < word.length; i++){ 
    if (litter == word[i]){
      $('#' + i).html(litter);
      success++;
    }
  }
}

function drawHangman(){
  $('#progress img').attr('src', 'progress/'+ life +'.png');
}

function removeLetter(item){
  item.style.display = 'none'
}

function checkStatus(){
  if (success == word.length){
    setStatus('win');
    $('#panel_input').html('Victory!');
  }
  else if (life >= 6){
    setStatus('lose');
    $('#panel_input').html('Unfortunately, failure. Right word: ' + word);
  }
}

function setStatus(status){
  $('#progress img').attr('src', 'progress/'+ status +'.png');
}


function getRandomInt(){
  min = Math.ceil(0);
  max = Math.floor(MAX_COUNT_WORDS);
  return Math.floor(Math.random() * (max - min)) + min;
}
