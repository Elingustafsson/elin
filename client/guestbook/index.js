getData(); //hämtar alltid data i början så du kan visa det på sidan.


//HÄMTA DATA
function getData() {
  var request = new XMLHttpRequest();
  //Skicka en getrequest till /getPosts, jag har definerat denna route i server.js
  request.open("GET", '/getPosts');
  request.send();

  //DETTA ÄR DET DU BEHÖVER BRY DIG OM
  //denna funktion körs när servern har svarat, och svaret hamnar i request.response;
  request.onload = function(e) {
    var response = request.response;
    //Servern skickade över arrayen som en string, så nu måste vi parsa den tillbaks till array(objekt)
    var data = JSON.parse(response);

    if (data.length === 0) {
      //do nothing
    } else {
      document.getElementById("data").innerHTML = "";
      for(var i = 0; i < data.length; i++){
        console.log(data[i]);
        var author = data[i].author;
        var textInput = data[i].textInput;
        var createPelement = document.createElement("p");
        createPelement.innerHTML = "Author: " + author + " <br> " + textInput ;
        document.getElementById("data").append(createPelement);
      }
    }
  }
}

function elinFunc() {
  var input = document.querySelectorAll("#textInput, #author");
  var author = input[0].value;
  var textInput = input[1].value;
  sendData(author, textInput);
  location.reload()
}

//SKICKA DATA
//Samma sak, men nu gör vi en post request till servern på /sendPost och skickar med ett objekt
function sendData(tjo, hej) {
  console.log("från sendData", tjo, hej);
var request2 = new XMLHttpRequest();
request2.open("POST", '/sendPost');
request2.setRequestHeader("Content-Type", "application/json");
//VI KAN BARA SKICKA STRINGS, SÅ GÖR OM OBJEKTET TILL EN STRING, OCH SKICKA ÖVER STRINGEN
//HÄMTA RÄTT INFO och skicka till SERVERN
var post = {author: tjo, textInput: hej};
//Här ska author också skickas
request2.send(JSON.stringify(post));
}
