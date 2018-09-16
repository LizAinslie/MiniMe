const figlet = require('figlet')
const _ = require('lodash')

exports.run = (client, msg, args) => {
  let [font, text] = args.join(' ').split('|')
  if (!text) {
    [font, text] = ['Big', text]
  }
  const ascii = '```' + figlet.textSync(text.trim(), {
    font: _.capitalize(font),
    horizontalLayout: 'default',
    verticalLayout: 'default'
  }) + '```'
  msg.channel.createMessage({
    embed: {
      color: client.config.color,
      description: ascii,
      author: {
        icon_url: msg.author.displayAvatarURL,
        name: `Ascii │ Requested by ${msg.author.username}#${msg.author.discriminator}`
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
  type: 'fun',
  status: 1
}
