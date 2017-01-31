'use strict'

class ConsoleTestRunner{
  static print(servers){
    process.stdout.write("\u001b[2J\u001b[0;0H");
    let content = '';
    content += ('*****************************************\n \tLoad Balancer Test\n*****************************************')
    // content += (`\nActive servers = ${uriServers.length} \n----------`);
    content += (`\nServers total requests: \n`);
    for(let server in servers){
      content += `${server}: ${servers[server]}\n`;
    }
    // content += ('\n-------------------- \nRunning load Balancer... \n--------------------');
    // content += ('\nWeights: \n');
    // for(let indexWeight in weights){
    //   content += (`${indexWeight}: ${weights[indexWeight]}\n`)
    // }
    console.log(content);
    // box.setContent(content)
  }
}

module.exports = ConsoleTestRunner;
