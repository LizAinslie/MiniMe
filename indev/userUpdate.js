const snekfetch = require('snekfetch')
const Discord = require('discord.js')
const Canvas = require('canvas')

module.exports = async (client, oldUser, newUser) => {
  if (oldUser.displayAvatarURL != newUser.displayAvatarURL) {
    const canvas = Canvas.createCanvas(500, 250)
 	  const ctx = canvas.getContext('2d')
    
    const { body: oldAvatarBuffer } = await snekfetch.get(oldUser.displayAvatarURL);
    // Wait for Canvas to load the image
    const oldAvatar = await Canvas.loadImage(oldAvatarBuffer);
    // Draw a shape onto the main canvas
    ctx.drawImage(oldAvatar, 0, 0, 250, canvas.height)
    
    const { body: newAvatarBuffer } = await snekfetch.get(oldUser.displayAvatarURL);
    // Wait for Canvas to load the image
    const newAvatar = await Canvas.loadImage(newAvatarBuffer);
    // Draw a shape onto the main canvas
    ctx.drawImage(newAvatar, 0, 250, 500, canvas.height)
    
    const attachment = new Discord.Attachment(canvas.toBuffer(), 'change-avatar.png')
    
    const userGuilds = client.guilds.filter(guild => guild.members.has(newUser.id));
    
    for (let guild in userGuilds) {
      const logChannel = guild.channels.find(c=> c.permissionsFor(guild.me).has("SEND_MESSAGES"));
      logChannel.send(`${newUser.username}#${newUser.discriminator} changed their avatar!`, attachment)
    }
  }
  if (oldUser.username != newUser.username) {
    const userGuilds = client.guilds.filter(guild => guild.members.has(newUser.id));
    
    for (let guild in userGuilds) {
      let logChannel = guild.channels.find(c=> c.permissionsFor(guild.me).has("SEND_MESSAGES"));
      logChannel.send(`${oldUser.username}#${oldUser.discriminator} changed their name to ${newUser.username}#${newUser.discriminator}`, attachment)
    }
  }
}