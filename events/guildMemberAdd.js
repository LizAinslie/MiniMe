module.exports = (client, member) => {
  const defaultChannel = member.guild.channels.find('name', 'general')
  defaultChannel.send(`Welcome ${member} to the server!`).catch(console.error)
}
