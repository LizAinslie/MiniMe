exports.run = (client, msg) => {
  return msg.reply('you can vote for me here:\nhttps://botlist.space/view/456926578228723724')
}

exports.help = {
  name: 'vote',
  description: 'Get a vote link.',
  usage: 'vote',
  fullDesc: 'Get a vote link.',
  type: 'util'
}