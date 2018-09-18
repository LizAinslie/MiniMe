exports.run = (client, msg) => {
  msg.channel.createMessage('https://discord.gg/9CH4ARd')
}

exports.help = {
  name: 'support',
  description: 'Have the bot provide support.',
  usage: 'support',
  fullDesc: 'Have the bot provide support. Will link to the support server.',
  type: 'util',
  status: 2,
  aliases: []
}
