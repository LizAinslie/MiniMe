const figlet = require('figlet')
const funcs = require('../modules/functions.js')
                      
exports.run = (client, msg, args) => {
  msg.channel.send('```' + figlet.textSync(args.join(' ').split('|')[1].trim(), {
    font: funcs.toTitleCase(args[0]),
    horizontalLayout: 'default',
    verticalLayout: 'default'
  }) + '```')
}

exports.help = {
  name: 'ascii',
  description: 'Makes ASCII art.',
  usage: 'ascii <font> | <text>',
  fullDesc: 'Makes ASCII art.',
  type: 'fun'
}