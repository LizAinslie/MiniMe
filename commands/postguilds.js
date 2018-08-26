const snekfetch = require('snekfetch')

exports.run = (client, msg) => {
  if (msg.author.id !== client.config.ownerID) return msg.channel.send(':no_entry_sign: │ Only my developer can use this!')
  snekfetch.post(`https://discordbots.org/api/bots/${client.user.id}`)
  .set('Authorization', client.config.apis.bls)
  .send({
    server_count: client.guilds.size
  }).then(() => {
    msg.channel.send(':white_check_mark: │ Updated **botlist.space** stats.').catch(err => {
      client.rollbar.error(`Error sending message in channel with id: ${msg.channel.id} | ${err}`)
    })
    console.log('Updated botlist.space stats.')
  }).catch(err => {
    msg.channel.send(':exclamation: │ Failed to update **botlist.space** stats.').catch(err => {
      client.rollbar.error(`Error sending message in channel with id: ${msg.channel.id} | ${err}`)
    })
    client.rollbar.error(`Discordbots.org server count update failed : ${err}`)
  })
}

exports.help = {
  name: 'postguilds',
  description: 'Post guild counts on all botlists.',
  usage: 'postguilds',
  fullDesc: 'Post guild counts on all botlists.',
  type: 'dev',
  status: 2
}
