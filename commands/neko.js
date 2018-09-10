const getEmbedColor = require('../util/getHighestRoleColor.js')
const Nekos = require('nekos.life')

const neko = new Nekos()

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
  if (!msg.channel.nsfw) return msg.channel.createMessage(':exclamation: │ You can only run this command in a NSFW channel!')
  let body
  switch (args[0].toLowerCase()) {
    case 'solo':
      body = await JSON.parse(JSON.stringify(await neko.getNSFWGirlSoloGif()))
      msg.channel.createMessage({
        embed: embed(client, msg, body.url)
      })
      break
    case 'femdom':
      body = await JSON.parse(JSON.stringify(await neko.getNSFWFemdom()))
      msg.channel.createMessage({
        embed: embed(client, msg, body.url)
      })
      break
    case 'pussy':
      if (args[1] && args[1] === 'gif') {
        body = await JSON.parse(JSON.stringify(await neko.getNSFWPussyGif()))
        msg.channel.createMessage({
          embed: embed(client, msg, body.url)
        })
      } else if (args[1] && args[1] === 'wank') {
        body = await JSON.parse(JSON.stringify(await neko.getNSFWPussyWankGif()))
        msg.channel.createMessage({
          embed: embed(client, msg, body.url)
        })
      }else {
        body = await JSON.parse(JSON.stringify(await neko.getNSFWPussy()))
        msg.channel.createMessage({
          embed: embed(client, msg, body.url)
        })
      }
      break
    default:
      msg.channel.createMessage(':interrobang: │ That is not a valid Neko type!')
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