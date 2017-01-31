'use strict'
const fs = require('fs');
const fileName = './weights.json';
class Weights{
  static get weights(){

    try{
      let fileData = fs.readFileSync(fileName);
      return JSON.parse(fileData);
    }catch(err){
      return {
        responseTime: 1,
        state: 1,
        type: 1,
        distance: 1
      }
    }
  }

  static set weights(data){
    try{
      fs.writeFileSync(fileName, JSON.stringify(data));
    }catch(err){
      console.warn(err);
    }
  }
}

module.exports = Weights;
