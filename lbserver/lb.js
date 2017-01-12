var request = require('request');
var iconv = require('iconv-lite');
var xmlParser = require('xml2js').parseString;
var encoding = 'iso-8859-1';
var startDate = new Date();

var getResponse = require('./requesthandler').getResponse;

var servers = ['http://35.165.205.0:8000/', 'http://35.165.189.118:8000/'];
var weight = [10,20]; //peso de carga em cada servidor
var clientResp = '';
const http = require('http');
const fs = require('fs');
var log = '';


//variaveis da rna
var countRequest = [0,0];
var serverStatus = [];

var checkWeight = function(){
  var indexmin = weight.indexOf(Math.min(...weight));
  return indexmin;

}

const lbserver = http.createServer((req, res) => {
  var indexmin = checkWeight();
  var url = servers[indexmin]; //retorna a url do server com menor peso

  //faz a requisicao para o server com menor peso
  request(url, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      bodyresponse = body.toString();
      log += ("lbserver = " + "localhost" + "request server = " + url + " " + "peso = "+ weight[indexmin] + " " + bodyresponse + "\n");
      res.end("lbserver = " + "localhost" + "request server = " + url + " " + "peso = "+ weight[indexmin] + " " + bodyresponse + "\n");

       //return IP from server
    } else {
      console.warn(error);
    }
  });
  updateWeight();
});
lbserver.listen(8000);



//atualiza os pesos de acordo com a saida da rede neural
var updateWeight = function(){
  weight[0] = 100;
};


var checkConnection = function(){
  var url;
  for(i = 0; i < servers.legth; i++){
    url = servers[i];
    request(url, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        //bodyresponse = body.toString();
        serverStatus[i] = 'active';
        res.end("Connection check \t server = "  + url + "\n");  //return IP from server
      } else {
        console.warn(error);
      }
    });
  }

};


fs.writeFile('log.txt', log, (err) => {
  if(err) throw err;
  console.log('saved file\n');
});

//getResponse('http://localhost:8000', 'http://localhost:8000');



//
// request('http://35.165.205.0:8000/', function(error, response, body) {
//   	var endDate = new Date();
//     var diffTime = endDate - startDate;
//     console.log("request time = " + diffTime);
//   if (!error && response.statusCode == 200) {
//     bodyresponse = body.toString();
//     if(bodyresponse=="35.165.205.0")
//       console.log(body); // Show the HTML response
//   } else {
//     console.warn(error);
//   }
// });


//algortimo de balanceamento
