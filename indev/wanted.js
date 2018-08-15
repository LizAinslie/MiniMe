const Discord = require("discord.js");
const util = require('../util.js')

exports.run = async (client, msg, args) => {
  util.resolveUser(client, args.join(' ')).then(user => {
    console.log(client.idiot.wanted(user.displayAvatarURL()))
    msg.channel.send(new Discord.Attachment(await client.idiot.wanted(user.displayAvatarURL(), 'wanted.png'), 'wanted.png'))
  })
}

exports.help = {
  name: 'wanted',
  description: 'Make a user wanted.',
  usage: 'wanted <user>',
  fullDesc: 'Make a user wanted.',
  type: 'fun'
}