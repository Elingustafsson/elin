//HÄMTA DATA

var request = new XMLHttpRequest();
//Skicka en getrequest till /getPosts, jag har definerat denna route i server.js
request.open("GET", '/getPosts');
request.send();

//DETTA ÄR DET DU BEHÖVER BRY DIG OM
//denna funktion körs när servern har svarat, och svaret finns i request.response;
request.onload = function(e) {
  var response = request.response;
  //Servern skickade över arrayen som en string, så nu måste vi parsa den tillbaks till array(objekt)
  var data = JSON.parse(response);
  console.log(data);
  console.log(typeof(data));
  //GÖR NÅGOT MED DENNA INFO, VISA PÅ SIDAN I P TAGGAR ELLER VAD SOM
}


//SKICKA DATA
//Samma sak, men nu gör vi en post request till servern på /sendPost och skickar med ett objekt
//KANSKE STOPPA IN DETTA I EN FUNKTION SOM KÖRS NÄR MAN KLICKAR PÅ SUBMIT KNAPPEN? 
var request2 = new XMLHttpRequest();
request2.open("POST", '/sendPost');
request2.setRequestHeader("Content-Type", "application/json");
//VI KAN BARA SKICKA STRINGS, SÅ GÖR OM OBJEKTET TILL EN STRING, OCH SKICKA ÖVER STRINGEN
var post = {data: "Hej, detta är en post som jag skickade över från klienten"};
request2.send(JSON.stringify(post));