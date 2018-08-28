exports.run = async (client, message, args) => {
  // This command must be limited to mods and admins. In this example we just hardcode the role names.
  // Please read on Array.some() to understand this bit:
  // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
  if (!client.guildsettings.has(message.guild.id)) return message.channel.send(':exclamation: │ You must set up your server first! Use the `setup` command to do this.')
  if (!message.member.roles.some(r => [client.guildSettings.getProp(message.guild.id, 'ownerRole'), client.guildSettings.getProp(message.guild.id, 'modRole')].includes(r.name))) { return message.channel.send(':no_entry_sign: │ Sorry, you don\'t have permissions to use this!') }

  // Let's first check if we have a member and if we can kick them!
  // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
  // We can also support getting the member by ID, which would be args[0]
  let member = message.mentions.members.first()
  if (!member) { return message.reply('Please mention a valid member of this server') }
  if (!member.kickable) { return message.reply('I cannot kick this user! Do they have a higher role? Do I have kick permissions?') }

  // slice(1) removes the first part, which here should be the user mention or ID
  // join(' ') takes all the various parts to make it a single string.
  let reason = args.slice(1).join(' ')
  if (!reason) { reason = 'No reason provided' }

  // Now, time for a swift kick in the nuts!
  await member.kick(reason)
    .catch(error => message.channel.send(`Sorry ${message.author} I couldn't kick because of : ${error}`))
    message.channel.send(`${member.user.username}#${member.user.discriminator} has been kicked by ${message.author.username}#${message.author.discriminator} because: ${reason}`)
}

exports.help = {
  name: 'kick',
  description: 'Kicks a user.',
  usage: 'kick <user> <reason>',
  fullDesc: 'Kicks a user. Only available to Mods and Owners',
  type: 'mod',
  status: 2
}
