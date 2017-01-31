'use strict';
const http = require('http');
const fs = require('fs');
const request = require('request');
const Perceptron = require('./perceptron/');
const Weights = require('./perceptron/weights');
const Console = require('./console');

const uriServers = [
  'http://ec2-52-26-51-200.us-west-2.compute.amazonaws.com:8000',
  'http://ec2-35-167-36-190.us-west-2.compute.amazonaws.com:8000',
  'http://ec2-35-167-32-77.us-west-2.compute.amazonaws.com:8000'
];

const servers = [
  {
    type: 1,
    state: 0,
    responseTime: 0,
    distance: 500
  },
  {
    type: 1,
    state: 0,
    responseTime: 0,
    distance: 600
  },
  {
    type: 1,
    state: 0,
    responseTime: 0,
    distance: 600
  }
];


let lastChoice = -1;
let perceptron = new Perceptron();

function serverActive(server){
  return server.state != 0;
}

function printConsole(){
  let addresses = [];
  for(let i in servers){
    if(servers[i].state != 0)
      addresses.push(uriServers[i]);
  }
  Console.print(addresses, []);
}

function checkConnection(){
  for(let i in uriServers){
    let startTime = new Date();
    let uri = uriServers[i];

    request(uri, (err, response, body) => {
      if(err){
        servers[i].state = 0;
        printConsole();
        return servers[i].responseTime = 3;
      }

      let endTime = new Date();
      let diffTime = endTime - startTime < 500 ? 1 : 2;

      servers[i].state = 1;
      printConsole();
      return servers[i].responseTime = diffTime;
    })
  }
}

function selectBestChoice(output){
    return (++lastChoice % output.length);
}

function serverReceiver(req, res){
  let input = Array.from(servers);
  let choice = selectBestChoice(uriServers);
  let uri = uriServers[choice];
  request(uri, (err, resp, body) => {
    let reqResponse = '';
    res.setHeader('Proxy-Server', uri);
    if(err){
      res.setHeader('Error', true);
      reqResponse = (`Server '${uri}' connection failed: `);
    }else{
      reqResponse = body.toString();
    }
    return res.end(reqResponse);
  })

}

http.createServer(serverReceiver)
  .listen(8000);

setInterval(checkConnection, 5000);
checkConnection();
printConsole();
