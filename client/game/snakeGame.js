getHighScore();

function getHighScore() {
  var request = new XMLHttpRequest();
  request.open("GET", '/getScore');
  request.send();

  request.onload = function(e) {
    var response = request.response;
    var scores = JSON.parse(response);

    for (var i = 0; (i < scores.length && i <= 4); i++) {
      var element = null;
      var elin = document.getElementById("elin");
      if (i === 0) {
        document.getElementById("elin").innerHTML = "";
        element = document.createElement("h1")
        element.innerHTML = "High score: " + scores[i].score + " " + scores[i].name;
      } else {
        element = document.createElement("p");
        element.innerHTML = "Plats " + (i+1) + " poäng: " + scores[i].score + " " + scores[i].name;
      }
        elin.append(element);
    }
  }
}

function sendScore(score, name) {
  var request2 = new XMLHttpRequest();
  request2.open("POST", '/sendScoreData');
  request2.setRequestHeader("Content-Type", "application/json");
  var scoreObj = {score: score, name: name}
  request2.send(JSON.stringify(scoreObj));
}


var dimension = 10;
var gameOn = false;
var direction = null;
var positions = [];
var currentFood;
var tid = 200;
var score = 0;
var name = "";


createTable(dimension);
initialize(dimension);

function changeTime() {
  let time = document.getElementById('hej').value
    tid = Number(time);
}


document.onkeydown = function(e) {
  if ((e.key === "ArrowUp")
  || (e.key === "ArrowDown")
  || (e.key === "ArrowRight")
  || (e.key === "ArrowLeft")) {

    if (!((e.key === "ArrowUp" && direction === "ArrowDown")
      || (e.key === "ArrowDown" && direction === "ArrowUp")
      || (e.key === "ArrowRight" && direction === "ArrowLeft")
      || (e.key === "ArrowLeft" && direction === "ArrowRight"))) {

      direction = e.key;

      if (gameOn === false) {
        gameOn = true;
        timer = setInterval(timeFunction, tid)
      }
    }
  }
}

function placeFood() {
  do {
    var randomX =  Math.floor((Math.random() * dimension))
    var randomY =  Math.floor((Math.random() * dimension))
    currentFood = {x: randomX, y: randomY}
    var liggerIOrmen = false;

    for (var i = 0; i < positions.length; i++) {
      if (positions[i].x === currentFood.x && positions[i].y === currentFood.y) {
        liggerIOrmen = true;
      }
    }
  }
  while(liggerIOrmen === true)
  var food = document.getElementById("cell" + currentFood.x+ currentFood.y);
  food.style.backgroundColor = 'blue';
  // classList.add("mat");
}

function resetGame() {
  clearInterval(timer);
  gameOn = false;
  var food = document.getElementById("cell" + currentFood.x + currentFood.y);
  food.style.backgroundColor = 'white';
  initialize(dimension)
  sendScore(score, name)
  getHighScore()
  score = 0;
}

function checkIfLose() {
  for (var i = 1; i < positions.length; i++) {
    if (positions[0].x  === positions[i].x && positions[0].y  === positions[i].y) {
      console.log("you lose bc you enter yourself");
      resetGame()
    }
  }
  if (positions[0].x < 0 || positions[0].x >= dimension || positions[0].y < 0 || positions[0].y >= dimension){
    console.log("you lose bc you enter a wall");
    resetGame()
  } else {
    document.getElementById("cell" + positions[0].x + positions[0].y).style.backgroundColor = 'purple';
  }
}

function createTable(dimension) {
  var tbl = document.createElement("table");
  document.getElementById("tableContainer").append(tbl);

  for(var i = 0; i < dimension; i++) {
    var row = document.createElement("tr");
    row.id = "row" + i;
    tbl.append(row);

    for(var j = 0; j < dimension; j++) {
      var cell = document.createElement("td");
      cell.id = "cell" + i+j;
      row.append(cell);
    }
  }
}

function initialize(dimension) {
  var start = document.getElementById("cell" + Math.floor((dimension-1)/2) + Math.floor((dimension-1)/2));
  start.style.backgroundColor = 'purple';
  for (var i = 1; i < positions.length; i++) {
    document.getElementById("cell" + positions[i].x + positions[i].y).style.backgroundColor = 'white';
  }
  positions = [{x: Math.floor((dimension-1)/2), y: Math.floor((dimension-1)/2)}];
  placeFood()
}

function collectStuff() {
  score = positions.length;
  var selectName = document.getElementById('name');
  var nameValue = selectName.value;
  name = nameValue;
  document.getElementById("display").innerHTML = "Din poäng: " + score;
}

function timeFunction() {
  var head = Object.assign({}, positions[0]);
  if (positions[0].x === currentFood.x && positions[0].y === currentFood.y) {
    placeFood()
    collectStuff()
  } else {
    svans = positions.pop()
    document.getElementById("cell" + svans.x + svans.y).style.backgroundColor = 'white';
  }

  switch(direction) {
    case "ArrowUp":
      positions.unshift({x:head.x-1, y:head.y})
      break;
    case "ArrowDown":
      positions.unshift({x:head.x+1, y:head.y})
      break;
    case "ArrowRight":
      positions.unshift({x:head.x, y:head.y+1})
      break;
    case "ArrowLeft":
      positions.unshift({x:head.x, y:head.y-1})
      break;
  }
  checkIfLose()
}
