module.exports = msg => {
  let color = 0
  if (msg.guild) {
    const roles = Array.from(msg.guild.me.roles.values()).sort((a, b) => a.position > b.position ? -1 : 1)
    if (roles.length > 0) {
      color = roles[0].color
    } else {
      color = 0xFFFFFF
    }
  } else {
    color = 0xFFFFFF
  }
  return color
}
