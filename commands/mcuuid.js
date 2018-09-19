/* Eris Fixed */

const snekfetch = require('snekfetch')

exports.run = (client, msg, args) => {
  if (args.length < 1) return msg.channel.createMessage(':question: │ You must provide a server IP address.')
  snekfetch.post('https://api.mojang.com/profiles/minecraft').createMessage([ args[0] ]).then((result) => {
    if (result.body.length < 1) return msg.channel.createMessage(':exclamation: │ Unable to find any players by that username.')
    msg.channel.createMessage(':clipboard: │ Player `' + result.body[0].name + '`\'s UUID is `' + result.body[0].id + '`.')
  }).catch((error) => {
    msg.channel.createMessage(':exclamation: │ Failed to run the command. This incident has been reported.')
    client.rollbar.error(`[mcuuid.js] snekfetch error: ${error}`)
  })
}

exports.help = {
  name: 'mcuuid',
  description: 'Get a Minecraft account UUID from a username',
  usage: 'mcuuid <username>',
  fullDesc: 'Get a Minecraft account UUID from a username',
  type: 'util',
  status: 2,
  aliases: []
}
