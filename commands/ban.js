exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('BAN_MEMBERS')) { return message.reply(':no_entry_sign: │ You need the permission `BAN_MEMBERS` to use this.') }
  let member = message.mentions.members.first()
  if (!member) { return message.reply('Please mention a valid member of this server') }
  if (!member.bannable) { return message.reply('I cannot ban this user! Do they have a higher role? Do I have ban permissions?') }

  let reason = args.slice(1).join(' ')
  if (!reason) { reason = 'No reason provided' }

  await member.ban(reason)
    .catch(error => message.channel.createMessage(`Sorry ${message.author} I couldn't ban because of : ${error}`))
  message.channel.createMessage(`${member.user.username}#${member.user.discriminator} has been banned by ${message.author.username}#${message.author.discriminator} because: ${reason}`)
}

exports.help = {
  name: 'ban',
  description: 'Bans a user.',
  usage: 'ban <user> <reason>',
  fullDesc: 'Bans a user. Only available to Mods and Owners',
  type: 'mod',
  status: 2,
  aliases: []
}
