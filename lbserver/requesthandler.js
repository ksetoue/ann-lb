var request = require('request');
var iconv = require('iconv-lite');
var xmlParser = require('xml2js').parseString;
var encoding = 'iso-8859-1';
var startDate = new Date();

var clientIP = ''; //mandar o request para quem pediu
var serverIP = ''; //ip do server para onde a requisicao sera mandada
var bodyresponse = [];

//get request response from server
exports.getResponse = function(serverIP, clientIP){
  //pegar o ip do server e fazer o request, mandar para o client
  request(serverIP, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      bodyresponse = body.toString();
      //if(bodyresponse==serverIP)
        console.log(serverIP + "= " + body + "\n"); // Show the HTML response
    } else {
      console.warn(error);
    }
  });

};
