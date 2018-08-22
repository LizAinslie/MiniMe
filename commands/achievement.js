const Discord = require('discord.js')
const snekfetch = require('snekfetch')

exports.run = (client, message, args) => {
  try {
    let [title, contents] = args.join(' ').split('|')
    if (!contents) {
      [title, contents] = ['Achievement Get!', title]
    }

    let rnd = Math.floor((Math.random() * 39) + 1)
    if (args.join(' ').toLowerCase().includes('burn')) rnd = 38
    if (args.join(' ').toLowerCase().includes('cookie')) rnd = 21
    if (args.join(' ').toLowerCase().includes('cake')) rnd = 10

    if (title.length > 20 || contents.length > 20) return message.edit('Max Length: 20 Characters. Soz.').then(message.delete.bind(message), 2000)
    const url = `https://www.minecraftskinstealer.com/achievement/a.php?i=${rnd}&h=${encodeURIComponent(title)}&t=${encodeURIComponent(contents)}`
    message.channel.send({
      embed: {
        description: `**${message.author.username}** Achievement!`,
        color: client.config.color,
        image: {
          url: url
        }
      }
    })
  } catch (err) {
    client.rollbar.error(`Error on achievement commands!\n\nError:\n\n ${err}`)
  }
}

exports.help = {
  name: 'achievement',
  description: 'Generate a Minecraft achievement.',
  usage: 'achievement <title> [contents]',
  fullDesc: 'Generate a Minecraft achievement.',
  type: 'fun'
}
