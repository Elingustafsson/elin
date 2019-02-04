var path = require('path');
const express = require('express') //webbserver
const bodyParser = require("body-parser"); //för att hämta ut info från post requesten
const fs = require('fs') // filsystem om du vill spara i fil istället
const app = express()
const port = 3000

app.use(express.static('client'))
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var posts = [];
var dates = ['2018/1/3', '2018/2/8', '2018/4/9'];
var amounts = [3,4,1];
var highScore = [];

//skicka index.html om någon frågar efter /
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/game', function(req, res) {
    res.sendFile(path.join(__dirname + '/client/game/snakeGame.html'));
});

//skicka posts om någon frågar efter /getPosts
app.get('/getPosts', function(req, res) {
    res.send(posts);
});

app.get('/getScore', function(req, res) {
    res.send(highScore);
    //Detta skickas när någon går in eller uppdaterar /game..
});

//Denna kod körs när klienten gör en post request till /sendScoreData
app.post('/sendScoreData', function(req, res) {
  highScore.push(req.body);
  highScore.sort(function(a, b) {
    return b.score - a.score;
    //Denna funkar. Gör om senare till forEach/for för bättre koll
  });
  console.log("should be sort",highScore);
  res.end()
});

app.post('/sendPost', function(req, res) {
  //titta i terminalen vad som skickades, hämta ut rätt info och stoppa in i din databas(arrayen)
  console.log(req.body);
  posts.push(req.body);
  var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();
  newdate = year + "/" + month + "/" + day;
  console.log(newdate);

  if (newdate === dates[dates.length-1]) {
    console.log(dates);
    amounts[amounts.length-1]++;
    console.log("lägg till", amounts);
  } else {
    dates.push(newdate);
    console.log(dates);
    amounts.push(1);
    console.log("första i", amounts);
  }
})

app.get('/elin', function(req, res) {
  res.send("Hej elin");
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
})
