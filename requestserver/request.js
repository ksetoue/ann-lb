//Load the request module
var request = require('request');
var bodyresponse = [];
var startDate = new Date();

//Lets try to make a HTTP GET request
// request('http://35.165.205.0:8000/', function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//       bodyresponse = body.toString();
//       if(bodyresponse=="35.165.205.0")
//         console.log(body); // Show the HTML response
//     }
// });

var request_loop = function (){
  for (i = 0; i < 10; i++){
    //request('http://localhost:8000/', function (error, response, body) { //gera requisicao para o localhost (mudar depois para o servidor do lb)
    request('http://localhost:8000/', function (error, response, body) { //gera requisicao para o servidor do lb)
        if (!error && response.statusCode == 200) {
          bodyresponse = body.toString();
          //if(bodyresponse=="35.165.205.0")
            console.log(body + '\n'); // Show the HTML response
        } else {
          console.warn(error);
        }
        var endDate = new Date();
        var diffTime = endDate - startDate;
        console.log("request time = " + diffTime + "\t"); //mostra o tempo que demorou para receber a requisicao
    });
  }
};

request_loop();
