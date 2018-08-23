const Discord = require('discord.js')
const util = require('../util.js')

exports.run = async (client, msg, args) => {
  util.resolveUser(client, args.join(' ')).then(async user => {
    console.log(client.idiot.wanted(user.displayAvatarURL()))
    const idiotImg = await client.idiot.wanted(user.displayAvatarURL(), 'wanted.png')
    msg.channel.send(new Discord.Attachment(idiotImg, 'wanted.png'))
  })
}

exports.help = {
  name: 'wanted',
  description: 'Make a user wanted.',
  usage: 'wanted <user>',
  fullDesc: 'Make a user wanted.',
  type: 'fun'
}
