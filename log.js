'use strict';
const fs = require('fs');
const log = Symbol()
const filename = Symbol();

class Log{
  constructor(file){
    this[filename] = file;
    this[log] = [];
  }

  add(line){
    this[log].push(line+'\n');
  }

  flush(){
    for(let line of this[log]){
      fs.appendFileSync(this[filename], `${line}`);
    }
    this[log] = this[log].slice(this[log]);
  }
}

module.exports = Log;
