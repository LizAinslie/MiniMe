const snekfetch = require('snekfetch');
const Discord = require('discord.js');
const util = require('../util.js')

exports.run = (client, msg, args) => {
  util.resolveUser(client, args.join(' ')).then(user => {
    if (!user.bot) return msg.channel.send(`:exclamation: | ${user} is not a bot!`)
    snekfetch.get(`https://discordbots.org/api/bots/${user.id}`).then(res => {
      const bot = res.body
      const embed = new Discord.RichEmbed()
      .setTitle(bot.username)
      .setColor(client.config.color)
      .setThumbnail(user.displayAvatarURL)
      .setDescription(bot.shortdesc)
      .addField('Prefix', bot.prefix, true)
      .addField('Library', bot.lib, true)
      .addField('Discriminator', bot.discrim, true)
      .addField('Owners', bot.owners.map(o => `<@${o.id}>`).join(', '), true)
      .addField('Certified?', bot.certifiedBot ? 'Yes' : 'No', true)
      .addField('ID', bot.id, true)
      .setImage(`https://discordbots.org/api/widget/${bot.id}.png`)
      msg.channel.send(embed)
    }).catch(err => {
      msg.channel.send(':exclamation: | Failed to run the command.');
      client.rollbar.error('Error looking up bot on DBL: ' + err.message)
    })
  }).catch(err => {
    msg.channel.send(':exclamation: | Failed to run the command.');
    client.rollbar.error('Error looking up bot on DBL: ' + err.message)
  })
}

exports.help = {
  name: 'dbl',
  description: 'Retrieve bot information from the Discord Bot List.',
  usage: 'dbl <botName>',
  fullDesc: 'Retrieve bot information from the Discord Bot List. Must supply a bot name.',
  type: 'util'
}