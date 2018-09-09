const neko = require('nekos.life')
const getEmbedColor = require('../util/getHighestRoleColor.js')

const embed = (client, msg, url) => {
  return {
    author: {
      name: `Neko │ Requested by ${msg.author.username}#${msg.author.discriminator}`,
      icon_url: msg.author.displayAvatarURL
    },
    color: getEmbedColor(msg),
    timestamp: new Date(),
    footer: {
      text: 'Status: 200',
      icon_url: client.user.avatarURL
    },
    image: {
      url: url
    }
  }
}

exports.run = async (client, msg, args) => {
  if (!msg.channel.nsfw) return msg.channel.send(':exclamation: │ You can only run this command in a NSFW channel!')
  switch (args[0].toLowerCase()) {
    case 'solo':
      msg.channel.send({
        embed: embed(client, msg, await neko.getNSFWGirlSoloGif())
      })
      break
    case 'femdom':
      msg.channel.send({
        embed: embed(await neko.getNSFWFemdom())
      })
      break
    default:
      msg.channel.send(':interrobang: │ That is not a valid Neko type!')
  }
}

exports.help = {
  name: 'urban',
  description: 'Get a lewd Neko.',
  usage: 'neko <solo>',
  fullDesc: 'Get a lewd Neko.',
  type: 'nsfw',
  status: 2
}