'use strict'
// const blessed = require('blessed');
// const screen = blessed.screen({
//   terminal: 'windows-ansi'
// });
//
// const box = blessed.box({
//   top: 'center',
//   left: 'center',
//   width: '100%',
//   height: '100%',
//   content: '*******************************************\n \tLoad Balancer\n*******************************************',
//   border: 'line'
// });
//
// screen.append(box);

class Console{

  static print(uriServers, weights){
    process.stdout.write("\u001b[2J\u001b[0;0H");
    let content = '';
    content += ('*******************************************\n \tLoad Balancer\n*******************************************')
    content += (`\nActive servers = ${uriServers.length} \n----------`);
    content += (`\nServers: \n`);
    for(let uriServer of uriServers){
      content += `${uriServer}\n`;
    }
    content += ('\n-------------------- \nRunning load Balancer... \n--------------------');
    content += ('\nWeights: \n');
    for(let indexWeight in weights){
      content += (`${indexWeight}: ${weights[indexWeight]}\n`)
    }
    console.log(content);
    // box.setContent(content)
  }
}

module.exports = Console;
