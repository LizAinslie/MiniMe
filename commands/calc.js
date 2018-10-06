const calc = require('calculatorjs')

exports.run = (client, msg, args) => {
    msg.channel.createMessage(`The calculated result of \`${args.join(' ')}\` is **${calc(args.join(' '))}**.`)
}

exports.help = {
  name: 'calc',
  description: 'Calculate an arithmetic expression.',
  usage: 'calc <expression>',
  fullDesc: "Calculate an arithmetic expression.",
  type: 'util',
  status: 2,
  aliases: []
}