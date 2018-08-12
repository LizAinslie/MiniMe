const snekfetch = require('snekfetch')

exports.run = (client, msg) => {
  if (msg.author.id != client.config.ownerID) return msg.channel.send(':no_entry_sign: | Only my developer can use this!')
  snekfetch.post(`https://discordbots.org/api/bots/${client.user.id}/stats`)
  .set('Authorization', client.config.apis.botlists.dbl)
  .send({
    server_count: client.guilds.size
  }).then(() => {
    msg.channel.send(':white_check_mark: | Updated **discordbots.org** stats.')
    console.log('Updated discordbots.org stats.')
  }).catch(err => {
    msg.channel.send(':exclamation: | Failed to update **discordbots.org** stats.')
    client.rollbar.error(`Discordbots.org server count update failed : ${err}`)
  })
}

exports.help = {
  name: 'postguilds',
  description: 'Post guild counts on all botlists.',
  usage: 'postguilds',
  fullDesc: 'Post guild counts on all botlists.',
  type: 'dev'
}