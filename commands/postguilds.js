/* Eris Fixed */

const snekfetch = require('snekfetch')
const Logger = require('../util/Logger.js')

exports.run = (client, msg) => {
  client.r.table('users').get(msg.author.id).run().then(user => {
    if (!user.developer) return msg.channel.createMessage(':no_entry_sign: │ Only my developer can use this!')
    msg.channel.createMessage(`I am in **${client.guilds.size}** guilds.`)
    snekfetch.post(`https://botlist.space/api/bots/${client.user.id}`)
    .set('Authorization', client.config.apis.botlists.bls)
    .send({
      server_count: client.guilds.size
    }).then(() => {
      msg.channel.createMessage(':white_check_mark: │ Updated **botlist.space** stats.')
      console.log('Updated botlist.space stats.')
    }).catch(err => {
      msg.channel.createMessage(':exclamation: │ Failed to update **botlist.space** stats.')
      Logger.error(client, `botlist.space server count update failed : ${err}`)
    })
    // snekfetch.post(`https://discordbots.org/api/bots/${client.user.id}/stats`)
    // .set('Authorization', client.config.apis.botlists.dbl)
    // .send({
    //   server_count: client.guilds.size
    // }).then(() => {
    //   msg.channel.createMessage(':white_check_mark: │ Updated **discordbots.org** stats.')
    //   console.log('Updated discordbots.org stats.')
    // }).catch(err => {
    //   msg.channel.createMessage(':exclamation: │ Failed to update **discordbots.org** stats.')
    //   Logger.error(client, `discordbots.org server count update failed : ${err}`)
    // })
    snekfetch.post(`https://discordbots.group/api/bot/${client.user.id}`)
    .set('Authorization', client.config.apis.botlists.dbg)
    .send({
      count: client.guilds.size
    }).then(() => {
      msg.channel.createMessage(':white_check_mark: │ Updated **discordbots.group** stats.')
      console.log('Updated discordbots.group stats.')
    }).catch(err => {
      msg.channel.createMessage(':exclamation: │ Failed to update **discordbots.group** stats.')
      Logger.error(client, `Discordbots.group server count update failed : ${err}`)
    })
    snekfetch.post(`https://discordbotlist.com/api/bots/${client.user.id}/stats`)
    .set('Authorization', `Bot ${client.config.apis.botlists.dblcom}`)
    .send({
      guilds: client.guilds.size,
      users: client.users.size
    }).then(() => {
      msg.channel.createMessage(':white_check_mark: │ Updated **discordbotlist.com** stats.')
      .console.log('Updated discordbotlist.com stats.')
    }).catch(err => {
      msg.channel.createMessage(':exclamation: │ Failed to update **discordbotlist.com** stats.')
      Logger.error(client, `Discordbotlist.com server count update failed : ${err}`)
    })
    snekfetch.post(`https://discordbot.world/api/bot/${client.user.id}/stats`)
    .set('Authorization', client.config.apis.botlists.dbw)
    .send({
      guild_count: client.guilds.size
    }).then(() => {
      msg.channel.createMessage(':white_check_mark: │ Updated **discordbot.world** stats.')
      console.log('Updated discordbot.world stats.')
    }).catch(err => {
      msg.channel.createMessage(':exclamation: │ Failed to update **discordbot.world** stats.')
      Logger.error(client, `Discordbot.world server count update failed : ${err}`)
    })
    snekfetch.get(`http://discordbots.tk/api/post_gc.php?auth=${client.config.apis.botlists.dbtk}&gc=${client.guilds.size}`).then(res => {
      msg.channel.createMessage(':white_check_mark: │ Updated **discordbots.tk** stats.')
      console.log('Updated discordbots.tk stats.')
    }).catch(err => {
      msg.channel.createMessage(':exclamation: │ Failed to update **discordbots.tk** stats.')
      Logger.error(client, `Discordbots.tk server count update failed : ${err}`)
    })
  })
}

exports.help = {
  name: 'postguilds',
  description: 'Post guild counts on all botlists.',
  usage: 'postguilds',
  fullDesc: 'Post guild counts on all botlists.',
  type: 'dev',
  status: 2,
  aliases: ['postservers', 'postsc']
}
