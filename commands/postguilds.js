const snekfetch = require('snekfetch')

exports.run = (client, msg) => {
  if (msg.author.id !== client.config.ownerID) return msg.channel.send(':no_entry_sign: │ Only my developer can use this!')
  snekfetch.post(`https://botlist.space/api/bots/${client.user.id}`)
  .set('Authorization', client.config.apis.botlists.bls)
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
    client.rollbar.error(`botlist.space server count update failed : ${err}`)
  })
  snekfetch.post(`https://discordbots.group/api/bots/${client.user.id}`)
  .set('Authorization', client.config.apis.botlists.dbg)
  .send({
    count: client.guilds.size
  }).then(() => {
    msg.channel.send(':white_check_mark: │ Updated **discordbots.group** stats.').catch(err => {
      client.rollbar.error(`Error sending message in channel with id: ${msg.channel.id} | ${err}`)
    })
    console.log('Updated discordbots.group stats.')
  }).catch(err => {
    msg.channel.send(':exclamation: │ Failed to update **discordbots.group** stats.').catch(err => {
      client.rollbar.error(`Error sending message in channel with id: ${msg.channel.id} | ${err}`)
    })
    client.rollbar.error(`Discordbots.group server count update failed : ${err}`)
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
