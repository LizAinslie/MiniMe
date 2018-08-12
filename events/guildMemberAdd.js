const Discord = require('discord.js')
const Canvas = require('canvas')
const snekfetch = require('snekfetch')
const path = require("path")
const fs = require("fs")

const applyText = (canvas, text) => {
 	const ctx = canvas.getContext('2d')
 	let fontSize = 70

 	do {
 		ctx.font = `${fontSize -= 10}px sans-serif`
 	} while (ctx.measureText(text).width > canvas.width - 300)

 	return ctx.font
 };

module.exports = async (client, member) => {
  if (!client.guildSettings.getProp(member.guild.id, 'doWelcomes')) return
  const defaultChannel = member.guild.channels.get(client.guildSettings.getProp(member.guild.id, 'welcomeChannel'))
  
  if (!defaultChannel) return

 	const canvas = Canvas.createCanvas(700, 250)
 	const ctx = canvas.getContext('2d')
  
 	const background = await Canvas.loadImage(path.join(__dirname, "..", "assets", "welcome.jpg"))
 	ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

 	ctx.strokeStyle = '#74037b'
 	ctx.strokeRect(0, 0, canvas.width, canvas.height)

 	ctx.font = '28px sans-serif'
 	ctx.fillStyle = '#ffffff'
 	ctx.fillText('Welcome to the server,', canvas.width / 2.5, canvas.height / 3.5)

 	ctx.font = applyText(canvas, `${member.displayName}!`)
 	ctx.fillStyle = '#ffffff'
 	ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8)

 	ctx.beginPath()
 	ctx.arc(125, 125, 100, 0, Math.PI * 2, true)
 	ctx.closePath()
 	ctx.clip()
  
  
 	const { body: buffer } = await snekfetch.get(member.user.displayAvatarURL);
  // Wait for Canvas to load the image
  const avatar = await Canvas.loadImage(buffer);
  // Draw a shape onto the main canvas
  ctx.drawImage(avatar, 25, 0, 200, canvas.height)

 	const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image.png')
  
  defaultChannel.send(`Welcome ${member.username}#${member.discriminator} to the server!`, attachment).catch(console.error)
}
