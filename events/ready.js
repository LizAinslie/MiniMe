module.exports = (client) => {
  console.log(`Ready to run in ${client.channels.size} channels on ${client.guilds.size} servers, for a total of ${client.users.size} users.`)
  client.user.setActivity('Made by @RailRunner16#1174')
}
