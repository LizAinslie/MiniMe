/* Eris Fixed */

const snekfetch = require('snekfetch')
const resolveUser = require('../util/resolveUser.js')

exports.run = (client, msg, args) => {
  snekfetch.get('https://insult.mattbas.org/api/insult.json').then((result) => {
    if (args.length > 0) {
      resolveUser(client, args.join(' ')).then((user) => {
        msg.channel.createMessage((msg.channel.guild && msg.channel.guild.members.has(user.id) ? '<@' + user.id + '>' : user.username + '#' + user.discriminator) + ' ' + JSON.parse(result.body).insult)
      }).catch(() => {
        msg.channel.createMessage(':exclamation: │ Unable to find any users by that query.')
      })
    } else {
      msg.channel.createMessage('<@' + msg.author.id + '> ' + JSON.parse(result.body).insult)
    }
  }).catch((error) => {
    msg.channel.createMessage(':exclamation: │ Failed to run the command.')
    client.error(error)
  })
}

exports.help = {
  name: 'insult',
  description: 'Insults a user.',
  usage: 'insult <@user>',
  fullDesc: 'Insults a user. Must mention someone to insult.',
  type: 'fun',
  status: 2,
  aliases: []
}
