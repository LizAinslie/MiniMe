exports.run = async (client, msg, args) => {
  // This command removes all messages from all users in the channel, up to 100.
  if (!msg.member.roles.some(r => ['Owner', 'Owners', 'Mod', 'Mods', 'Jr. Mod', 'Jr. Mods'].includes(r.name))) { return msg.reply(':no_entry_sign: | Sorry, you don\'t have permissions to use this!') }
  // get the delete count, as an actual number.
  const deleteCount = parseInt(args[0], 10)

  // Ooooh nice, combined conditions. <3
  if (!deleteCount || deleteCount < 2 || deleteCount > 100) { return msg.reply('please provide a number between 2 and 100 for the number of messages to delete') }

  // So we get our messages, and delete them. Simple enough, right?
  const fetched = await msg.channel.fetchMessages({limit: deleteCount})
  msg.channel.bulkDelete(fetched)
    .catch(error => msg.reply(`Couldn't delete messages because of: ${error}`))
}

exports.help = {
  name: 'purge',
  description: 'Removes messages in bulk.',
  usage: 'purge <number>',
  fullDesc: 'Removes messages in bulk. Up to 100 messages can be removed at once.',
  type: 'mod'
}
