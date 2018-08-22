exports.run = (client, msg, args) => {
  msg.channel.send(args.join(' '))
}

exports.help = {
  name: 'say',
  description: 'Says the specified text.',
  usage: 'say <text>',
  fullDesc: 'Says the specified text.',
  type: 'util'
}
