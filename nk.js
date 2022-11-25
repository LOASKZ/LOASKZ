console.log('Ejecutando el Bot mas shidori tercer mundista.\nComenzando ejecucion del script...');
const chalk = require('chalk');
const yargs = require('yargs');
const cfonts = require('cfonts');
const { join, dirname } = require('path');
const { createInterface } = require('readline');
const { setupMaster, fork } = require('cluster');
const { watchFile, unwatchFile } = require('fs');
//
const Pkg = require('./package.json');
const rl = createInterface(process.stdin, process.stdout);
cfonts.say(`${Pkg.name}`,{font:'simple',color:'candy',align:'center',gradient:["red","blue"]});
cfonts.say(`By ${Pkg.author}`,{font:'console',align:'center',gradient:['red','magenta']});
var isRunning = false;
/**
 * Start a js file
 * @param {String} file `path/to/file`
 */
function start(file) {
  if (isRunning) return
  isRunning = true
  let args = [join(__dirname, file), ...process.argv.slice(2)]
  setupMaster({
    exec: args[0],
    args: args.slice(1),
  })
  let p = fork()
  p.on('message', data => {
    console.log('\n[_>] ', data+'\n')
    switch (data) {
      case 'reset':
        p.process.kill()
        isRunning = false
        start.apply(this, arguments)
        break
      case 'uptime':
        p.send(process.uptime())
        break
    }
  })
  p.on('exit', (_, code) => {
    isRunning = false
    console.error(chalk.bgRed('\n\n[!] Salió del código : '), chalk.bgWhite(code+'\n'))
    p.process.kill() 
    isRunning = false
    start.apply(this, arguments)
    if (code === 0) return
    watchFile(args[0], () => {
      unwatchFile(args[0])
      start(file)
    })
  })
  let opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
  if (!opts['test'])
    if (!rl.listenerCount()) rl.on('line', line => {
      p.emit('message', line.trim())
    })
}

start('Quantum.js');
