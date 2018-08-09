exports.run = async (client, message, args) => {
  if (!message.member.roles.some(r => [client.guildSettings.getProp(message.guild.id, 'ownerRole'), client.guildSettings.getProp(message.guild.id, 'modRole')].includes(r.name))) {
    return message.reply(':no_entry_sign: | Sorry, you don\'t have permissions to use this!')
  }
  let member = message.mentions.members.first()
  if (!member) { return message.reply('Please mention a valid member of this server') }
  if (!member.bannable) { return message.reply('I cannot ban this user! Do they have a higher role? Do I have ban permissions?') }

  let reason = args.slice(1).join(' ')
  if (!reason) { reason = 'No reason provided' }

  await member.ban(reason)
    .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`))
  message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`)
}

exports.help = {
  name: 'ban',
  description: 'Bans a user.',
  usage: 'ban <user> <reason>',
  fullDesc: 'Bans a user. Only available to Mods and Owners',
  type: 'mod'
}
