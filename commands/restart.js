exports.run = (client, message) => {
  if (message.member.roles.find('name', 'Owner') || message.member.roles.find('name', 'Mod')) {
    message.channel.send('Restarting...')
    .then(msg => client.destroy())
    .then(() => client.login(process.env.DISCORD_TOKEN))
  }
}

exports.type = 'text'

exports.help = {
  name: 'restart',
  description: 'Restarts the bot.',
  usage: 'restart',
  fullDesc: 'Restarts the bot. Must be the owner of the server or a mod.'
}
