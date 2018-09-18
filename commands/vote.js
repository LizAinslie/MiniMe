exports.run = (client, msg) => {
  return msg.reply('you can vote for me here:\nhttps://botlist.space/view/mini-me')
}

exports.help = {
  name: 'vote',
  description: 'Get a vote link.',
  usage: 'vote',
  fullDesc: 'Get a vote link.',
  type: 'util',
  status: 2,
  aliases: []
}
