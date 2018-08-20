const figlet = require('figlet')
const funcs = require('../modules/functions.js')
                      
exports.run = (client, msg, args) => {
  args = args.join(' ').split('|')
  let text, font
  if (!args[1]) {
    text = args[0]
    font = 'Big'
  } else {
    text = args[1]
    font = args[0]
  }
  const ascii = '```' + figlet.textSync(text.trim(), {
    font: funcs.toTitleCase(font),
    horizontalLayout: 'default',
    verticalLayout: 'default'
  }) + '```'
  msg.channel.send({
    embed: {
      color: client.config.color,
      description: ascii,
      author: {
        icon_url: msg.author.displayAvatarURL,
        name: `Ascii	׀ Requested by ${msg.author.username}#${msg.author.discriminator}`
      },
      footer: {
        icon_url: client.user.avatarURL,
        text: 'Status: 200'
      },
      timestamp: new Date()
    }
  })
}

exports.help = {
  name: 'ascii',
  description: 'Makes ASCII art.',
  usage: 'ascii <font> | <text>',
  fullDesc: 'Makes ASCII art.',
  type: 'fun'
}