const snekfetch = require('snekfetch')
const Logger = require('../util/Logger.js')

exports.run = (client, msg) => {
  if (msg.author.id !== client.config.ownerID) return msg.channel.send(':no_entry_sign: │ Only my developer can use this!')
  msg.channel.send(`I am in **${client.guilds.size}** guilds.`)
  snekfetch.post(`https://botlist.space/api/bots/${client.user.id}`)
  .set('Authorization', client.config.apis.botlists.bls)
  .send({
    server_count: client.guilds.size
  }).then(() => {
    msg.channel.send(':white_check_mark: │ Updated **botlist.space** stats.').catch(err => {
      Logger.error(`Error sending message in channel with id: ${msg.channel.id}.`, err)
    })
    console.log('Updated botlist.space stats.')
  }).catch(err => {
    msg.channel.send(':exclamation: │ Failed to update **botlist.space** stats.').catch(err => {
      Logger.error(`Error sending message in channel with id: ${msg.channel.id}.`, err)
    })
    Logger.error(`botlist.space server count update failed : ${err}`)
  })
  // snekfetch.post(`https://discordbots.org/api/bots/${client.user.id}/stats`)
  // .set('Authorization', client.config.apis.botlists.dbl)
  // .send({
  //   server_count: client.guilds.size
  // }).then(() => {
  //   msg.channel.send(':white_check_mark: │ Updated **discordbots.org** stats.').catch(err => {
  //     Logger.error(`Error sending message in channel with id: ${msg.channel.id}.`, err)
  //   })
  //   console.log('Updated discordbots.org stats.')
  // }).catch(err => {
  //   msg.channel.send(':exclamation: │ Failed to update **discordbots.org** stats.').catch(err => {
  //     Logger.error(`Error sending message in channel with id: ${msg.channel.id}.`, err)
  //   })
  //   Logger.error(`discordbots.org server count update failed : ${err}`)
  // })
  snekfetch.post(`https://discordbots.group/api/bot/${client.user.id}`)
  .set('Authorization', client.config.apis.botlists.dbg)
  .send({
    count: client.guilds.size
  }).then(() => {
    msg.channel.send(':white_check_mark: │ Updated **discordbots.group** stats.').catch(err => {
      Logger.error(`Error sending message in channel with id: ${msg.channel.id}.`, err)
    })
    console.log('Updated discordbots.group stats.')
  }).catch(err => {
    msg.channel.send(':exclamation: │ Failed to update **discordbots.group** stats.').catch(err => {
      Logger.error(`Error sending message in channel with id: ${msg.channel.id}.`, err)
    })
    Logger.error(`Discordbots.group server count update failed : ${err}`)
  })
  snekfetch.post(`https://discordbotlist.com/api/bots/${client.user.id}/stats`)
  .set('Authorization', `Bot ${client.config.apis.botlists.dblcom}`)
  .send({
    guilds: client.guilds.size,
    users: client.users.size
  }).then(() => {
    msg.channel.send(':white_check_mark: │ Updated **discordbotlist.com** stats.').catch(err => {
      Logger.error(`Error sending message in channel with id: ${msg.channel.id}.`, err)
    })
    console.log('Updated discordbotlist.com stats.')
  }).catch(err => {
    msg.channel.send(':exclamation: │ Failed to update **discordbotlist.com** stats.').catch(err => {
      Logger.error(`Error sending message in channel with id: ${msg.channel.id}.`, err)
    })
    Logger.error(`Discordbotlist.com server count update failed : ${err}`)
  })
  snekfetch.post(`https://discordbot.world/api/bot/${client.user.id}/stats`)
  .set('Authorization', client.config.apis.botlists.dbw)
  .send({
    guild_count: client.guilds.size,
  }).then(() => {
    msg.channel.send(':white_check_mark: │ Updated **discordbot.world** stats.').catch(err => {
      Logger.error(`Error sending message in channel with id: ${msg.channel.id}.`, err)
    })
    console.log('Updated discordbot.world stats.')
  }).catch(err => {
    msg.channel.send(':exclamation: │ Failed to update **discordbot.world** stats.').catch(err => {
      Logger.error(`Error sending message in channel with id: ${msg.channel.id}.`, err)
    })
    Logger.error(`Discordbot.world server count update failed : ${err}`)
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
