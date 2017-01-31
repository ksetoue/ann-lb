'use strict';
const commander = require('commander');

const TestRunner = require('./testRunner');
const ConsoleTestRunner = require('../consoleTestRunner');
const Log =  require('../log');
const servers = {};
let uri = 'http://localhost:8000';
let filename = 'log.txt';

commander.version('0.0.1')
  .option('-R, --roundrobin', 'Set Round Robin Output')
  .option('-P, --perceptron', 'Set perceptron output [DEFAULT]')
  .option('-O, --output [file]', 'Set a output log file[default: log.txt]')
  .option('-i, --iterations [iterations]', 'Set a number of iterations [default: 1000]')
  .option('-u, --uri [uri]', 'Set a uri with port [default: http://localhost:8000]')
  .parse(process.argv);

let iterations = 1000 || commander.iterations;

if(commander.output && commander.output.length>0){
  filename = commander.output;
}
if(commander.uri && commander.uri.length >0){
  uri = commander.uri;
}

const log = new Log(filename);

TestRunner.run(iterations, uri, (error, response, body)=>{
  log.add('-----');
  log.add(`Proxy Server: ${response.headers['proxy-server']}`);
  if(!response.headers['error']){
    servers[response.headers['proxy-server']] = servers[response.headers['proxy-server']] > 0 ? servers[response.headers['proxy-server']]+1 : 1;
  }
  if(error){
    log.add(`Error: Code ${error.code}`)
  }
  else{
    if(commander.roundrobin){
      log.add(`Server Weight: ${response.headers['server-weight']}`);
    }
    if(response.headers['error'] == true){
      log.add('Error: Internal Error');
    }
    log.add(`Request Time: ${response.diffTime}`);
  }
  ConsoleTestRunner.print(servers);
  log.flush();
})
