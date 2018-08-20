const Discord = require('discord.js')

exports.run = (client, msg, args) => {
  if (client.guildSettings.has(msg.guild.id)) {
    if (!msg.member.roles.some(r => [client.guildSettings.getProp(msg.guild.id, 'ownerRole'), client.guildSettings.getProp(msg.guild.id, 'modRole')])) return msg.channel.send(':no_entry_sign: | You do not have permission to use this!')
    args = args.join(' ').split('|')
    
    let logs = Boolean(parseInt(args[0].trim(), 10))
    let welcomes = Boolean(parseInt(args[1].trim(), 10))
    
    client.guildSettings.setProp(msg.guild.id, 'doLogs', logs)
    client.guildSettings.setProp(msg.guild.id, 'doWelcomes', welcomes)
    const embed = new Discord.RichEmbed()
    .setTitle('Server Options Updated')
    .setColor(client.config.color)
    .addField('Welcomes', welcomes.toString(), true)
    .addField('Logs', logs.toString(), true)
    msg.channel.send(embed)
  } else {
    msg.channel.send(':exclamation:	׀ Please run `' + client.config.prefix + 'setup` to setup your server first!')
  }
}

exports.help = {
  name: 'options',
  description: 'Configure your server options.',
  usage: 'options <1|0> | <1|0>',
  fullDesc: 'Configure your server options. The first option is whether to do logs, the second is whether to welcome users. 0=False, 1=True',
  type: 'mod'
}