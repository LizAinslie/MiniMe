const ud = require('urban-dictionary')
const Discord = require('discord.js')
const getEmbedColor = require('../util/getHighestRoleColor.js')

exports.run = (client, msg, args) => {
  if (!msg.channel.nsfw) return msg.channel.send(':exclamation: │ You can only run this command in a NSFW channel!')
  ud.term(args.join(' '), (error, entries, tags, sounds) => {
    if (error) {
      client.rollbar.error('[urban.js] | ' + error)
      msg.channel.send(':exclamation: │ There was an error!')
    } else {
      const embed = new Discord.RichEmbed()
      .setColor(getEmbedColor(msg))
      .setTitle(entries[0].word)
      .setDescription(entries[0].definition)
      .addField('Example', entries[0].example)
      msg.channel.send(embed)
    }
  })
}

exports.help = {
  name: 'urban',
  description: 'Search the Urban Dictionary.',
  usage: 'urban <term>',
  fullDesc: 'Search the Urban Dictionary.',
  type: 'nsfw',
  status: 2
}
