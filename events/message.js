module.exports = async (client, message) => {
  // Ignore all bots
  if (message.author.bot) return
  // let key
//   if (message.guild) {
//     We'll use the key often enough that simplifying it is worth the trouble.
  //  key = `${message.guild.id}-${message.author.id}`

    // Triggers on new users we haven't seen before.
  //  if (!client.points.has(key)) {
      // The user and guild properties will help us in filters and leaderboards.
     // client.points.set(key, {
    //    user: message.author.id, guild: message.guild.id, points: 0, level: 1
   //   })
//    }

    // Get only the current points for the user.
  //  let currentPoints = client.points.getProp(key, 'points')
    // Increment the points and save them.
    // client.points.setProp(key, 'points', ++currentPoints)
    // Set the date; for clearing out old users from the database.
    // client.points.setProp(key, "lastSeen", new Date())
    // Calculate the user's current level
    // const curLevel = Math.floor(0.1 * Math.sqrt(currentPoints))
    // Act upon level up by sending a message and updating the user's level in enmap.
   // if (client.points.getProp(key, 'level') < curLevel) {
      // message.reply(`You've leveled up to level **${curLevel}**! Ain't that dandy?`)
     // client.points.setProp(key, 'level', curLevel)
   // }
//   }

  // Ignore messages not starting with the prefix (in config.json)
  const prefixes = ['m::', `<@${client.user.id}>`]
  let prefix = false
  for (const thisPrefix of prefixes) {
    if (message.content.toLowerCase().startsWith(thisPrefix)) prefix = thisPrefix
  }
  if (message.content.indexOf(prefix) !== 0) return

//  if (message.content === '!join') {
//    client.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
//  }

  // Our standard argument/command name definition.
  const args = message.content.slice(prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()

//  if (command === 'points') {
 //  return message.channel.send(`You currently have ${client.points.getProp(key, 'points')}, and are level ${client.points.getProp(key, 'level')}!`)
//  } else if (command === 'leaderboard') {
   // Get a filtered list (for this guild only), and convert to an array while we're at it.
//   const filtered = client.points.filterArray(p => p.guildID === message.guild.id)

   // Sort it to get the top results... well... at the top. Y'know.
//   const sorted = filtered.sort((a, b) => a.points < b.points)

//     Slice it, dice it, get the top 10 of it!
//   const top10 = sorted.splice(0, 10)

//     Now shake it and show it! (as a nice embed, too!)
//   const embed = new Discord.RichEmbed()
//     .setTitle('Leaderboard')
//     .setAuthor(client.user.username, client.user.avatarURL)
//     .setDescription('Our top 10 points leaders!')
//     .setColor(0x00AE86)
//   for (const data of top10) {
//     embed.addField(client.users.get(data.userID).tag, `${data.points} points (level ${data.level})`)
//   }
///   return message.channel.send({embed})
// } else if (command === 'give') {
//     Limited to guild owner - adjust to your own preference!
//   if (!message.author.id === message.guild.owner) return message.reply("you're not the boss of me, you can't do that!")

//   const user = message.mentions.users.first() || client.users.get(args[0])
//   if (!user) return message.reply('you must mention someone or give their ID!')

//   let pointsToAdd = parseInt(args[1], 10)
//   if (!pointsToAdd) return message.reply("You didn't tell me how many points to give...")

//     Get their current points.
//   let userPoints = client.points.getProp(key, 'points')
//   userPoints += pointsToAdd

//     And we save it!
//   client.points.setProp(key, 'points', userPoints)

//   message.channel.send(`${user.tag} has received ${pointsToAdd} points and now stands at ${userPoints} points.`)
// } //else if (command === 'cleanup') {
//     Let's clean up the database of all "old" users, and those who haven't been around for... say a month.
//     This will require you to add the following in the points code above: client.points.setProp(key, "lastSeen", new Date());

//     Get a filtered list (for this guild only).
   // const filtered = client.points.filter(p => p.guild === message.guild.id)

//     We then filter it again (ok we could just do this one, but for clarity's sake...)
//     So we get only users that haven't been online for a month, or are no longer in the guild.
 //  const rightNow = new Date()
  // const toRemove = filtered.filter(data => {
   // return !message.guild.members.has(data.user) || rightNow - 2592000000 > data.lastSeen
  // })

   // toRemove.forEach(data => {
  //   client.points.delete(`${message.guild.id}-${data.user}`)
 //  })

 //  message.channel.send(`I've cleaned up ${toRemove.size} old farts.`)
 // }

  // Grab the command data from the client.commands Enmap
  const cmd = client.commands.get(command)

  // If that command doesn't exist, silently exit and do nothing
  if (!cmd) return

  // Run the command
  cmd.run(client, message, args)
}
