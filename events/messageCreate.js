const config = require('../config.json');

module.exports = async (client, message) => {
  // Ignore all bots
  if (message.author.bot) return

  // Ignore messages not starting with the prefix (in config.json)
  const prefixes = [...config.prefix, `<@${client.user.id}>`];
  let prefix = false
  for (const thisPrefix of prefixes) {
    if (message.content.toLowerCase().startsWith(thisPrefix)) prefix = thisPrefix
  }

//  if (message.content === '!join') {
//    client.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
//  }

  // Our standard argument/command name definition.
  const args = message.content.slice(prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()

  let cmd
  // Grab the command data from the client.commands Enmap
  if (client.commands.has(command)) {
    cmd = client.commands.get(command)
  } else if (client.aliases.has(command)) {
      cmd = client.commands.get(client.aliases.get(command))
  } else {
    return
  }
  // If that command doesn't exist, silently exit and do nothing
  if (!cmd) return

  // Run the command
  cmd.run(client, message, args)
}
