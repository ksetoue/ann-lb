'use strict';
const request = require('request');
class TestRunner{
  static run(iterations, uri, eachCallback){
    for(let i = 0; i < iterations; i++){
      let startDate = new Date();
      request(uri, function(error, response, body){
        let resp = {};
        let endDate = new Date();
        resp.diffTime = endDate - startDate;
        let headers;
      	if(response && response.headers){
      		headers = response.headers;
      	}
        resp.headers = response.headers;
        eachCallback(error, resp, body);
      })
    }
  }
}

module.exports = TestRunner;
