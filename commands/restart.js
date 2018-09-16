/* Eris Fixed */

exports.run = (client, message) => {
  if (message.author.id !== client.config.ownerID) return message.reply('Sorry, only my developer can use this command.')
  message.channel.createMessage('Restarting...')
  .then(msg => client.destroy())
  .then(() => client.login(process.env.DISCORD_TOKEN))
}

exports.type = 'text'

exports.help = {
  name: 'restart',
  description: 'Restarts the bot.',
  usage: 'restart',
  fullDesc: 'Restarts the bot.',
  type: 'dev',
  status: 2
}
