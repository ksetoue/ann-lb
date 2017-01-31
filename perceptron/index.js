'use strict';
const Filter = require('./filter.js');

const filterInstance = Symbol();
const ALPHASIGMOIDE = 0.02;

function sigmoide(value){
  let k = Math.exp(value*ALPHASIGMOIDE);
  return 1.0 / (1.0 + k);
}

const derivate = 0.5;
var learningRate = 0.5;

class Perceptron {
  constructor() {
    this[filterInstance] = new Filter();
  }

  calculate(input){
    return input.map(this[filterInstance].applyFilter).map(sigmoide);
  }


  adjust(result){
    let currentWeights = this[filterInstance].weights;
    let input = result.input;
    let output = result.output;
    let greaterWeight = -50000;
    let greaterWeightIndex = null;
    for(let i in currentWeights){
      let processedWeight = currentWeights[i] * input[i];
      // processedWeight = processedWeight > 500 ? processedWeight * ALPHASIGMOIDE : processedWeight;
      if(greaterWeight < processedWeight || greaterWeightIndex == null){
        greaterWeight = processedWeight;
        greaterWeightIndex =  i;
      }
    }

    if(result.success){
      currentWeights[greaterWeightIndex]+=learningRate;
    }
    else{
      currentWeights[greaterWeightIndex]-=learningRate;
    }
    currentWeights[greaterWeightIndex] = currentWeights[greaterWeightIndex] < 0 ? 0: currentWeights[greaterWeightIndex];
    this[filterInstance].backPropagation(currentWeights);

  }

  get derivative(){
    return derivate;
  }
}

module.exports = Perceptron;
