const snekfetch = require('snekfetch')
const Canvas = require('canvas')

exports.run = async (client, msg, args) => {
  const users = Array.from(msg.mentions.users.values())
  const canvas = Canvas.createCanvas(500, 250)
  const ctx = canvas.getContext('2d')

  const { body: avatar1Buffer } = await snekfetch.get(users[0].displayAvatarURL)
  const avatar1 = await Canvas.loadImage(avatar1Buffer)
  const { body: avatar2Buffer } = await snekfetch.get(users[1].displayAvatarURL)
  const avatar2 = await Canvas.loadImage(avatar2Buffer)

  ctx.drawImage(avatar1, 0, 0, 250, canvas.height)
  ctx.drawImage(avatar2, 250, 0, 250, canvas.height)

  
  msg.channel.createMessage('Who Would Win?')
  msg.channel.sendFile(canvas.toBuffer())
}

exports.help = {
  name: 'whowouldwin',
  description: 'See who would win.',
  usage: 'whowouldwin <@user1> | <@user2>',
  fullDesc: 'See who would win. Must supply 2 mentions.',
  type: 'fun',
  status: 2
}
