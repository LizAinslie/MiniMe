exports.run = (client, msg) => {
  if (msg.author.id != client.config.ownerID) return msg.channel.send(':no_entry_sign: | Only my developer can use this command!')
  client.rollbar.log('Testing Rollbar from Discord')
}

exports.help = {
  name: 'testrollbar',
  description: 'Tests Rollbar.',
  usage: 'testrollbar',
  fullDesc: 'Tests Mini Me\'s Rollbar integration.',
  type: 'dev'
}