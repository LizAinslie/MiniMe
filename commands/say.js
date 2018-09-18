exports.run = (client, msg, args) => {
  if (msg.author.id !== client.config.ownerID) return msg.channel.createMessage(':no_entry_sign: │ You are not muy developer!')
  msg.channel.createMessage(args.join(' '))
}

exports.help = {
  name: 'say',
  description: 'Says the specified text.',
  usage: 'say <text>',
  fullDesc: 'Says the specified text.',
  type: 'dev',
  status: 2,
  aliases: []
}
