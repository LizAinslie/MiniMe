/* Eris Fixed */

const figlet = require('figlet')
const _ = require('lodash')
const getEmbedColor = require('../util/getHighestRoleColor.js')

exports.run = (client, msg, args) => {
  let [font, text] = args.join(' ').split('|')
  if (!text) {
    [font, text] = ['Big', text] // eslint-disable-line no-self-assign
  }
  const ascii = '```' + figlet.textSync(text.trim(), {
    font: _.capitalize(font),
    horizontalLayout: 'default',
    verticalLayout: 'default'
  }) + '```'
  msg.channel.createMessage({
    embed: {
      color: getEmbedColor(client, msg),
      description: ascii,
      author: {
        icon_url: msg.author.avatarURL,
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
  status: 1,
  aliases: []
}
